import os
from pydantic import BaseModel, Field
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from .vector_store import retrieve_context

class MCQOption(BaseModel):
    text: str = Field(description="The text of the option")
    is_correct: bool = Field(description="Whether this option is the correct answer")

class GeneratedQuestion(BaseModel):
    question_text: str = Field(description="The question to ask the learner")
    options: list[MCQOption] = Field(description="List of 4 options for the question")
    explanation: str = Field(description="Detailed explanation of why the correct answer is correct")
    difficulty: str = Field(description="The difficulty level assigned to this question (L1-L5)")
    competency: str = Field(description="The competency this question assesses")

class QuestionGenerationResult(BaseModel):
    questions: list[GeneratedQuestion]

def get_llm():
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("Missing GEMINI_API_KEY in environment variables.")
        
    return ChatGoogleGenerativeAI(
        model="gemini-2.5-flash",
        google_api_key=api_key,
        temperature=0.2
    )

def generate_mcqs(
    competency_name: str, 
    difficulty_level: str, 
    document_name: str = None, 
    num_questions: int = 3
) -> QuestionGenerationResult:
    """
    Retrieves context from Vector DB and generates MCQs using Gemini Structured Outputs.
    """
    
    # 1. Retrieve Context (RAG)
    # The query is formulated based on what we're trying to test
    query = f"{competency_name} concepts for a {difficulty_level} proficiency assessment"
    context = retrieve_context(query=query, document_name=document_name, top_k=6, threshold=0.3)
    
    # 2. Formulate Prompt
    system_prompt = """
    You are an expert curriculum designer and psychometrician creating Multiple Choice Questions (MCQs).
    Your task is to generate {num_questions} strict MCQs based ONLY on the provided Context.
    
    Target Competency: {competency_name}
    Target Difficulty: {difficulty_level} (where L1 is Awareness, L5 is Expert)
    
    Rules:
    1. Base the facts entirely on the provided Context. If the context lacks sufficient information, 
       generate general questions suitable for {competency_name} at {difficulty_level} level, but prioritize Context.
    2. Provide exactly 4 options per question.
    3. Exactly 1 option must be correct.
    4. Provide a clear explanation for the correct answer.
    
    Context:
    {context}
    """
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", system_prompt),
        ("human", "Generate the questions now.")
    ])
    
    # 3. Invoke LLM with Structured Output
    llm = get_llm()
    structured_llm = llm.with_structured_output(QuestionGenerationResult)
    
    chain = prompt | structured_llm
    
    result = chain.invoke({
        "num_questions": num_questions,
        "competency_name": competency_name,
        "difficulty_level": difficulty_level,
        "context": context if context else "No context available. Rely on general domain knowledge."
    })
    
    return result
