'use client';
import React, { useState } from 'react';
import '@/ui/css/login.css';

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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