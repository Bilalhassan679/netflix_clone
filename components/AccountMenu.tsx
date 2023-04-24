import React from 'react'
import { signOut } from 'next-auth/react';
import useCurrentUser from '@/hooks/useCurrentUser';
interface AccountMenuProps {
    visible?:boolean
}

const AccountMenu:React.FC<AccountMenuProps> =({visible})=>{
    const {data:user} = useCurrentUser();
    if(!visible) return null;
   
    return (
        <div className='bg-black w-56 absolute top-20 right-0 py-5 flex-col border-2 border-gray-800 flex'>
            <div className='flex flex-col gap-3'>
                <div className='px-3 group/item flex flex-row gap-3 items-center w-full'>
                    <img className='w-8 rounded-md'  src="/images/default-blue.png" alt="" />
                    <p className='text-white text-sm group-hover/item:underlined'>
                      {user?.name}
                    </p>
                </div>
                <hr className='bg-gray-600 border-0 h-px my-3' />
                <div className='text-white hover:text-gray-300 px-3 text-center transition' onClick={()=>signOut()}>
                    Sign out of Netflix
                </div>
            </div>
        </div>
    )
}

export default AccountMenu;