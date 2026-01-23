import { useDeletePost } from "@/custom-hooks/usePost";

import toast from "react-hot-toast";
import { LuTrash } from "react-icons/lu";


export default function Deletepost({postId}:{postId:string}) {
    const {mutate:deletePostMutation, isPending} = useDeletePost();

    const handleDelete =()=>{
        const confirmed = confirm("confirm to delete post");
        if(confirmed){
            deletePostMutation(postId,{
                onSuccess:()=>{
                    toast("article deleted successfully",{
                        style:{
                            color:"white",
                            background:"#1e3a8a"
                        }
                    })
                }
            })
        }
    }
  return (
    <div>
       <button onClick={handleDelete} disabled={isPending} className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-400 border border-red-400/20 hover:border-red-400/40 hover:bg-red-400/10 transition cursor-pointer disabled:cursor-not-allowed rounded-xl">
            <LuTrash />
            Delete
          </button>
    </div>
  )
}
