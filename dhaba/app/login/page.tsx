"use client";
import { Loading } from "@/components/Loading";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const { data, status } = useSession();
  // console.log("data:" +data);
  // console.log("status:" +status);

  if (status === "loading") {
    return <Loading />;
  } else if (status === "authenticated") {
    router.push("/");
  }

  return (
    <div className="p-4 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex justify-center items-center">
      {/* BOX */}
      <div className="h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[70%] md:w-full lg:w-[60%] 2xl:w-1/2">
        {/* Image Container */}
        <div className="relative h-1/3 w-full md:h-full md:w-1/2">
          <Image
            src="/login-bg.jpg"
            alt="login-background"
            className="object-cover"
            fill
          />
        </div>
        {/* Form Container */}
        <div className="p-10 flex flex-col gap-8 -mt-6 md:gap-4 md:w-1/2">
          <h1 className="font-bold text-xl xl:text-3xl">Welcome</h1>
          <p>
            Login into your account or create a new one using social buttons
            below
          </p>
          <button
            className="flex gap-4 p-4 ring-1 ring-orange-100 rounded-md"
            onClick={() => signIn("google")}
          >
            <Image
              src="/google.png"
              alt="google"
              width={20}
              height={20}
              className="object-contain"
            />
            <span>Sign in with Google</span>
          </button>
          {/* <button
            className="flex gap-4 p-4 ring-1 ring-orange-100 rounded-md"
            onClick={() => signIn("facebook")}
          >
            <Image
              src="/facebook.png"
              alt="facebook"
              width={20}
              height={20}
              className="object-contain"
            />
            <span>Sign in with Facebook</span>
          </button>
          <button>Sign in with facebook</button> */}
          <p className="text-sm text-center text-red-500">
            Have a problem?
            <Link href="/" className="underline">
              Contact Us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
