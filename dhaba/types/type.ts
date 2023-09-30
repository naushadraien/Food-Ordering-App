export type MenuType = {
  id: string;
  slug: string;
  title: string;
  description?: string;
  img?: string;
  color: string;
}[];

export type ProductType = {
  //this is for single product but when we have to use the ProductType for multiple products then we have to use the array of ProductType like ProductType[]
  id: string;
  title: string;
  desc?: string;
  img?: string;
  price: number;
  options?: { title: string; additionalPrice: number }[];
};

export type OrderType = {
  id: string;
  userEmail: string;
  price: number;
  products: CartItemType[];
  status: string;
  createdAt: Date;
  intent_id?: string;
};

export type CartItemType = {
  id: string;
  title: string;
  img?: string;
  price: number;
  optionTitle?: string;
  quantity: number;
};
