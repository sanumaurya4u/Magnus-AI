import pymupdf  # PyMuPDF
import io

def parse_pdf_content(file_bytes: bytes, chunk_size: int = 1000, overlap: int = 200) -> list[str]:
    """
    Parses a PDF from raw bytes and extracts text, chunking it for further processing.
    """
    try:
        # Open the document using PyMuPDF from memory
        doc = pymupdf.open(stream=file_bytes, filetype="pdf")
        
        full_text = ""
        for page in doc:
            full_text += page.get_text() + "\n"
            
        doc.close()
        
        # Simple character-based chunking with overlap
        chunks = []
        if not full_text.strip():
            return chunks
            
        # Clean up whitespace
        full_text = ' '.join(full_text.split())
        
        start = 0
        text_length = len(full_text)
        
        while start < text_length:
            end = start + chunk_size
            chunk = full_text[start:end]
            chunks.append(chunk)
            start += (chunk_size - overlap)
            
        return chunks
        
    except Exception as e:
        raise ValueError(f"Failed to parse PDF: {str(e)}")
