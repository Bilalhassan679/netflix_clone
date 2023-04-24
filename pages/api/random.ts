// import { NextApiRequest,NextApiResponse } from "next";

// import prismadb from '@/libs/prismadb';
// import serverAuth from "@/libs/serverAuth";

// export default async function handler(req:NextApiRequest,res:NextApiResponse){
//     if(req.method !== 'GET'){
//         return res.status(405).end();
//     }
//     try{
//         await serverAuth(req);
//         const movieCount = await prismadb.movie.count();
//         const randomIndex=Math.floor(Math.random() * movieCount);

//         const randomMovies=await prismadb.movie.findMany({
//             take:1,
//             skip:randomIndex
//         })
//         return res.status(200).json(randomMovies[0]);
//     }
//     catch(e){
//         console.log(e);
//         return res.status(400).end();
//     }
// }

import { NextApiRequest, NextApiResponse } from "next";

import prismadb from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    await serverAuth(req, res);

    const moviesCount = await prisma.movie?.count();
    const randomIndex = Math.floor(Math.random() * moviesCount);

    const randomMovies = await prisma.movie?.findMany({
      take: 1,
      skip: randomIndex
    });

    return res.status(200).json(randomMovies[0]);
  } catch (error) {
    console.log(error);

    return res.status(500).end();
  }
}