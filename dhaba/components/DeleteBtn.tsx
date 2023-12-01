"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "./ui/button";
import { Loading } from "./Loading";

const DeleteBtn = ({ id }: { id: string }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <Loading />;
  if (status === "unauthenticated" || !session?.user.isAdmin) return;

  const handleDelete = async () => {
    const res = await fetch(
      `${process.env.Next_PUBLIC_URL}/api/products/${id}`,
      {
        method: "DELETE",
      }
    );
    const data = await res.json();
    if (res.status === 200) {
      router.push("/menu");
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <Button
      className="bg-red-400 p-2 rounded-full absolute top-4 right-4"
      onClick={handleDelete}
    >
      <Image src="/delete.png" alt="delete" width={20} height={20} />
    </Button>
  );
};

export default DeleteBtn;
