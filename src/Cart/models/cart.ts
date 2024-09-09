import { type Product } from "../../Product/models/product";

export interface CartStoreProduct extends Pick<Product, "id"> {
  quantity: number;
}

export interface CartRecordType extends Product {
  quantity: number;
}
