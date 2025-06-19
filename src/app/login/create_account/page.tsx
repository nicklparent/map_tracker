import React, { FormEvent, useState } from 'react';

export default function createAccount(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    
    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const res = await fetch("/api/auth/register", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        });

        const data = await res.json();
        if (!res.ok){
            throw new Error(data.error);
        }

            
    }
    return (
        <div>
            <form onSubmit={handleSignUp}>

            </form>
        </div>
    );
}