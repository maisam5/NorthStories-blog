// fetching posts from prisma orm to display on ui


import prisma from "@/lib/prisma";
import { NextResponse } from "next/server"

export async function GET(){
    try {
        const posts = await prisma.post.findMany({
            orderBy:{
                createdAt:"desc"
            },
            select:{
                id:true,
                title:true,
                description:true,
                slug:true,
                coverImageUrl:true,
                createdAt:true,
            },
            take:3 //only six post will show in recent posts
        });
        return NextResponse.json({posts},{status:200})
    } catch (error) {
        console.error("failed to fetch post", error);

        return NextResponse.json(
        {error:"failed to fetch recent post"},
        {status:500}
    );
    }
    
}