import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Document } from '@/@types/document';
import { FileIcon } from 'lucide-react';

type DocumentTableProps = {
    documents: Document[];
    onSelectDocument: (id: number) => void;
};

export const DocumentTable = ({ documents }: DocumentTableProps) => {
    
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader className="bg-gray-50 dark:bg-gray-800">
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Downloads</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {documents.length > 0 ? (
                        documents.map((document) => (
                            <TableRow key={document.id}>
                                <TableCell className="font-medium flex items-center gap-2">
                                    <FileIcon className="h-4 w-4 text-gray-500" />
                                    {document.title}
                                </TableCell>
                                <TableCell className="uppercase">{document.fileType}</TableCell>
                                <TableCell>{document.size}</TableCell>
                                <TableCell>{document.downloadCount}</TableCell> 
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="h-24 text-center">
                                No documents found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};