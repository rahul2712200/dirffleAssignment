// src/Services/ProductService.ts
import api from "./api";
import { Product } from "../Interfaces/model";

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

/**
 * Fetch products with pagination and optional search
 * @param page Page number (1-based)
 * @param limit Items per page
 * @param search Optional search keyword
 * @returns ProductResponse
 */
export const fetchProducts = async (
    page = 1,
    limit = 10,
    search?: string
  ): Promise<ProductResponse> => {
    const skip = (page - 1) * limit;
  
    // Use different endpoint if search exists
    let url = search
      ? `/product/search?limit=${limit}&skip=${skip}&q=${encodeURIComponent(search)}`
      : `/products?limit=${limit}&skip=${skip}`;
  
    const res = await api.get<ProductResponse>(url);
    return res.data;
  };
