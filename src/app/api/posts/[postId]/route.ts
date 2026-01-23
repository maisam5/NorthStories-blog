// rout to populate the fileds on edit post

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { CloudinaryUploadResult, deleteFromCloudinary, uploadToCloudinary } from "@/services/cloudinary";



import { headers } from "next/headers";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ postId: string }> },
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user.id) {
      return NextResponse.json({ error: "Unathorized" }, { status: 401 });
    }
    const { postId } = await params;
    if (!postId) {
      return NextResponse.json(
        { error: "valid postId is required" },
        { status: 400 },
      );
    }
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!post) {
      return NextResponse.json({ error: "post not found" }, { status: 404 });
    }
    if (post.authorId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("FETCH_POST_ERROR:", error);
    return NextResponse.json(
      { error: "failed to fetch post" },
      { status: 500 },
    );
  }
}

// function to save upadtes on ui after edit post
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ postId: string }> },
) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        if(!session?.user.id){
           return NextResponse.json(
            {error:"Unathorized"},
            {status:401}
           )
        }
        const {postId} = await params;
        const existingPost = await prisma.post.findUnique({
            where:{id:postId}
        })
        if(!existingPost){
            return NextResponse.json(
                {error:"post not found"},
                {status:401}
            )
        }
        if(existingPost.authorId !== session.user.id){
            return NextResponse.json(
                {error:"forbidden"},
                {status:403}
            )
        }
        const formData = await req.formData();
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const description = formData.get("description") as string;
        const coverImage = formData.get("coverImage") as File;

        let slug = existingPost.slug;
        if(title && title !== existingPost.title){
            const baseSlug = slugify(title,{
                lower:true,
                strict:true,
                trim:true
            });
            let uniqueSlug = baseSlug;
            const counter = 1;
            while(await prisma.post.findFirst({
                where:{
                    slug:uniqueSlug,
                    NOT:{id:postId}
                }
            })) {
                uniqueSlug = `${baseSlug}-${counter}`
            }

            slug = uniqueSlug;
        }
        let ImageData : CloudinaryUploadResult | null = null;
         if(coverImage){
            ImageData = await uploadToCloudinary(coverImage);
            if(ImageData && existingPost.coverImagePublicId){
                await deleteFromCloudinary(existingPost.coverImagePublicId)
            }

         }

     const updatedPost = await prisma.post.update({
        where:{id:postId},
        data:{
            title: title ?? existingPost.title,
            slug,
            content: content ?? existingPost.content,
            description: description ?? existingPost.description,
            ...(ImageData && {
                coverImageUrl:ImageData.secure_url,
                coverImagePublicId:ImageData.public_id
            })
        }
     })

     return NextResponse.json(updatedPost,{status:200})

    } catch (error) {
        console.error("UPDATE_POST_ERROR:", error)
        return NextResponse.json(
        {error:"failed to update"},
        {status:500}
        )
    }
}

// function to delete post 

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ postId: string }> },
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user.id) {
      return NextResponse.json({ error: "Unathorized" }, { status: 401 });
    }
    const { postId } = await params;

    const post = await prisma.post.findUnique({
      where:{id:postId},
    });
    if(!post){
      return NextResponse.json(
        {error:"post not found"},
        {status:404}
      )
    }

    if(post.coverImagePublicId){
      await deleteFromCloudinary(post.coverImagePublicId);
    }
    await prisma.post.delete({
        where:{id:postId}
    });
    return NextResponse.json(
      {message:"post deleted successfully"},
      {status:200}
    )
  } catch (error) {
    console.error("DELETE_POST_ERROR:", error)
    return NextResponse.json(
      {error:"falied to delete post"},
      {status:500}
    )
  }
}


