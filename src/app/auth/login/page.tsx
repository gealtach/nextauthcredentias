'use client';

import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';

function Login() {
    const navigator = useRouter();
     const { register, handleSubmit } = useForm();
     const onSubmit = handleSubmit(async (data) =>{
        console.log(data, 'estoy aqui');
        const res = await signIn('credentials',{
            email: data.email,
            password: data.password,
            redirect: false
        })     
        console.log(res,'vergas');
        if(res?.ok){
            navigator.push('/dashboard')
        }
        
    })
  return (
    <div className="flex flex-col border bg-slate-400 p-4 m-4 rounded-lg w-64">
            Login con next Auth e postgre
            <form onSubmit={onSubmit} className="flex flex-col p-4 m-2">
              <div className="flex flex-col p-4 m-2">
                <label>User:</label>
                <input className="rounded m-2 p-1 text-black" type="email"
                {...(register('email', { required: true }))}
                placeholder='example@expal.com'
                />
              </div>
              <div className="flex flex-col p-4 m-2">
                <label>Pass:</label>
                <input className="rounded m-2 p-1 text-black" type="password"
                {...(register('password', { required: true }))}
                placeholder='********'
                />
              </div>
              <button type="submit" className="bg-blue-700 rounded p-2">Enter</button>
            </form>
          </div>
  )
}

export default Login