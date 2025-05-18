import { ProductType } from "../types";

// Initialize currentId to 5 since we're creating 5 initial products
let currentId = 5;
const products: ProductType[] = Array.from({ length: 5 }).map((_, index) => ({
    id: index+1,
    name: `Product ${index+1}`,
    description: `Description ${index+1}`,
}));

export function listProducts() {
    return products;
}

export function getProduct(id: number): ProductType | undefined {
    return products.find(product => product.id === id);
}

export function createProduct(product: Omit<ProductType, "id">): ProductType {
    // Increment the currentId for each new product
    currentId++;
    
    const newProduct: ProductType = {
        id: currentId,
        ...product
    };
    
    products.push(newProduct);
    return newProduct;
}

export function updateProduct(id: number, updates: Partial<Omit<ProductType, "id">>): ProductType | undefined {
    const index = products.findIndex(product => product.id === id);
    
    if (index === -1) return undefined;
    
    products[index] = {
        ...products[index],
        ...updates
    };
    
    return products[index];
}

export function deleteProduct(id: number): boolean {
    const initialLength = products.length;
    const index = products.findIndex(product => product.id === id);
    
    if (index === -1) return false;
    
    products.splice(index, 1);
    return products.length < initialLength;
}

