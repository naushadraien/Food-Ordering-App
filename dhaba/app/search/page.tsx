"use client";
import { ProductType } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

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
      <div className="m-4 text-center">Search Results For: {query}</div>
      <div className="flex justify-center items-center gap-4 flex-col sm:flex-row">
        {filteredProducts.length > 0 &&
          filteredProducts.map((product: ProductType) => (
            <div key={product.id}>
              <Link href={`/product/${product.id}`}>
                <Card className="m-4">
                  <CardHeader>
                    {product.img && (
                      <Image
                        src={product.img}
                        alt={product.title}
                        width={200}
                        height={200}
                        className="w-48 h-36 object-fill rounded-md mb-4"
                      />
                    )}
                    <CardTitle>{product.title}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Rs. {product.price}</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Search;
