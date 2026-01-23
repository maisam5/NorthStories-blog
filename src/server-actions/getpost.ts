"use server"

import prisma from "@/lib/prisma";

export async function getPostBySlug(slug:string){
    if(!slug){
        throw new Error("slug is required");
    }
    const post = await prisma.post.findUnique({
        where:{slug},
        select:{
            id:true,
            description:true,
            title:true,
            content:true,
            slug:true,
            coverImageUrl:true,
            createdAt:true,
            author:{
                select:{
                    name:true,
                    image:true,
                    id:true,
                }
            }
        }
    });
    if(!post){
        return null;
    }
    return post;
}