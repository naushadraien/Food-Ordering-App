"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

const Notification = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  
  
  const handleSearch = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?q=${search}`)
  };
  return <div className="h-12 bg-red-500 text-white flex justify-center items-center px-4 text-center text-sm md:text-base cursor-pointer">
    <form onSubmit={handleSearch}>
      <input type="text" name="search" className="text-red-500 outline-none" onChange={e=>setSearch(e.target.value)} />
    </form>
  </div>;
};

export default Notification;
