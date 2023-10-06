import { ActionAddToCartType, CartType } from "@/types/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITIAL_STATE = {
  products: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create(
  persist<CartType & ActionAddToCartType>(
    (set, get) => ({
      products: INITIAL_STATE.products,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,
      addToCart: (item) => {
        const products = get().products;
        const productInState = products.find(
          //this is for checking if the product is already in the cart then we will not add the product again in the cart but we will increase the quantity of the product
          (product) => product.id === item.id
        );
        if (productInState) {
          const updatedProducts = products.map((product) =>
            product.id === productInState.id
              ? {
                  ...item,
                  quantity: item.quantity + product.quantity,
                  price: item.price + product.price,
                }
              : product
          );
          set((state) => ({
            products: updatedProducts,
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price * item.quantity,
          }));
        } else {
          set((state) => ({
            products: [...state.products, item],
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price * item.quantity,
          }));
        }
      },
      removeFromCart: (item) => {
        set((state) => ({
          products: [
            ...state.products.filter((product) => product.id !== item.id),
          ],
          totalItems: state.totalItems - item.quantity,
          totalPrice: state.totalPrice - item.price * item.quantity,
        }));
      },
    }),
    { name: "cart-storage", skipHydration: true } //this is for storing the cart data in localstorage for persisting the data when we refresh the page
  )
);
