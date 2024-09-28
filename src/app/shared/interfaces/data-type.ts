
export interface user {
  id: number,
  name: string,
  email: string,
  password: string
}

export interface AuthResponse {
  tokenStr: string;
  user: user;
  message: any
}

export interface product {
  id: number,
  name: string,
  imgUrl: string,
  price: number,
  color: string,
  quantity: number,
  category: category,
  description: string,
  user: user
}

export interface category {
  id: number,
  name: string,
  imgUrl: string
}

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}