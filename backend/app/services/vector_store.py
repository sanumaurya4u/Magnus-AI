import os
from supabase import create_client, Client
from langchain_google_genai import GoogleGenerativeAIEmbeddings

def get_supabase_client() -> Client:
    # Need to load these from env vars
    supabase_url = os.environ.get("SUPABASE_URL")
    supabase_key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    
    if not supabase_url or not supabase_key:
        raise ValueError("Missing Supabase credentials in environment variables.")
        
    return create_client(supabase_url, supabase_key)

def get_embeddings_model():
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("Missing GEMINI_API_KEY in environment variables.")
        
    return GoogleGenerativeAIEmbeddings(
        model="models/gemini-embedding-001",
        google_api_key=api_key,
        output_dimensionality=768
    )

def store_chunks_in_vector_db(document_name: str, chunks: list[str], metadata: dict = None):
    """
    Embeds text chunks and stores them in the Supabase document_chunks table.
    """
    if not chunks:
        return
        
    embeddings_model = get_embeddings_model()
    supabase = get_supabase_client()
    
    # Generate embeddings for all chunks in batch
    embeddings = embeddings_model.embed_documents(chunks)
    
    # Prepare records for insertion
    records = []
    for chunk, embedding in zip(chunks, embeddings):
        records.append({
            "document_name": document_name,
            "content": chunk,
            "embedding": embedding,
            "metadata": metadata or {}
        })
        
    # Bulk insert into Supabase
    result = supabase.table("document_chunks").insert(records).execute()
    return result

def retrieve_context(query: str, document_name: str = None, top_k: int = 5, threshold: float = 0.5) -> str:
    """
    Retrieves the most relevant document chunks for a given query.
    """
    embeddings_model = get_embeddings_model()
    supabase = get_supabase_client()
    
    # Embed the search query
    query_embedding = embeddings_model.embed_query(query)
    
    # Call the Supabase RPC function for pgvector similarity search
    response = supabase.rpc(
        "match_document_chunks",
        {
            "query_embedding": query_embedding,
            "match_threshold": threshold,
            "match_count": top_k,
            "filter_document_name": document_name
        }
    ).execute()
    
    # Combine the content of the matched chunks
    if response.data:
        return "\n\n".join([chunk["content"] for chunk in response.data])
    return ""
