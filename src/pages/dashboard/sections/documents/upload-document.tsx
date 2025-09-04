import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, AlertCircle, CheckCircle  } from 'lucide-react';
import { FileType } from '@/@types/fileType';
import { useDocumentUpload } from '@/hooks/use-documentUpload';
import { isValidGoogleDriveUrl, detectFileTypeFromUrl } from '@/services/documentService';
import { Document } from '@/@types/document';

interface UploadDocumentProps {
    onUploadSuccess?: (document: Document) => void;
    onCancel?: () => void;
}

interface UploadDocumentData {
    title: string;
    userId: number;
    description?: string;
    fileType: FileType;
    driveUrl: string;
}

export const UploadDocument: React.FC<UploadDocumentProps> = ({
    onUploadSuccess,
    onCancel
}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [fileType, setFileType] = useState<FileType>(FileType.PDF);
    const [driveUrl, setDriveUrl] = useState('');

    const {
        isUploading,
        error,
        success,
        uploadDocument,
        reset
    } = useDocumentUpload();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const uploadData: UploadDocumentData = {
                title,
                description,
                fileType,
                userId: 0,
                driveUrl
            };

            const result = await uploadDocument(uploadData);

            if (result?.success && result.document) {
                resetForm();
                onUploadSuccess?.(result.document);
            }
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setFileType(FileType.PDF);
        setDriveUrl('');
        reset();
    };

    const handleDriveUrlChange = (url: string) => {
        setDriveUrl(url);
        
        // Auto-detect file type from URL if title is not set yet
        if (!title.trim() && url.trim()) {
            const detectedType = detectFileTypeFromUrl(url);
            setFileType(detectedType);
            
            // Try to extract filename from URL for title suggestion
            try {
                const urlObj = new URL(url);
                const pathParts = urlObj.pathname.split('/');
                const fileName = pathParts[pathParts.length - 1];
                if (fileName && fileName !== 'view' && fileName !== 'edit') {
                    // Remove file extension for title
                    const titleWithoutExt = fileName.split('.')[0];
                    setTitle(titleWithoutExt);
                }
            } catch (e) {
                // If URL parsing fails, just use the detected file type
                console.log('Could not extract filename from URL');
            }
        }
    };

    const isFormValid = () => {
        if (!title.trim()) return false;
        if (!driveUrl.trim()) return false;
        if (!isValidGoogleDriveUrl(driveUrl)) return false;
        return true;
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Upload New Document from Google Drive
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {success && (
                    <Alert className="border-green-200 bg-green-50">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-600">{success}</AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Google Drive URL */}
                    <div className="space-y-2">
                        <Label htmlFor="driveUrl">Google Drive URL *</Label>
                        <Input
                            id="driveUrl"
                            value={driveUrl}
                            onChange={(e) => handleDriveUrlChange(e.target.value)}
                            placeholder="https://drive.google.com/file/d/..."
                            disabled={isUploading}
                            required
                        />
                        <p className="text-xs text-gray-500">
                            Provide a public Google Drive link to your document
                        </p>

                        {/* {driveUrl && !isValidGoogleDriveUrl(driveUrl) && (
                            <p className="text-xs text-red-500">
                                Please provide a valid Google Drive URL (must start with https://drive.google.com/)
                            </p>
                        )} */}
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <Label htmlFor="title">Document Title *</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter document title"
                            disabled={isUploading}
                            required
                            maxLength={255}
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter document description (optional)"
                            disabled={isUploading}
                            maxLength={500}
                        />
                    </div>

                    {/* File Type */}
                    <div className="space-y-2">
                        <Label htmlFor="fileType">File Type *</Label>
                        <Select
                            value={fileType}
                            onValueChange={(value) => setFileType(value as FileType)}
                            disabled={isUploading}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select file type" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.values(FileType).map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <Button
                            type="submit"
                            className="flex-1"
                            disabled={isUploading || !isFormValid()}
                        >
                            {isUploading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload className="w-4 h-4 mr-2" />
                                    Add Document from Drive
                                </>
                            )}
                        </Button>

                        {onCancel && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onCancel}
                                disabled={isUploading}
                            >
                                Cancel
                            </Button>
                        )}
                    </div>

                    {/* Form Validation Messages */}
                    {!isFormValid() && (
                        <div className="text-xs text-gray-500 space-y-1">
                            <p>Please ensure all required fields are filled:</p>
                            {!driveUrl.trim() && <p>• Google Drive URL is required</p>}
                            {driveUrl.trim() && !isValidGoogleDriveUrl(driveUrl) && (
                                <p>• Please provide a valid Google Drive URL</p>
                            )}
                            {!title.trim() && <p>• Document title is required</p>}
                        </div>
                    )}
                </form>
            </CardContent>
        </Card>
    );
};