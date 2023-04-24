import Input from "@/components/input";
import axios from "axios";
import { useCallback, useState } from "react";
import {getSession, signIn} from 'next-auth/react';

import {FcGoogle} from 'react-icons/fc'
import {FaGithub} from 'react-icons/fa';
import { NextPageContext } from "next";
import { useRouter } from "next/router";


export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);
  
    if (session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
    }
  
    return {
      props: {}
    }
  }
const Auth =()=>{
    const router =useRouter();
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const [variant,setVariant]=useState('login');
    

    const toggleVariant=useCallback(()=>
    {
        setVariant((currentVariant)=>currentVariant=='login'?'register':'login')
    },[]);

    const login=useCallback(async()=>{
        try{
            await signIn('credentials',{
                email,
                password,
                redirect:false,
                callbackUrl:'/'
            })
            router.push('/profiles');
        }
        catch(e){
            console.log(e);
        }
    },[email,password])

    const register =useCallback(async()=>{
        try{
            await axios.post('/api/register',{
                email,
                name,
                password
            });
            login();
        }
        catch(e){
            console.log(e)
        }
    },[email,name,password]);
    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-cover bg-fixed bg-center" >
            <div className="bg-black h-full w-full lg:bg-opacity-50">
            <nav className="px-12 p-5">
                <img src="/images/logo.png" alt="Logo" className="h-12"/>
            </nav>
            <div className="flex justify-center">
                <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                    <h2 className="text-white text-4xl mb-8 font-semibold">
                    {variant=='login'?"Sign in":'Register'}
                    </h2>
                    <div className="flex flex-col gap-4">
                        {variant == 'register' && (
                       <Input
                       label="UserName"
                       onChange={(val:any)=>setName(val.target.value)}
                       value={name}
                       id='name'
                       /> 
                       )}
                       <Input
                       label="Email"
                       onChange={(val:any)=>setEmail(val.target.value)}
                       value={email}
                       id='email'
                       type="email" 
                       /> 
                       <Input
                       label="Password"
                       onChange={(val:any)=>setPassword(val.target.value)}
                       value={password}
                       id='password'
                       /> 
                    </div>

                       <button onClick={variant=='login'? login:register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"> 
                        {variant=="login"? 'Login':'Sign up'}
                       </button>
                       <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                            <div
                             onClick={()=>signIn('google',{callbackUrl:'/profiles'})}
                            className="
                            w-10
                            h-10
                            bg-white
                            rounded-full
                            flex
                            items-center
                            justify-center
                            cursor-pointer
                            hover:opacity-80
                            transition
                            "
                            >
                            <FcGoogle size={30} />    
                            </div>
                            <div
                            onClick={()=>signIn('github',{callbackUrl:'/profiles'})}
                            className="
                            w-10
                            h-10
                            bg-white
                            rounded-full
                            flex
                            items-center
                            justify-center
                            cursor-pointer
                            hover:opacity-80
                            transition
                            "
                            >
                                <FaGithub size={30}/>
                            </div>
                       </div>
                        <p className="text-neutral-500 mt-12">
                            {variant=='login'? 'First time using Netflix?':'Already have an account?'}    
                            <span onClick={toggleVariant}  className="text-white mt-1 hover:underlined cursor-pointer">
                                {variant == 'login'?'Create an account':'Login'}
                            </span>
                        </p>
                </div>
            </div>
            </div>    
        </div>
    )
}

export default Auth;