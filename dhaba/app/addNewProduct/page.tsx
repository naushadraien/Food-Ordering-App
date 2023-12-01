"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Loading } from "@/components/Loading";

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
  const { data: session, status } = useSession();
  const [inputs, setInputs] = useState<Inputs>({
    title: "",
    description: "",
    price: 0,
    catSlug: "pizzas",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFeatured, setIsFeatured] = useState<boolean>();

  // console.log(inputs);

  const [options, setOptions] = useState<Option>({
    title: "small",
    additionalPrice: 0,
  });

  const [buttonOptionShow, setButtonOptionShow] = useState<Option[]>([]);
  // console.log(options);
  const [file, setFile] = useState<File>();

  const router = useRouter();
  if (status === "loading") {
    return <Loading />;
  }

  if (status === "unauthenticated" || !session?.user.isAdmin) {
    router.push("/");
  }

  const handlechange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const value =
      e.target.name === "price" ? parseFloat(e.target.value) : e.target.value;
    setInputs((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const handleClick = () => {
    setIsFeatured((prev) => !prev);
  };

  const handleOptions = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value =
      e.target.name === "additionalPrice"
        ? parseFloat(e.target.value)
        : e.target.value;
    setOptions((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const item = (target.files as FileList)[0];
    setFile(item);
  };

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", file!);
    data.append("upload_preset", "babakadhaba"); //upload__preset is the folder name of cloudinary where we want to upload our image
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dh1pmip8y/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    // console.log(res);

    const resData = await res.json();
    // console.log(resData.url);

    return resData.url;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("inputs"+ JSON.stringify({...inputs}), "options"+ JSON.stringify({options:buttonOptionShow}));

    setIsSubmitting(true);
    try {
      const url = await uploadImage();
      const res = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify({
          img: url,
          ...inputs,
          isFeatured,
          options: buttonOptionShow,
        }),
      });
      // console.log(res.body)

      const data = await res.json();
      // console.log(data)
      // router.push(`/product/${data.id}`)
      if (res.status === 201) {
        setIsSubmitting(false);
        toast.success("Product Added Successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 lg:px-20 xl:px-40 h-full flex items-center justify-center text-red-500 my-4">
      <form className="flex flex-wrap gap-6" onSubmit={handleSubmit}>
        <h1 className="text-4xl mb-2 text-red-500 font-bold">
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
          <Input
            id="picture"
            type="file"
            onChange={handleChangeImg}
            className="text-red-500 ring-1 ring-red-200"
            required
          />
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label className="text-sm">Title</label>
          <Input
            className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 focus-visible:ring-0 focus-visible:border-none"
            type="text"
            name="title"
            onChange={handlechange}
            required
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm">Description</label>
          <Textarea
            rows={3}
            className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 focus-visible:ring-0 focus-visible:border-none"
            name="description"
            onChange={handlechange}
            required
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            onCheckedChange={handleClick}
            // checked={isFeatured}
          />
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Show on Homepage
          </label>
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label className="text-sm">Price</label>
          <Input
            className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 focus-visible:ring-0 focus-visible:border-none"
            type="number"
            name="price"
            onChange={handlechange}
          />
        </div>
        <div className="w-1/4 flex flex-col gap-2">
          <label className="text-sm">Category</label>

          {/* <select
            name="catSlug"
            onChange={handlechange}
            value={inputs.catSlug}
            className="outline-none"
          >
            <option value="pizzas">pizzas</option>
            <option value="burgers">burgers</option>
            <option value="pastas">pastas</option>
          </select> */}

          <Select
            name="catSlug"
            // value={inputs.catSlug}
            onValueChange={(value: string) =>
              handlechange({
                target: { name: "catSlug", value },
              } as React.ChangeEvent<HTMLSelectElement>)
            }
            required
          >
            <SelectTrigger className="w-[180px] rounded-none focus:ring-0 focus:border-none">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pizzas">pizzas</SelectItem>
              <SelectItem value="burgers">burgers</SelectItem>
              <SelectItem value="pastas">pastas</SelectItem>
            </SelectContent>
          </Select>

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
          <div className="flex w-1/2 md:w-full items-center flex-col md:flex-row">
            {/* <select
              name="title"
              onChange={handleOptions}
              value={options.title}
              className="outline-none"
            >
              <option value="small">small</option>
              <option value="medium">medium</option>
              <option value="large">large</option>
            </select> */}

            <Select
              name="title"
              // value={options.title}
              onValueChange={(value: string) =>
                handleOptions({
                  target: { name: "title", value },
                } as React.ChangeEvent<HTMLSelectElement>)
              }
              required
            >
              <SelectTrigger className="md:w-[500px] rounded-none focus:ring-0 focus:border-none my-4 md:my-0">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">small</SelectItem>
                <SelectItem value="medium">medium</SelectItem>
                <SelectItem value="large">large</SelectItem>
              </SelectContent>
            </Select>

            {/* <input
              className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
              type="text"
              placeholder="Title"
              name="title"
             onChange={handleOptions}
            /> */}
            <div className="flex w-full">
              <Input
                className="md:ml-4 ring-1 ring-red-200 p-4 rounded-none placeholder:text-red-200 focus-visible:ring-0 focus-visible:border-none"
                type="number"
                placeholder="Additional Price"
                name="additionalPrice"
                onChange={handleOptions}
                required
              />
              <div
                className="bg-red-500 flex justify-center items-center text-center p-[2px] md:p-[9px] max-sm:text-[11px] md:text-base text-white w-full rounded-none cursor-pointer"
                onClick={() =>
                  setButtonOptionShow((prev) => [...prev, options])
                }
              >
                Add Option
              </div>
            </div>
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
        <Button
          disabled={isSubmitting}
          className="bg-red-500 p-4 text-white w-48 rounded-md relative h-14 flex items-center justify-center"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddNewProducts;
