import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
// import { useRouter } from 'next/router';
import { useRouter } from 'next/router';
import useMovie from '@/hooks/useMovie';

const Watch =() =>{
    // const router =useRouter();
    const router = useRouter();
    const { movieId } = router.query;


    const { data } = useMovie(movieId as string);
    return (
        <div className='w-screen h-screen bg-black'>
           <nav className='fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70'>
            <ArrowLeftIcon onClick={()=>router.push('/')} className='w-4 md:w-10 text-white cursor-pointer hover:opacity-70 transition '/>
            <p className="text-white  text-1xl md:text-3xl font-bold">
                <span className='font-light'>Watching : </span>{data?.title}
            </p>
           </nav>
           <video
           autoPlay
           controls 
           className='w-full h-full'
           src={data?.videoUrl}></video>
        </div>
      )
}
export default Watch;