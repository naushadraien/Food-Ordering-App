export type MenuType = {
  id: number;
  slug: string;
  title: string;
  description?: string;
  img?: string;
  color: string;
}[];

export type ProductType = {
  //this is for single product but when we have to use the ProductType for multiple products then we have to use the array of ProductType like ProductType[]
  id: number;
  title: string;
  desc?: string;
  img?: string;
  price: number;
  options?: { title: string; additionalPrice: number }[];
};
