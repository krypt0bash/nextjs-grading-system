import Navbar from "@components/Navbar";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import HeroSvg from "@public/hero-pattern.svg";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="w-4/5 my-32 mx-auto flex">
        <div className="flex flex-col w-full md:w-1/2">
          <h1 className="text-3xl font-semibold mb-4">
            Bun venit pe eCatalog!
          </h1>
          <p className="text-sm text-gray-600">
            Organizati si accesati notele dumneavoastra cu usurinta prin
            intermediul interfetei prietenoase si a sistemului de cautare
            puternic. Puteti colabora si partaja cu colegii sau prietenii pe
            notele dumneavoastra. Incepeti acum sa utilizati catalogul nostru!
          </p>
          <div className="flex">
            <Link
              href="/"
              className="mt-4 px-5 py-2.5 bg-gray-900 text-white font-semibold rounded-md"
            >
              Learn more
            </Link>
          </div>
        </div>
        <HeroSvg className="w-80 ml-auto hidden md:block" />
      </div>
    </div>
  );
}
