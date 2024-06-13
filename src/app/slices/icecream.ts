// Ice Cream Service

export interface IceCream {
  id: string;
  flavor: string;
  description: string;
  price: number;
  image: string;
  quantityAvailable?: number;
}

export const icecreams: IceCream[] = [
  {
    id: '1',
    flavor: 'Vanilla',
    description: 'Classic vanilla ice cream',
    price: 1.99,
    image: 'https://images.unsplash.com/photo-1606782234535-2e4b0b4d7c7d',
  },
  {
    id: '2',
    flavor: 'Chocolate',
    description: 'Rich chocolate ice cream',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1606782234535-2e4b0b4d7c7d',
  },
  {
    id: '3',
    flavor: 'Strawberry',
    description: 'Sweet strawberry ice cream',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1606782234535-2e4b0b4d7c7d',
  },
];

export interface CartItem {
  icecream_id: string;
  quantity: number;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface Checkout {
  items: CartItem[];
  total: number;
  user: User;
  transaction_id: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: number;
  user: User;
  transaction_id: string;
  status: 'pending' | 'completed' | 'cancelled' | 'refunded' | 'picking' | 'shipping' | 'delivered';
}

// Order Service
// List Orders
// Create Order
// Update Order
// Delete Order



// Icecreams
// List Icecreams

// Cart

