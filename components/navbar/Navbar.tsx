'use client'

import { SafeUser } from "@/types/type"
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface UserMenuProps {
    currentUser: SafeUser | null
}

const Navbar = ({ currentUser }: UserMenuProps) => {
  return (
    <header>
        <nav className='bg-gray-200 flex justify-between px-4 py-6 shadow-xl'>
            <div>{currentUser?.name}</div>

            <div className='flex gap-4'>
                <Link href='/'>Home</Link>
                <Link href='/create'>Create</Link>
                  {currentUser 
                    ? 
                        <button onClick={() => signOut()}>Sign out</button> 
                    :   <Link href='/register'>Register</Link>
                  }
            </div>
        </nav>
    </header>
  )
}

export default Navbar