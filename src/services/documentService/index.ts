import { FileType } from "@/@types/fileType";
import { api } from "../api/api";

export interface UploadDocumentData {
  title: string;
  description?: string;
  fileType: FileType;
  driveUrl: string; // Agora é obrigatório
}

export interface Document {
  id: number;
  title: string;
  description: string | null;
  fileUrl: string;
  fileType: FileType;
  size: string;
  downloadCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export interface UploadResponse {
  success: boolean;
  message: string;
  document?: Document;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    totalPages: number;
    page: number;
    pageSize: number;
  };
}

const getAuthToken = (): string | null => {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
};

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL || '/api/v1';
 
export const isValidGoogleDriveUrl = (url: string): boolean => {
  const driveUrlPattern = /^https:\/\/drive\.google\.com\/(file\/d\/|open\?id=)/;
  return driveUrlPattern.test(url);
};

// Auto-detect file type baseado na URL (opcional)
export const detectFileTypeFromUrl = (url: string): FileType => {
  const extension = url.split('.').pop()?.toLowerCase();
  const typeMap: Record<string, FileType> = {
    'pdf': FileType.PDF,
    'doc': FileType.WORD,
    'docx': FileType.WORD,
    'xls': FileType.EXCEL,
    'xlsx': FileType.EXCEL,
    'ppt': FileType.POWERPOINT,
    'pptx': FileType.POWERPOINT,
    'txt': FileType.TEXT,
    'jpg': FileType.IMAGE,
    'jpeg': FileType.IMAGE,
    'png': FileType.IMAGE,
    'gif': FileType.IMAGE,
  };

  return extension && typeMap[extension] ? typeMap[extension] : FileType.OTHER;
};

// Upload document - apenas Google Drive
export const uploadDocument = async (
  data: UploadDocumentData
): Promise<UploadResponse> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Authentication required. Please login again.');
  }

  // Validações
  if (!data.title.trim()) {
    throw new Error('Title is required');
  }

  if (!data.driveUrl?.trim()) {
    throw new Error('Google Drive URL is required');
  }

  if (!isValidGoogleDriveUrl(data.driveUrl)) {
    throw new Error('Please provide a valid Google Drive URL');
  }

  // Enviar como JSON em vez de FormData
  const payload = {
    title: data.title.trim(),
    fileType: data.fileType,
    description: data.description?.trim() || '',
    driveUrl: data.driveUrl.trim()
  };

  try {
    const response = await api.post('/documents', payload);

    const result: UploadResponse = response.data;

    if (!result.success) {
      throw new Error(result.message || `HTTP error! status: ${response.status}`);
    }

    return result;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

// Get all documents
export const getAllDocuments = async (
  page: number = 1,
  pageSize: number = 10
): Promise<PaginatedResponse<Document>> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(`${API_BASE_URL}/documents?page=${page}&pageSize=${pageSize}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Get document by ID
export const getDocumentById = async (id: number): Promise<Document> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(`${API_BASE_URL}/documents/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  return result.document;
};

// Download document - agora redireciona para o Google Drive
export const downloadDocument = async (id: number): Promise<void> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Authentication required');
  }

  // Primeiro obtemos os detalhes do documento para pegar a URL do Drive
  try {
    const document = await getDocumentById(id);
    if (document.fileUrl) {
      // Abre a URL do Google Drive em uma nova aba
      window.open(document.fileUrl, '_blank');
    } else {
      throw new Error('Document URL not found');
    }
  } catch (error) {
    console.error('Download error:', error);
    throw error;
  }
};

// Update document
export const updateDocument = async (
  id: number,
  data: {
    title?: string;
    description?: string;
    isActive?: boolean;
    driveUrl?: string; // Adicionado suporte para atualizar URL do Drive
  }
): Promise<Document> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Authentication required');
  }

  // Validação adicional para URL do Drive se for fornecida
  if (data.driveUrl && !isValidGoogleDriveUrl(data.driveUrl)) {
    throw new Error('Please provide a valid Google Drive URL');
  }

  const response = await fetch(`${API_BASE_URL}/documents/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Update failed');
  }

  const result = await response.json();
  return result.document;
};

// Delete document
export const deleteDocument = async (id: number): Promise<void> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(`${API_BASE_URL}/documents/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Delete failed');
  }
};