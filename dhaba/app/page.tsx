import Link from "next/link";

export default function Home() {
  return (
    <main className="text-center text-purple-700 font-bold">
      Hello World
      <Link href="/menu">Click Me</Link>
    </main>
  );
}
