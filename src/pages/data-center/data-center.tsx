import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Database, Search, Loader } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Header } from "../home/components/header";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/auth/auth-context";
import { Document } from "@/@types/document";
import { api } from "@/services/api/api";

export const ResearchDataCenter = () => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const { isAuthenticated } = useAuth();
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const [downloadingIds, setDownloadingIds] = useState<Set<number>>(new Set());
    const [searchTerm, setSearchTerm] = useState("");
    const [filterFormat, setFilterFormat] = useState("");

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                setLoading(true);
                const response = await api.get('/documents');

                if (response.data.success) {
                    setDocuments(response.data.documents);
                } else {
                    toast.error(response.data.message || 'Failed to fetch documents');
                }
            } catch (error) {
                toast.error('Network error while fetching documents');
                console.error('Error fetching documents:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
        setFilterFormat("");
    }, []);

    const handleDownload = async (documentId: number, documentTitle: string, fileType: string) => {
        if (!isAuthenticated) {
            toast.error(t('researchData.errors.loginRequired'));
            return;
        }

        if (downloadingIds.has(documentId)) return;

        try {
            setDownloadingIds(prev => new Set(prev.add(documentId)));

            const response = await api.get(`/documents/download/${documentId}`);

            if (!response.data.success || !response.data.downloadUrl) {
                throw new Error(response.data.message || 'Invalid download URL');
            }

            // Create a hidden anchor tag for download
            const link = document.createElement('a');
            link.href = response.data.downloadUrl;
            link.download = response.data.filename ||
                `${documentTitle.replace(/[^a-zA-Z0-9-_]/g, "_")}.${fileType.toLowerCase()}`;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';

            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Update local state
            setDocuments(prevDocs =>
                prevDocs.map(doc =>
                    doc.id === documentId
                        ? { ...doc, downloadCount: (doc.downloadCount || 0) + 1 }
                        : doc
                )
            );

            toast.success(t('researchData.downloadStarted'));

        } catch (error: any) {
            console.error('Download error:', error);

            let errorMessage = t('researchData.errors.downloadFailed');

            if (error.response) {
                if (error.response.status === 404) {
                    errorMessage = t('researchData.errors.documentNotFound');
                } else if (error.response.status === 403) {
                    errorMessage = t('researchData.errors.noPermission');
                } else if (error.response.data?.message) {
                    errorMessage = error.response.data.message;
                }
            } else if (error.message) {
                errorMessage = error.message;
            }

            toast.error(errorMessage);
        } finally {
            setDownloadingIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(documentId);
                return newSet;
            });
        }
    };

    const filteredDocuments = documents.filter(doc => {
        const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (doc.description && doc.description.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesFormat = !filterFormat ||
            (doc.fileType && doc.fileType.toLowerCase() === filterFormat.toLowerCase());

        return matchesSearch && matchesFormat;
    });

    const formatFileType = (fileType: string) => {
        const types: Record<string, string> = {
            'PDF': 'PDF',
            'DOCX': 'Word',
            'XLSX': 'Excel',
            'CSV': 'CSV',
            'JSON': 'JSON'
        };
        return types[fileType?.toUpperCase()] || fileType || 'Unknown';
    };

    const formatSize = (size: string) => {
        if (!size) return 'N/A';
        if (size.includes('MB')) return size;
        const bytes = parseInt(size);
        if (isNaN(bytes)) return size;
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    };

    return (
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
            <Header />
            <div className="container mx-auto px-4 pt-20">
                {/* Hero Section */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Badge variant="secondary" className="mb-4">
                            {t("researchData.badge")}
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                            {t("researchData.title")}
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            {t("researchData.description")}
                        </p>
                    </motion.div>
                </div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
                >
                    <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                        <div className="text-3xl font-bold text-primary dark:text-primary-300 mb-2">
                            {documents.length}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                            {t("researchData.stats.datasets")}
                        </div>
                    </div>
                    <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                        <div className="text-3xl font-bold text-primary dark:text-primary-300 mb-2">
                            {new Set(documents.map(doc => doc.fileType)).size}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                            {t("researchData.stats.topics")}
                        </div>
                    </div>
                    <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                        <div className="text-3xl font-bold text-primary dark:text-primary-300 mb-2">
                            {documents.reduce((sum, doc) => sum + (doc.downloadCount || 0), 0)}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                            {t("researchData.stats.downloads")}
                        </div>
                    </div>
                    <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                        <div className="text-3xl font-bold text-primary dark:text-primary-300 mb-2">
                            100%
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                            {t("researchData.stats.anon")}
                        </div>
                    </div>
                </motion.div>

                {/* Search and Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={`p-6 rounded-xl mb-12 ${theme === 'dark' ? 'bg-gray-900 border border-gray-800' : 'bg-gray-50 shadow-sm'}`}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder={t("researchData.search.placeholder")}
                                    className="pl-10"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Datasets Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {loading ? (
                        Array.from({ length: 6 }).map((_, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className={`h-full flex flex-col ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : ''}`}>
                                    <CardHeader>
                                        <Skeleton className="h-6 w-24 mb-4" />
                                        <Skeleton className="h-8 w-full mb-2" />
                                        <Skeleton className="h-4 w-full" />
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <Skeleton className="h-6 w-16" />
                                            <Skeleton className="h-6 w-20" />
                                        </div>
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-full" />
                                            <Skeleton className="h-4 w-full" />
                                            <Skeleton className="h-4 w-full" />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Skeleton className="h-10 w-full" />
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))
                    ) : filteredDocuments.length > 0 ? (
                        filteredDocuments.map((document, index) => (
                            <motion.div
                                key={document.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className={`h-full flex flex-col ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : ''}`}>
                                    <CardHeader>
                                        <div className="flex items-center mb-4">
                                            <Database className="h-6 w-6 text-primary dark:text-primary-300 mr-3" />
                                            <Badge variant="outline" className="uppercase">
                                                {formatFileType(document.fileType || '')}
                                            </Badge>
                                        </div>
                                        <CardTitle className="text-xl">{document.title}</CardTitle>
                                        <CardDescription className="mt-2">
                                            {document.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                            <div className="flex justify-between mb-1">
                                                <span>{t("researchData.size")}:</span>
                                                <span>{formatSize(document.size || '')}</span>
                                            </div>
                                            <div className="flex justify-between mb-1">
                                                <span>{t("researchData.downloads")}:</span>
                                                <span>{document.downloadCount || 0}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>{t("researchData.date")}:</span>
                                                <span>{new Date(document.createdAt || '').toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button
                                            className="w-full"
                                            size="lg"
                                            onClick={() => handleDownload(document.id, document.title, document.fileType)}
                                            disabled={downloadingIds.has(document.id) || !isAuthenticated}
                                        >
                                            {downloadingIds.has(document.id) ? (
                                                <>
                                                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                                                    Downloading...
                                                </>
                                            ) : (
                                                <>
                                                    <Download className="h-4 w-4 mr-2" />
                                                    {t("researchData.download")}
                                                </>
                                            )}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <h3 className="text-xl font-medium text-gray-500 dark:text-gray-400">
                                No documents found matching your criteria
                            </h3>
                        </div>
                    )}
                </div>

                {/* CTA */}
                {!isAuthenticated && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className={`rounded-2xl p-8 md:p-12 text-center ${theme === 'dark' ? 'bg-gray-900 border border-gray-800' : 'bg-gray-50 shadow-sm'}`}
                    >
                        <div className="max-w-3xl mx-auto">
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                Want to download documents?
                            </h3>
                            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                                Sign in to access all research materials and download datasets for your own analysis.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Button size="lg" onClick={() => window.location.href = '/sign-in'}>
                                    Sign In
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
};