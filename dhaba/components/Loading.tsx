import Bean from "@/public/Bean.svg";
import Image from "next/image";
export const Loading = () => {
  return (
    <div className="flex my-36 justify-center items-center">
      <Image src={Bean} alt="loading" width={150} height={150} />
    </div>
  );
};
