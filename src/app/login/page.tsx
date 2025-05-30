import React, { useState } from 'react';

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className=''>
            <div className='flex justify-center'>
                <form className='flex justify-center'>
                    <div className='input-field'>
                        <label htmlFor="email-in">Example@email.com</label>
                        <input
                            id='email-in' 
                            type="text" 
                            placeholder='Email' 
                            className='peer w-full p-3 border-2 border-gray-800 rounded-md'
                        />
                    </div>
                    <div className='input-field'>
                        <label htmlFor="password-in">Enter your password</label>
                        <input type="text" name="password-in" id="password-in" placeholder='Password' />
                    </div>
                    <button className='rounded border-2 border-red-950'>Login</button>
                </form>
            </div>
        </div>
    );
}