
import { Injectable, signal } from '@angular/core';

export type ProductStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';
export type ProductCategory = 'Electronics' | 'Apparel' | 'Groceries' | 'Books' | 'Home Goods';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  status: ProductStatus;
  imageUrl: string;
  tags: string[];
  featured: boolean;
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Quantum Wireless Mouse',
    description: 'A high-precision wireless mouse with customizable buttons and RGB lighting. Perfect for gaming and productivity.',
    price: 89.99,
    category: 'Electronics',
    status: 'In Stock',
    imageUrl: 'https://picsum.photos/seed/product1/600/400',
    tags: ['Gaming', 'RGB', 'Wireless'],
    featured: true,
  },
  {
    id: 2,
    name: 'Aero-Street Urban Hoodie',
    description: 'Comfortable and stylish hoodie made from 100% organic cotton. Features a minimalist design.',
    price: 59.50,
    category: 'Apparel',
    status: 'In Stock',
    imageUrl: 'https://picsum.photos/seed/product2/600/400',
    tags: ['Fashion', 'Comfort', 'Organic'],
    featured: false,
  },
  {
    id: 3,
    name: 'Gourmet Italian Coffee Beans',
    description: 'A rich, full-bodied espresso blend, ethically sourced from the finest Italian coffee estates.',
    price: 22.00,
    category: 'Groceries',
    status: 'Low Stock',
    imageUrl: 'https://picsum.photos/seed/product3/600/400',
    tags: ['Coffee', 'Gourmet', 'Fair Trade'],
    featured: false,
  },
  {
    id: 4,
    name: 'The Philosophy of Time',
    description: 'A deep dive into the metaphysical and scientific concepts of time. A must-read for enthusiasts.',
    price: 18.75,
    category: 'Books',
    status: 'Out of Stock',
    imageUrl: 'https://picsum.photos/seed/product4/600/400',
    tags: ['Philosophy', 'Science', 'Hardcover'],
    featured: true,
  },
   {
    id: 5,
    name: 'Minimalist Ceramic Vase',
    description: 'A beautifully crafted ceramic vase with a matte finish. Adds a touch of elegance to any room.',
    price: 45.00,
    category: 'Home Goods',
    status: 'In Stock',
    imageUrl: 'https://picsum.photos/seed/product5/600/400',
    tags: ['Decor', 'Ceramic', 'Minimalist'],
    featured: false,
  },
   {
    id: 6,
    name: 'Smart LED Desk Lamp',
    description: 'A modern desk lamp with adjustable brightness, color temperature, and smartphone integration.',
    price: 120.00,
    category: 'Electronics',
    status: 'In Stock',
    imageUrl: 'https://picsum.photos/seed/product6/600/400',
    tags: ['Smart Home', 'LED', 'Productivity'],
    featured: true,
  }
];

@Injectable({ providedIn: 'root' })
export class ProductService {
  private productsState = signal<Product[]>(MOCK_PRODUCTS);
  private nextId = signal(MOCK_PRODUCTS.length + 1);

  // Public signals for components to consume
  products = this.productsState.asReadonly();

  getProduct(id: number) {
    return this.products().find(p => p.id === id);
  }

  addProduct(product: Omit<Product, 'id'>) {
    const newProduct: Product = { ...product, id: this.nextId() };
    this.productsState.update(products => [...products, newProduct]);
    this.nextId.update(id => id + 1);
  }

  updateProduct(updatedProduct: Product) {
    this.productsState.update(products =>
      products.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  }

  deleteProduct(id: number) {
    this.productsState.update(products => products.filter(p => p.id !== id));
  }
}
