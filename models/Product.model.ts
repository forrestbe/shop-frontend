export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  photo: ProductPhoto;
}

export interface ProductPhoto {
  id: number;
  image: {
    publicUrlTransformed: string;
  },
  altText: string;
}

export interface SingleProductData {
  Product: Product
}
