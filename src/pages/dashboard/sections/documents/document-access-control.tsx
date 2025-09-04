import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Role, UserRole } from '@/@types/role';
import { api } from '@/services/api/api';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Trash2 } from 'lucide-react';

type AccessEntry = {
  id: string;
  email: string;
  role: UserRole;
  canView: boolean;
  canDownload: boolean;
};

export const DocumentAccessControl = ({ 
  documentId,
  onClose
}: { 
  documentId: number;
  onClose?: () => void;
}) => {
  const [email, setEmail] = useState('');
  const [accessList, setAccessList] = useState<AccessEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    const fetchAccessControls = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/documents/${documentId}/access`);
        setAccessList(response.data.accessList || []);
      } catch (error) {
        toast.error('Failed to load access controls');
        console.error('Error fetching access controls:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccessControls();
  }, [documentId]);
 
  const handleAddAccess = () => {
    if (!email || emailError) return;
    
    if (accessList.some(entry => entry.email === email)) {
      setEmailError('This email already has access');
      return;
    }

    const newEntry: AccessEntry = {
      id: `temp-${Math.random().toString(36).substring(7)}`,
      email,
      role: Role.USER,
      canView: true,
      canDownload: false,
    };
    
    setAccessList([...accessList, newEntry]);
    setEmail('');
    setEmailError('');
  };

  const handleRemoveAccess = (id: string) => {
    setAccessList(accessList.filter(entry => entry.id !== id));
  };

  const updateAccess = (id: string, field: keyof AccessEntry, value: any) => {
    setAccessList(accessList.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await api.put(`/documents/${documentId}/access`, {
        accessList: accessList.map(({ email, canView, canDownload }) => ({
          email,
          permissions: {
            view: canView,
            download: canDownload
          }
        }))
      });
      toast.success('Access controls saved successfully');
      onClose?.();
    } catch (error) {
      toast.error('Failed to save access controls');
      console.error('Error saving access controls:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">Access Control for Document #{documentId}</h3>
        {onClose && (
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            &times;
          </button>
        )}
      </div>
      
      <div className="mb-6">
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              type="email"
              placeholder="Enter user email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddAccess()}
              className={emailError ? 'border-red-500' : ''}
            />
            {emailError && (
              <p className="mt-1 text-sm text-red-500">{emailError}</p>
            )}
          </div>
          <Button 
            onClick={handleAddAccess}
            disabled={!email || !!emailError}
          >
            Add
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50 dark:bg-gray-700">
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>View</TableHead>
                  <TableHead>Download</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accessList.length > 0 ? (
                  accessList.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.email}</TableCell>
                      <TableCell>
                        <Checkbox
                          checked={entry.canView}
                          onCheckedChange={(checked) => 
                            updateAccess(entry.id, 'canView', checked)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          checked={entry.canDownload}
                          onCheckedChange={(checked) => 
                            updateAccess(entry.id, 'canDownload', checked)
                          }
                          disabled={!entry.canView}
                        />
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleRemoveAccess(entry.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center text-gray-500">
                      No access controls defined yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {accessList.length > 0 && (
            <div className="mt-4 flex justify-end gap-2">
              {onClose && (
                <Button 
                  variant="outline" 
                  onClick={onClose}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
              )}
              <Button 
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : 'Save Changes'}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};