import { useRouter } from 'next/router';
import React from 'react';

export function Header(){
    const router = useRouter();
    return (
        <div className='w-full flex justify-between align-middle'>
            {/* Home Button */}
            <div>
                <img src="dnd_logo.svg" alt="dnd logo" />
            </div>
        </div>
    );
}