'use client';
import React, { useState } from 'react';
import '@/ui/css/login.css';
import { useRouter } from 'next/router';

export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();
    
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error);
            }
            
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", data.user);


            router.push("/");
        } catch (err) {
            setError(err instanceof Error ? err.message: "unknown Error has occured")
        } finally {
            setIsLoading(false);
        }
    }

    
    return (
        <div className='login'>
            <form className='flex justify-center *:m-2'>
                <div className='input-field'>
                    <label htmlFor="email-in" className=''>Example@email.com</label>
                    <input
                        id='email-in' 
                        type="text" 
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required                    />
                </div>
                <div className='input-field'>
                    <label htmlFor="password-in">Enter your password</label>
                    <input 
                        type="text"
                        name="password-in" 
                        id="password-in" 
                    />
                </div>
                <button className='rounded border-2 border-red-950 '>Login</button>
            </form>
        </div>
        );
}