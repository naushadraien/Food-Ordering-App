"use client"
import { useSession } from 'next-auth/react'
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify';

type Inputs = {
    title: string;
    description: string;
    price: number;
    catSlug: string;
  };
  
  type Option = {
    title: string;
    additionalPrice: number;
  };
const AddNewProducts = () => {
    const {data:session, status} = useSession()
    const [inputs, setInputs] = useState<Inputs>({
        title: "",
        description: "",
        price: 0,
        catSlug: "pizzas",
    })

    // console.log(inputs);
    

    const [options, setOptions] = useState<Option>({
        title: "small",
        additionalPrice: 0,
    })

    const [buttonOptionShow, setButtonOptionShow] = useState<Option[]>([])
    // console.log(options);
    const [file, setFile] = useState<File>()
    

    const router = useRouter()
    if(status === 'loading'){
        return <p>Loading...</p>
    }

    if(status === 'unauthenticated' || !session?.user.isAdmin ){
        router.push('/')
    }

    const handlechange=(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>{
      const value = e.target.name === 'price' ? parseFloat(e.target.value) : e.target.value;
      setInputs((prev)=>({...prev,[e.target.name]:value}))
    }

    const handleOptions=(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{ 
      const value = e.target.name === 'additionalPrice' ? parseFloat(e.target.value) : e.target.value;
      setOptions((prev)=>({...prev,[e.target.name]:value}))
    }

    const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement
      const item = (target.files as FileList)[0]
      setFile(item)
    }

    const uploadImage = async () => {
      const data  = new FormData();
      data.append('file', file!);
      data.append('upload_preset', 'babakadhaba'); //upload__preset is the folder name of cloudinary where we want to upload our image
      const res = await fetch("https://api.cloudinary.com/v1_1/dh1pmip8y/image",{
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: data,
      })
      console.log(res);
      
      // const resData = await res.json();
      // return resData.url;

    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // console.log("inputs"+ JSON.stringify({...inputs}), "options"+ JSON.stringify({options:buttonOptionShow}));
        
       try {
        const url = await uploadImage();
        const res = await fetch("http://localhost:3000/api/products", {
            method: "POST",
            body: JSON.stringify({
              img: url,
              ...inputs,
              options:buttonOptionShow,
            }),
          })
          // console.log(res.body)
          
          const data = await res.json()
          // console.log(data)
          // router.push(`/product/${data.id}`)
          if(res.status === 201){
            toast.success("Product Added Successfully");
          }else{
            toast.error(data.message);
          }
       } catch (error) {
        console.log(error);
       }
    }

  return (
<div className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center text-red-500 my-24">
      <form className="flex flex-wrap gap-6" onSubmit={handleSubmit}>
        <h1 className="text-4xl mb-2 text-gray-300 font-bold">
          Add New Product
        </h1>
        <div className="w-full flex flex-col gap-2 ">
          <label
            className="text-sm cursor-pointer flex gap-4 items-center"
            htmlFor="file"
          >
            <Image src="/upload.png" alt="" width={30} height={20} />
            <span>Upload Image</span>
          </label>
          <input
            type="file"
            onChange={handleChangeImg}
            id="file"
            // className="hidden"
          />
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label className="text-sm">Title</label>
          <input
            className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
            type="text"
            placeholder="Bella Napoli"
            name="title"
            onChange={handlechange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm">Description</label>
          <textarea
            rows={3}
            className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
            placeholder="A timeless favorite with a twist, showcasing a thin crust topped with sweet tomatoes, fresh basil and creamy mozzarella."
            name="description"
            onChange={handlechange}
          />
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label className="text-sm">Price</label>
          <input
            className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
            type="number"
            placeholder="29"
            name="price"
            onChange={handlechange}
          />
        </div>
        <div className="w-1/4 flex flex-col gap-2">
          <label className="text-sm">Category</label>

          <select name="catSlug" onChange={handlechange} value={inputs.catSlug} className='outline-none'>
          <option value="pizzas">pizzas</option>
          <option value="burgers">burgers</option>
          <option value="pastas">pastas</option>
        </select>

          {/* <input
            className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
            type="text"
            placeholder="pizzas"
            name="catSlug"
            onChange={handlechange}
          /> */}
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm">Options</label>
          <div className="flex w-1/4">
          <select name="title" onChange={handleOptions} value={options.title} className='outline-none'>
          <option value="small">small</option>
          <option value="medium">medium</option>
          <option value="large">large</option>
        </select>
            {/* <input
              className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
              type="text"
              placeholder="Title"
              name="title"
             onChange={handleOptions}
            /> */}
            <input
              className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
              type="number"
              placeholder="Additional Price"
              name="additionalPrice"
             onChange={handleOptions}
            />
            <button
              className="bg-gray-500 p-2 text-white"
              onClick={() => setButtonOptionShow((prev) => [...prev, options])}
            >
              Add Option
            </button>
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
            {buttonOptionShow.map((opt) => (
              <div
                key={opt.title}
                className="p-2  rounded-md cursor-pointer bg-gray-200 text-gray-400"
                onClick={() =>
                  setButtonOptionShow((prev) =>
                    prev.filter((item) => item.title !== opt.title)
                  )
                }
              >
                <span>{opt.title}</span>
                <span className="text-xs"> (+ ${opt.additionalPrice})</span>
              </div>
            ))}
          </div>
        </div>
        <button
          className="bg-red-500 p-4 text-white w-48 rounded-md relative h-14 flex items-center justify-center"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default AddNewProducts