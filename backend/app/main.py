import os
from typing import Optional
from dotenv import load_dotenv

# Load local environment variables if .env exists
load_dotenv()

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .services.pdf_parser import parse_pdf_content
from .services.vector_store import store_chunks_in_vector_db
from .services.question_generator import generate_mcqs

app = FastAPI(title='Magnus AI API')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_origin_regex=r'https?://.*',
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

@app.get('/health')
def health_check():
    return {'status': 'ok'}

class QuestionGenerationRequest(BaseModel):
    competency_name: str
    difficulty_level: str
    document_name: Optional[str] = None
    num_questions: int = 3

@app.post('/api/generate-questions')
def api_generate_questions(req: QuestionGenerationRequest):
    try:
        result = generate_mcqs(
            competency_name=req.competency_name,
            difficulty_level=req.difficulty_level,
            document_name=req.document_name,
            num_questions=req.num_questions
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class UploadResponse(BaseModel):
    filename: str
    total_chunks: int
    chunks: list[str]
    vector_status: str

@app.post('/api/upload', response_model=UploadResponse)
async def upload_document(file: UploadFile = File(...)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported currently.")
        
    try:
        content = await file.read()
        chunks = parse_pdf_content(content)
        
        # In a real app we'd dispatch this to a background task (e.g. Celery / BackgroundTasks)
        # to avoid blocking the HTTP response, but we'll do it synchronously for the prototype.
        try:
            store_chunks_in_vector_db(
                document_name=file.filename,
                chunks=chunks,
                metadata={"source": "upload_api"}
            )
            v_status = "success"
        except Exception as vec_err:
            print(f"Vector Store Error: {vec_err}")
            v_status = f"failed: {str(vec_err)}"
        
        return UploadResponse(
            filename=file.filename,
            total_chunks=len(chunks),
            chunks=chunks,
            vector_status=v_status
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


