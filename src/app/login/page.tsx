'use client';
import React, { useState } from 'react';
import '@/ui/css/login.css';
import Loading from '../loading';
export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
   
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
        } catch (err) {
            setError(err instanceof Error ? err.message: "unknown Error has occured")
        } finally {
            setIsLoading(false);
        }
    }
   
    return (
        // not sure why but this only centers with css if you use tailwind it doesnt work 
        <div className='login'>
            <form
                className='flex flex-col gap-4 p-8 rounded shadow'
                style={{ minWidth: 320, maxWidth: 400, width: '100%' }}
                onSubmit={handleLogin}
            >
                <div className='font-semibold'>Email</div>
                <div className='input-field'>
                    <input  
                        id='email-in'
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder='Example@email.com'
                        required                    
                    />
                </div>
                <div className='font-semibold'>Password</div>
                <div className='input-field'>
                    <input
                        type='password'
                        name="password-in"
                        id="password-in"
                        placeholder='password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    className='rounded border-2 border-red-950'
                    type='submit'
                >
                    {isLoading ? <Loading /> : "Login"}
                </button>
                {error && <div className="text-red-600">{error}</div>}
            </form>
        </div>
        );
}