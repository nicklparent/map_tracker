'use client';
import { signJwt, verifyJwt } from "@/lib/jwt";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () =>  {
      try {
        const res = await fetch("api/auth/login", {

        })
      } catch (err) {

      }
    }
  }, []);
  return (
    <div>
      Hello World
    </div>
  );
}
