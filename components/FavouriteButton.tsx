import useCurrentUser from '@/hooks/useCurrentUser';
import useFavourites from '@/hooks/useFavorites';
import axios from 'axios';
import React from 'react';
import { AiOutlinePlus,AiOutlineCheck } from 'react-icons/ai';

interface FavoriteButtonProps {
    movieId:string;
}


const FavoriteButton:React.FC<FavoriteButtonProps> = ({movieId}) =>{
    const {mutate:mutateFavourites} =useFavourites();
    const {data:currentUser,mutate}=useCurrentUser();

    const isFavorite =React.useMemo(() => {
        const list=currentUser?.favoriteIds || [];
        return list.includes(movieId)
    }, [currentUser,movieId])

    const Icon =isFavorite?AiOutlineCheck:AiOutlinePlus

    const toggleFavourites = React.useCallback(async () => {
        let response;
        if(isFavorite){
            console.log('a')

            response=await axios.delete('/api/favorite',{data:{movieId}})
        }
        else{
            console.log('b')
            response=await axios.post('/api/favorite',{movieId});
        }
        const updatedFavouriteIds=response?.data?.favoriteIds;
        mutate({
            ...currentUser,
            favoriteIds:updatedFavouriteIds
        });
        mutateFavourites();
      },
      [movieId,isFavorite,currentUser,mutate,mutateFavourites],
    )
    
    return (
        <div
        onClick={toggleFavourites}
        className='
        cursor-pointer
        group/item
        w-6
        h-6
        lg:w-10
        lg:h-10
        border-white
        border-2
        rounded-full
        items-center
        justify-center
        flex
        transition
        hover:border-neutural-300
        '
        >
            <Icon className='text-white' size={25}/>
        </div>
    )
}
export default FavoriteButton;