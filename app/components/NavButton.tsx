"use client";
import Link from 'next/link';
import React from 'react'

interface NavButtonProps {
    label: string;
    href: string;
    iconSrc?: string;
}

const NavButton: React.FC<NavButtonProps> = ({ label, href , iconSrc }) => {
    return (
        <Link href={href}>
            <button className="flex h-10 w-full items-center justify-center rounded-lg font-semibold hover:bg-gray-700">
            {iconSrc && (
                    <img 
                        src={iconSrc} 
                        alt={`${label} icon`} 
                        className="w-4 h-4 mr-2" // กำหนดขนาดและระยะห่างของไอคอน
                    />
                )}
                <span>{label}</span>
            </button>
        </Link>
    );
};
export default NavButton