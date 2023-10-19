"use client"
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const AddNewProduct = () => {
    const {data:session} = useSession();
  return (
    <div>
        {
            session?.user.isAdmin  && (
                <Link href="/addNewProduct">
                    Add New Product
                </Link>
            )
        }
    </div>
  )
}

export default AddNewProduct