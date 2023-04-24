// import { NextApiResponse,NextApiRequest } from "next";

// import prismadb from '@/libs/prismadb';
// import serverAuth from "@/libs/serverAuth";


// export default async function handler(req:NextApiRequest,res:NextApiResponse) {
//     if(req.method !== "GET"){
//         res.status(405).end();
//     }
    

//     try{
//         await serverAuth(req);
//         const movies=await prismadb.movie.findMany();

//         res.status(200).json(movies)
//     }
//     catch(e){
//         console.log(e);
//         res.status(400).end();
//     }

// }

import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    await serverAuth(req, res);

    const movies = await prismadb.movie.findMany();

    return res.status(200).json(movies);
  } catch (error) {
    console.log({ error })
    return res.status(500).end();
  }
}