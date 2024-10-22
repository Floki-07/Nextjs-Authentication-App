import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
   <div className="flex justify-center h-[50vh] items-center text-4xl">
    <Link href="/login">Login</Link>
   </div>
  );
}
