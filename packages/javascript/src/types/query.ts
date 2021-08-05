import type { Product, ProductConnection } from './typesRoot'

export interface ProductByIdQueryVariable {
  id: string
}

export interface ProductsQueryVariable {
  first: number
  after: string
}

export interface ReturnedData<Data extends any> {
  data: Data
  errors: unknown[]
}

export interface ProductQueryResult {
  product: Product
}

export interface ProductsQueryResult {
  products: ProductConnection
}

export interface StorefrontQuery {
  product: (id: ProductByIdQueryVariable['id']) => Promise<ReturnedData<ProductQueryResult>>
  products: (
    varaibles: ProductsQueryVariable
  ) => Promise<ReturnedData<ProductsQueryResult>>
}