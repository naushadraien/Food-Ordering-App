"use client"

import { useSession } from "next-auth/react";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DeleteBtn = ({id} : {id : string}) => {
    const {data:session, status} = useSession();
    const router = useRouter();

    if(status === "loading") return <p>Loading...</p>;
    if(status === "unauthenticated" || !session?.user.isAdmin) return;

    const handleDelete = async()=>{
     const res = await fetch(`http://localhost:3000/api/products/${id}`,{
            method: "DELETE",
        })
        const data = await res.json();
        if(res.status === 200){
            router.push("/menu")
            toast.success(data.message);
        }else{
            toast.error(data.message);
        }
    }

  return (
    <button className="bg-red-400 p-2 rounded-full absolute top-4 right-4" onClick={handleDelete}>
        <Image src="/delete.png" alt="delete" width={20} height={20} />
    </button>
  )
}

export default DeleteBtn