import { StringMappingType } from "typescript";

export interface Option {
    key: string;
    value: string;
  }

export interface Product {
    id: number
    title: string;
    price: string;
    thumbnail: string
}