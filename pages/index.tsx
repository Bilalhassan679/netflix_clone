import { NextPageContext } from "next";
import { getSession,signOut } from "next-auth/react";


import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useMovieList from "@/hooks/useMovieList";
import useFavourites from "@/hooks/useFavorites";
import InfoModal from "@/components/InfoModal";
import useInfoModalStore from "@/hooks/useInfoModalStore";

export async function getServerSideProps(context:NextPageContext){

  const session=await getSession(context);
  if(!session){
    return {
      redirect:{
        destination:'/auth',
        permanent:false,
      }
    }
  }

  return {
    props:{}
  }

}


export default function Home() {
  const { data:movies=[]} =useMovieList();
  const { data:favourites=[]} = useFavourites();
  const {isOpen,closeModal}=useInfoModalStore();
  return (
    <>
    <InfoModal visible={isOpen} onClose={closeModal}/>
      <Navbar/>
      <Billboard/>
      <div className="pb-40">
      <MovieList title="Trending Now" data={movies}/> 
      <MovieList title="My List" data={favourites}/>
      </div>
    </>
  )
}