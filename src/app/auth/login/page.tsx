'use client';

import React from 'react'
import { useForm } from 'react-hook-form';

function LoginPage() {
    const { register, handleSubmit } = useForm();
    const onSubmit = handleSubmit((data) =>{
        console.log(data);        
    })
    return (
        <div className="flex flex-col border bg-slate-400 p-4 m-4 rounded-lg w-64">
            Login con next Auth e postgre
            <form onSubmit={onSubmit} className="flex flex-col p-4 m-2">
              <div className="flex flex-col p-4 m-2">
                <label>User:</label>
                <input className="rounded m-2 p-1 text-black" type="email"
                {...(register('email', { required: true }))}
                />
              </div>
              <div className="flex flex-col p-4 m-2">
                <label>Pass:</label>
                <input className="rounded m-2 p-1 text-black" type="password"
                {...(register('password', { required: true }))}
                />
              </div>
              <button type="submit" className="bg-blue-700 rounded p-2">Enter</button>
            </form>
          </div>
      )
}

export default LoginPage