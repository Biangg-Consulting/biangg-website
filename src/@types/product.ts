export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    sku: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}