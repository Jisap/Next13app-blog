'use client'

import Input from '@/components/input/Input'
import { signIn } from 'next-auth/react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'


interface InitialStateProps {
    email: string,
    password: string
}

const initialState: InitialStateProps = {
    email: '',
    password: ''
}

const page = () => {

    const router = useRouter()
    const [state, setstate] = useState(initialState);

    const handleChange = (e: any) => {
        setstate({ ...state, [e.target.name]: e.target.value })
    }

    const onSubmit = (event: FormEvent) => {

        event.preventDefault()

        signIn('credentials', { // Método de next-Auth que busca las credenciales en [...nextauth]
            ...state,
            redirect: false,
        })
            .then((callback) => {

                if (callback?.ok) {
                    router.refresh()
                }

                if (callback?.error) {
                    throw new Error('Wrong Credentials')
                }
            })
        router.push('/')
    }

    return (
        <form onSubmit={onSubmit} className='text-center'>
            <div className='flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2'>
                
                <Input
                    placeholder='Email'
                    id='email'
                    type='email'
                    name='email'
                    onChange={handleChange}
                    value={state.email}
                />
                <Input
                    placeholder='Password'
                    id='password'
                    type='password'
                    name='password'
                    onChange={handleChange}
                    value={state.password}
                />
                <button type='submit'>Submit</button>
            </div>

            <div>
                <div>Haven't got an account ? <Link href='/register'>Sign up</Link></div>
            </div>
        </form>
    )
}

export default page