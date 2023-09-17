import { Injectable } from '@nestjs/common';
import { db, Product } from '../db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
  public getAll(): Product[] {
    return db.products;
  }
  public getById(productId: Product['id']): Product | null {
    return db.products.find((product) => product.id === productId);
  }

  public deleteById(productId: Product['id']): void {
    db.products.filter((product) => product.id !== productId);
  }

  public create(productData: Omit<Product, 'id'>): Product {
    const newProduct = { ...productData, id: uuidv4() };
    db.products.push(newProduct);
    return newProduct;
  }
  1;
  public updateById(
    productId: Product['id'],
    productData: Omit<Product, 'id'>,
  ): void {
    db.products = db.products.map((product) => {
      if (product.id === productId) {
        return { ...product, ...productData };
      }
      return product;
    });
  }
}
