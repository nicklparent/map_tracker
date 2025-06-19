'use client';
import { signJwt, verifyJwt } from "@/lib/jwt";
import { User } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  useEffect(() => {
    const getUser = async () =>  {
      try {
        const res = await fetch("api/auth/login", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          router.push("/login");
        }
      } catch (err) {

      }
    }

    getUser();
  }, []);
  return (
    <div>
      Hello World
    </div>
  );
}
