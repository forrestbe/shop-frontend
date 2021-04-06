export interface Order {
  id: string;
  label: string;
  total: number;
  items: OrderItem[];
}

export interface OrderData {
  allOrders: Order[];
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  description: string;
  photo: {
    image: {
      publicUrlTransformed: string;
    }
  }
}
