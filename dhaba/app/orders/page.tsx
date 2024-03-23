"use client";
import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderType } from "@/types/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
const Orders = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "unauthenticated") {
    router.push("/");
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => fetch("/api/orders").then((res) => res.json()),
  });

  // console.log("data", data);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => {
      return fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(status),
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["orders"] }); //here querykey is the key of the query which we want to invalidate which is taken from useQuery
      //where invalidateQueries is used to refetch the data
    },
  });
  const deleteMutation = useMutation({
    mutationFn: ({ id }: { id: string }) => {
      return fetch(`/api/orders/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["orders"] }); //here querykey is the key of the query which we want to invalidate which is taken from useQuery
      //where invalidateQueries is used to refetch the data
    },
  });

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    // const input = form.elements[0] as HTMLInputElement;
    // const status = input.value; //directly accessing the value of input without using state
    const select = form.elements[1] as HTMLSelectElement;
    const status = select.value;
    mutation.mutate({ id, status }); //here we are passing the id and status to the mutation function which is defined above and then we are using the mutation function to mutate the data
    form.reset();
    toast.success("Order Status Updated Successfully");
  };
  const handleDelete = (id: string) => {
    deleteMutation.mutate({ id }); //here we are passing the id and status to the mutation function which is defined above and then we are using the mutation function to mutate the data
    toast.success("Order deleted Successfully!");
  };

  if (isLoading || status === "loading") return <Loading />;

  return (
    <div className="p-4 lg:px-20 xl:px-40">
      <table className="w-full border-separate border-spacing-3">
        <thead>
          <tr className="text-left">
            <th className="hidden md:block">Order ID</th>
            <th>Date</th>
            <th>Price </th>
            <th className="hidden md:block">Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order: OrderType) => (
            <tr
              className={`text-sm md:text-base ${
                order.status !== "delivered" ? "bg-red-50" : "bg-green-50"
              } dark:text-gray-100 dark:bg-gray-800`}
              key={order.id}
            >
              <td className="hidden md:block py-6 px-1">{order.id}</td>
              <td className="py-6 px-1">
                {order.createdAt.toString().slice(0, 10)}
              </td>
              <td className="py-6 px-1">{order.price}</td>
              <td className="hidden md:block py-6 px-1">
                {order.products.map((product) => (
                  <div key={product.id}>
                    <span>{product.title}</span>
                  </div>
                ))}
              </td>
              {session?.user.isAdmin ? (
                <td>
                  <form
                    className="flex justify-center items-center gap-4"
                    onSubmit={(e) => handleUpdate(e, order.id)}
                  >
                    <Select>
                      <SelectTrigger className="md:w-[500px] focus:ring-0 focus:border-none my-4 md:my-0">
                        <SelectValue placeholder={order.status} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Being Prepared!">
                          Being Prepared!
                        </SelectItem>
                        <SelectItem value="On the Way!">On the Way!</SelectItem>
                        <SelectItem value="Delivered!">Delivered!</SelectItem>
                      </SelectContent>
                    </Select>
                    {/* <input
                      type="text"
                      placeholder={order.status}
                      className="p-2 ring-1 ring-red-100 rounded-md"
                    /> */}
                    <Button className="bg-red-400 p-2 rounded-full">
                      <Image
                        src="/edit.png"
                        alt="edit"
                        width={20}
                        height={20}
                      />
                    </Button>
                    <div
                      className="bg-red-400 p-2 rounded-full"
                      onClick={() => handleDelete(order.id)}
                      role="button"
                    >
                      <Image
                        src="/delete.png"
                        alt="edit"
                        width={20}
                        height={20}
                      />
                    </div>
                  </form>
                </td>
              ) : (
                <td className="py-6 px-1">{order.status}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
