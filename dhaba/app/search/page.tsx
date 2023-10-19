"use client";
import { ProductType } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
const Search = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q"); // q is the key of the query string received from the url
  //   console.log(query);

  const { isLoading, data } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      return await fetch("http://localhost:3000/api/product", {
        cache: "no-store",
      }).then((res) => res.json());
    },
  });

  // console.log(data);

  if (isLoading) return <div>Loading...</div>;
  // Filter the products based on the search criteria
  const filteredProducts = data.filter((product: ProductType) => {
    return product.title.toLowerCase().includes(query!.toLowerCase());
  });

  return (
    <div>
      <div>Search Results For: {query}</div>
      <div>
        {filteredProducts.length > 0 &&
          filteredProducts.map((product: ProductType) => (
            <div key={product.id}>
              <Link href={`/product/${product.id}`}>
                <h2>{product.title}</h2>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Search;
