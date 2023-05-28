'use client'

import React, { ChangeEvent, FormEvent, useMemo, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'

import { toast } from 'react-hot-toast'
import Input from '@/components/input/Input'
import ImageUpload from '@/components/ImageUpload'
// import UploadWidget from '@/components/ImageUpload'


interface InitalStateProps {
    name?: string,
    imageSrc: string
    description: string
}

const initialState: InitalStateProps = {
    name: '',
    imageSrc: '',
    description: ''
}

const page = () => {

  const [state, setState] = useState(initialState)
  const router = useRouter()


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {        // Establece los valores del state
        setState({ ...state, [event.target.name]: event.target.value }); 
  }

  const onSubmit = (event: FormEvent) => {  // Envía el state al backend
        event.preventDefault()


        axios.post('/api/blogs', state)
            .then(() => {
                router.push('/')
            })

            .catch((err) => {
                console.log(err)
                throw new Error(err)
                //toast.error('Went wring')
            })
        router.refresh()
    }


    const setCustomValue = (id: any, value: any) => {  // Establece el estado de una propiedad (imageSrc) con el valor recibido
        setState((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };

    const imageSrc = state.imageSrc;

  return (
    <form onSubmit={onSubmit} className='w-[600px] h-[700px] mx-auto py-12'>
        <div>
            <ImageUpload 
                value={state.imageSrc} 
                onChange={(value) => setCustomValue('imageSrc', value)} 
            />
        </div>

        <div className='flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2'>
            <Input 
                placeholder='Blog header' 
                id='name' type='text' 
                value={state.name} 
                name='name' 
                onChange={handleChange} 
            />
            <Input 
                big 
                placeholder='Blog content or description' 
                id='description' 
                type='text' 
                value={state.description} 
                name='description' 
                onChange={handleChange} 
            />
        <div>

        </div>
            <button type='submit'>Submit</button>
        </div>
    </form>
  )
}

export default page