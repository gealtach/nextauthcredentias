'use client';

import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';

function LoginPage() {
  const navigator = useRouter();
    const { register, handleSubmit } = useForm();
    const onSubmit = handleSubmit(async (data) =>{
        console.log(data, 'estoy aqui');       
        const res = await fetch('/api/auth/signup',{
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });
        const resJson = await res.json();
        if(res.ok) navigator.push('/auth/login')
        console.log(resJson, 'ahora aqui');
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
                <label>Name:</label>
                <input className="rounded m-2 p-1 text-black" type="text"
                {...(register('name', { required: true }))}
                placeholder='Jonh'
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

export default LoginPage