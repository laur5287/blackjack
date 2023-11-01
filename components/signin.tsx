'use client'
import { signIn } from "next-auth/react"


import { DropdownMenuItem } from './ui/dropdown-menu'

export const SignIn = () => (
    <div
        className="text-green-500 font-medium text-lg cursor-pointer "
        onClick={() => signIn()}
    >
        <span className="mr-2 " >Sign In</span>

    </div>
)