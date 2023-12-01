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
import { Loading } from "@/components/Loading";

const Search = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q"); // q is the key of the query string received from the url
  //   console.log(query);

  const { isLoading, data } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      return await fetch("/api/product", {
        cache: "no-store",
      }).then((res) => res.json());
    },
  });

  // console.log(data);

  if (isLoading) return <Loading />;
  // Filter the products based on the search criteria
  const filteredProducts = data.filter((product: ProductType) => {
    return product.title.toLowerCase().includes(query!.toLowerCase());
  });

  return (
    <div>
      <div className="m-4 text-center">
        Search Results For: <span className="text-red-500">{query}</span>
      </div>
      <div className="flex justify-center items-center gap-4 flex-col sm:flex-row">
        {filteredProducts.length > 0 ? (
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
                        className="w-32 h-32 md:h-36 md:w-48 object-fill rounded-md mb-4"
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
          ))
        ) : (
          <div className="m-4 text-center font-bold text-red-500">
            No Results Found!
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
