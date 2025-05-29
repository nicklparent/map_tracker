import React from 'react';

export default function Login(){
    return (
        <div className=''>
            <div className='flex justify-center'>
                <form className=''>
                    <label htmlFor="email-in">Example@email.com</label>
                    <input id='email-in' type="text" placeholder='Email' />
                    <label htmlFor="password-in">Enter your password</label>
                    <input type="text" name="password-in" id="password-in" placeholder='Password' />
                    <button className='rounded border-2 border-red-950'>Login</button>
                </form>
            </div>
        </div>
    );
}