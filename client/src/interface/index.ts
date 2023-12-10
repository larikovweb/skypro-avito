export interface IUser {
  id: number;
  name: string;
  email: string;
  city: string;
  avatar: string;
  sells_from: string;
  phone: string;
  role: string;
  surname: string;
}

export interface IImage {
  id: number;
  ad_id: number;
  url: string;
}

export interface IArticle {
  created_on: string;
  description: string;
  id: number;
  images: IImage[];
  price: number;
  title: string;
  user: IUser;
  user_id: number;
}

export type TFields = Record<string, string | number>;

export interface IComment {
  id: number;
  ad_id: number;
  author_id: number;
  text: string;
  created_on: string;
}
