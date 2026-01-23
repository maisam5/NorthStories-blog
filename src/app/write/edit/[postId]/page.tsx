'use client'
import Editpageskeleton from "@/components/skletons/Editpageskeleton"
import axios from "axios"
import dynamic from "next/dynamic"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"

import { useEffect, useMemo, useRef, useState } from "react"
import toast from "react-hot-toast"

const JuditEditor = dynamic(() => import("jodit-react"),{
    ssr:false
})

export default function EditPage() {
    const editor = useRef(null)
    const [content, setContent] = useState('')
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [coverImage, setCoverImage] = useState<null | File>(null);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [previewImage, setPreviewImage] = useState("");
    const [loading,setLoading] = useState(true)
    const {postId} = useParams();
    const router = useRouter();


    const config = useMemo(()=>({
      
      placeholder: "start writing your article",
      theme: "dark",
      style:{
        background: "#121212",
        color: "#d1d5dc"
      }
    }),
    []
)

const handleSubmit = async(e:React.FormEvent)=>{
  e.preventDefault();
  try {
      if(!title  || !description || !content ){
              toast("title, description and content  are required!",{
      style:{
        color:"white",
        background:"#1e3a8a"
      },
     });
     return; 
     
    
    }
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("content", content);
    if(coverImage){
       formData.append("coverImage", coverImage);

    }

   const response =  await axios.patch(`/api/posts/${postId}`, formData,{
      headers:{
        "Content-Type":"multipart/form-data"
      }
    });
    

   toast("Article Updated successfully",{
      style:{
        color:"white",
        background:"#1e3a8a"
      }
     })
     const slug = response.data.slug
     router.replace(`/articles/${slug}`)

  } catch (error) {
    if(axios.isAxiosError(error)){
     toast(error.response?.data.error,{
      style:{
        color:"white",
        background:"#1e3a8a"
      }
     })
    }
   
  }
   finally{
      setIsSubmitting(false);
    }
}
useEffect(()=>{
  const fetchPost = async ()=> {
    try {
      const {data} = await axios.get(`/api/posts/${postId}`);
      setTitle(data.title);
      setDescription(data.description);
      setContent(data.content);
      setPreviewImage(data.coverImageUrl);
    } catch (error) {
      if(axios.isAxiosError(error)){
        console.error("AXIOS_ERROR:",error.response?.data);
        alert(error.response?.data?.error || "failed to load post");
      } else{
        console.error("UNKNOWN_ERROR", error);
        alert("unexpected error occured");
      }
    }
    finally{
      setLoading(false);
    }
  }
  if(postId){
    fetchPost();
  }
},[postId])
if(loading) return <Editpageskeleton />
  return (
    <section className='max-w-3xl mx-auto py-20 px-6'>
      {/*title*/}
      <h1 className='text-white mb-10 text-3xl font-semibold'>Edit your article</h1>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder='Title' className='w-full bg-transparent text-3xl font-semibold text-white placeholder-gray-500 outline-none mb-6' />

        <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='write here' className='w-full bg-secondary-background placeholder-gray-500 text-gray-200 rounded-xl p-4 mb-8 outline-none resize-none border border-white/10 focus:border-indigo-500/50'>
        </textarea>
        {/*image */}
        <div className='mb-10'>
         <label  className='text-gray-300 mb-2 block'>
           Cover Image
         </label>
         <input onChange={(e)=>setCoverImage(e.target.files?.[0] || null)} type="file" accept='image/*' className='w-full block text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-primary file:text-white hover:file:bg-indigo-500' />
        </div>
        {/*img preview*/}
        
        <div className="my-8">
         <Image src={previewImage} alt="image-preview" width={300} height={300} className="object-cover" />
        </div>

        {/*text-editor*/}
        <div className="rounded-2xl overflow-hidden border border-white/10 mb-8 ">
            <JuditEditor ref={editor} value={content} config={config}
            onChange={(newContent)=> setContent(newContent)} />
        </div>
        <div className="flex justify-end">
          <button className="px-8 py-2 bg-primary cursor-pointer rounded-xl text-white transition-colors  font-semibold hover:bg-indigo-500">
            {isSubmitting ? "Updating...": "Update"}
          </button>
        </div>
      </form>
    </section>
  )
}
