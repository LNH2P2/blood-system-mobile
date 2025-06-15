import { ProductType } from '../types'

// Initialize currentId to 5 since we're creating 5 initial products
let currentId = 5
const products: ProductType[] = Array.from({ length: 5 }).map((_, index) => ({
  id: index + 1,
  name: `Product ${index + 1}`,
  description: `Description ${index + 1}`
}))

export async function listProducts() {
  console.log('listProducts call')
  return products
}

export async function getProduct(id: number): Promise<ProductType | undefined> {
  console.log('getProduct call')
  return products.find((product) => product.id === id)
}

export function createProduct(product: Omit<ProductType, 'id'>): ProductType {
  console.log('createProduct call')
  // Increment the currentId for each new product
  currentId++

  const newProduct: ProductType = {
    id: currentId,
    ...product
  }

  products.push(newProduct)
  console.log('newProduct', newProduct)
  return newProduct
}

export function updateProduct(
  id: number,
  updates: Partial<Omit<ProductType, 'id'>>
): ProductType | undefined {
  console.log('updateProduct call')
  const index = products.findIndex((product) => product.id === id)

  if (index === -1) return undefined

  products[index] = {
    ...products[index],
    ...updates
  }

  return products[index]
}

export function deleteProduct(id: number): boolean {
  console.log('deleteProduct call')
  const initialLength = products.length
  const index = products.findIndex((product) => product.id === id)

  if (index === -1) return false

  products.splice(index, 1)
  return products.length < initialLength
}
