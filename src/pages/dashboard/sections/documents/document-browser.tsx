import { useState, useEffect } from 'react';
import { useDashboard } from '../../contexts/dashboard/dashboard-context';
import { UploadDocument } from './upload-document';
import { DocumentTable } from './document-table';
import { Button } from '@/components/ui/button';
import { api } from '@/services/api/api';
import { Skeleton } from '@/components/ui/skeleton';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Upload, FileText, Search, Filter,  MoreVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs,  TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

export const DocumentBrowser = () => {
    const [selectedDocument, setSelectedDocument] = useState<number | null>(null);
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [documents, setDocuments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 8,
        total: 0,
        totalPages: 0
    });
    const { user } = useDashboard();

    if (!user) return null;
    console.log(selectedDocument);
    const fetchDocuments = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/documents?page=${pagination.page}&pageSize=${pagination.pageSize}`);
            setDocuments(response.data.documents);
            setPagination(response.data.pagination);
        } catch (error) {
            console.error('Error fetching documents:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, [pagination.page]);

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= pagination.totalPages) {
            setPagination(prev => ({ ...prev, page: newPage }));
        }
    };

    const filteredDocuments = documents.filter(doc => {
        const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            doc.description?.toLowerCase().includes(searchQuery.toLowerCase());
        
        if (activeTab === 'all') return matchesSearch;
        if (activeTab === 'active') return matchesSearch && doc.isActive;
        if (activeTab === 'recent') {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            return matchesSearch && new Date(doc.createdAt) > sevenDaysAgo;
        }
        return matchesSearch && doc.fileType === activeTab.toUpperCase();
    });

    const getFileTypeIcon = (fileType: string) => {
        switch (fileType) {
            case 'PDF': return '📄';
            case 'WORD': return '📝';
            case 'EXCEL': return '📊';
            case 'IMAGE': return '🖼️';
            case 'VIDEO': return '🎬';
            default: return '📁';
        }
    };

    const getFileTypeColor = (fileType: string) => {
        switch (fileType) {
            case 'PDF': return 'bg-red-100 text-red-800';
            case 'WORD': return 'bg-blue-100 text-blue-800';
            case 'EXCEL': return 'bg-green-100 text-green-800';
            case 'IMAGE': return 'bg-purple-100 text-purple-800';
            case 'VIDEO': return 'bg-amber-100 text-amber-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Document Management</h2>
                    <p className="text-gray-600 mt-1">Manage and organize your documents</p>
                </div>
                
                {['SUPER_ADMIN', 'ADMIN', 'MANAGER'].includes(String(user.role)) && (
                    <Button 
                        onClick={() => setShowUploadForm(!showUploadForm)}
                        className="flex items-center gap-2"
                    >
                        {showUploadForm ? (
                            <>
                                <span>Cancel</span>
                            </>
                        ) : (
                            <>
                                <Plus className="h-4 w-4" />
                                <span>Upload Document</span>
                            </>
                        )}
                    </Button>
                )}
            </div>

            {showUploadForm && (
                <Card className="mb-6 border-blue-100 bg-blue-50/50">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Upload className="h-5 w-5" />
                            Upload New Document
                        </CardTitle>
                        <CardDescription>
                            Add a new document to your collection
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <UploadDocument 
                            onUploadSuccess={() => {
                                fetchDocuments();
                                setShowUploadForm(false);
                            }} 
                            onCancel={() => setShowUploadForm(false)} 
                        />
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    placeholder="Search documents..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                                        <Filter className="h-4 w-4" />
                                        Filter
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>All Documents</DropdownMenuItem>
                                    <DropdownMenuItem>My Documents</DropdownMenuItem>
                                    <DropdownMenuItem>Recently Added</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button variant="outline" size="sm" className="flex items-center gap-2">
                                <span>Sort: Newest</span>
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
                        <TabsList className="grid grid-cols-5 w-full max-w-md">
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="active">Active</TabsTrigger>
                            <TabsTrigger value="recent">Recent</TabsTrigger>
                            <TabsTrigger value="pdf">PDF</TabsTrigger>
                            <TabsTrigger value="image">Images</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    {loading ? (
                        <div className="space-y-4">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
                                    <Skeleton className="h-12 w-12 rounded-lg" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-48" />
                                        <Skeleton className="h-3 w-32" />
                                    </div>
                                    <Skeleton className="h-8 w-20" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                {filteredDocuments.slice(0, 2).map((doc) => (
                                    <Card key={doc.id} className="hover:shadow-md transition-shadow">
                                        <CardContent className="p-4">
                                            <div className="flex items-start gap-3">
                                                <div className={`p-3 rounded-lg ${getFileTypeColor(doc.fileType)}`}>
                                                    <span className="text-xl">{getFileTypeIcon(doc.fileType)}</span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold text-gray-900 truncate">{doc.title}</h4>
                                                    <p className="text-sm text-gray-600 truncate">
                                                        {doc.description || 'No description'}
                                                    </p>
                                                    <div className="flex items-center gap-3 mt-2">
                                                        <Badge variant="outline" className="text-xs">
                                                            {doc.fileType}
                                                        </Badge>
                                                        <span className="text-xs text-gray-500">
                                                            {doc.downloadCount} downloads
                                                        </span>
                                                    </div>
                                                </div>
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm"
                                                    onClick={() => setSelectedDocument(doc.id)}
                                                >
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            <DocumentTable
                                onSelectDocument={setSelectedDocument}
                                documents={filteredDocuments}
                            />

                            {pagination.totalPages > 1 && (
                                <div className="mt-6">
                                    <Pagination>
                                        <PaginationContent>
                                            <PaginationItem>
                                                <PaginationPrevious
                                                    onClick={() => handlePageChange(pagination.page - 1)}
                                                    disabled={pagination.page === 1}
                                                    className="cursor-pointer"
                                                />
                                            </PaginationItem>
                                            <PaginationItem>
                                                <span className="px-4 py-2 text-sm text-gray-600">
                                                    Page {pagination.page} of {pagination.totalPages}
                                                </span>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationNext
                                                    onClick={() => handlePageChange(pagination.page + 1)}
                                                    disabled={pagination.page === pagination.totalPages}
                                                    className="cursor-pointer"
                                                />
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                </div>
                            )}
                        </>
                    )}
                </CardContent>
            </Card> 

            {filteredDocuments.length === 0 && !loading && (
                <Card className="text-center py-12">
                    <CardContent>
                        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
                        <p className="text-gray-600">
                            {searchQuery ? 'Try adjusting your search query' : 'Get started by uploading your first document'}
                        </p>
                        {!searchQuery && ['SUPER_ADMIN', 'ADMIN', 'MANAGER'].includes(String(user.role)) && (
                            <Button 
                                onClick={() => setShowUploadForm(true)}
                                className="mt-4"
                            >
                                <Upload className="h-4 w-4 mr-2" />
                                Upload Document
                            </Button>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
};