const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000').replace(/\/$/, '');

export interface UploadResponse {
  filename: string;
  total_chunks: number;
  chunks: string[];
  vector_status: string;
}

export interface MCQOption {
  text: string;
  is_correct: boolean;
}

export interface GeneratedQuestion {
  question_text: string;
  options: MCQOption[];
  explanation: string;
  difficulty: string;
  competency: string;
}

export interface QuestionGenerationResult {
  questions: GeneratedQuestion[];
}

export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const res = await fetch(`${BACKEND_URL}/health`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) return false;
    const data = await res.json();
    return data.status === 'ok';
  } catch {
    return false;
  }
};

export const uploadDocument = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${BACKEND_URL}/api/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Upload failed (${res.status}): ${errText}`);
  }

  return res.json();
};

export const generateQuestions = async (params: {
  competency_name: string;
  difficulty_level: string;
  document_name?: string;
  num_questions?: number;
}): Promise<QuestionGenerationResult> => {
  const res = await fetch(`${BACKEND_URL}/api/generate-questions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      competency_name: params.competency_name,
      difficulty_level: params.difficulty_level,
      document_name: params.document_name || null,
      num_questions: params.num_questions || 3,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Question generation failed (${res.status}): ${errText}`);
  }

  return res.json();
};
