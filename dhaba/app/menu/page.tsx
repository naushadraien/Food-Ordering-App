import Link from "next/link";
import { MenuType } from "@/types/type";
import { Button } from "@/components/ui/button";

const getData = async () => {
  try {
    const res = await fetch(
      `${
        process.env.Next_PUBLIC_URL && process.env.Next_PUBLIC_URL
      }/api/categories`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    return await res.json();
  } catch (error) {
    console.log(error);
  }
};
const MenuPage = async () => {
  const menu: MenuType = await getData();
  // console.log("menu", menu);

  return (
    <div className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-calc-[100vh-9rem] flex flex-col md:flex-row items-center">
      {menu && menu.map((category) => (
        <Link
          href={`/menu/${category.slug}`}
          key={category.id}
          style={{ backgroundImage: `url(${category.img})` }}
          className="w-full h-1/3 bg-cover p-8 md:h-1/2"
        >
          <div className={`text-${category.color} dark:text-black w-1/2`}>
            <h1 className="uppercase font-bold text-3xl">{category.title}</h1>
            <p className="text-sm my-8">{category.description}</p>
            <Button
              className={`hidden 2xl:block bg-${category.color} text-${
                category.color === "black" ? "white" : "red-500"
              } py-2 px-4 rounded-md`}
            >
              Explore Now!
            </Button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPage;
