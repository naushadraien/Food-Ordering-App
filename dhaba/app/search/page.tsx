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
    <div className="px-2">
      <div className="mt-3 text-center">
        Search Results For: <span className="text-red-500">{query}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-4 mt-28">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product: ProductType) => (
            <div key={product.id} className="text-center mb-10">
              <Link href={`/product/${product.id}`}>
                <Card className="mb-10 w-full flex justify-center items-center flex-col h-72 relative bg-orange-500 hover:scale-105 ease-in transition-all delay-75">
                  <CardHeader className="flex items-center">
                    {product.img && (
                      <Image
                        src={product.img}
                        alt={product.title}
                        width={400}
                        height={400}
                        className="h-36 w-48 object-cover rounded-md absolute -mt-24"
                      />
                    )}
                    <CardTitle className="pt-16">{product.title}</CardTitle>
                    <CardDescription className="pt-2 text-gray-700">
                      {product.description?.slice(0, 50)}
                      {"..."}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="font-bold">
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
