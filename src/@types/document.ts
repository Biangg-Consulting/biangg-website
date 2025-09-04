import { FileType } from "./fileType";

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