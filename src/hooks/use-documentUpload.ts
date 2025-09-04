import { useState, useCallback } from 'react';
import { uploadDocument, UploadDocumentData, UploadResponse } from '../services/documentService';

interface UseDocumentUploadReturn {
  isUploading: boolean;
  error: string | null;
  success: string | null;
  uploadDocument: (data: UploadDocumentData) => Promise<UploadResponse>;
  reset: () => void;
}

export const useDocumentUpload = (): UseDocumentUploadReturn => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleUpload = useCallback(async (data: UploadDocumentData): Promise<UploadResponse> => {
    setIsUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await uploadDocument(data);

      if (result.success) {
        setSuccess('Document added successfully from Google Drive!');
        return result;
      } else {
        throw new Error(result.message || 'Upload failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsUploading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setIsUploading(false);
    setError(null);
    setSuccess(null);
  }, []);

  return {
    isUploading,
    error,
    success,
    uploadDocument: handleUpload,
    reset,
  };
};