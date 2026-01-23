'use client'
import { useModalStore } from "@/store/modalstore";
import Modal from "./Modal";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";


export default function SignInModal() {
    const {isSignInOpen, closeSignIn} = useModalStore();

    const signInWithGoogle = async()=>{
      await authClient.signIn.social({
        provider:"google"
      });
    }
     const signInWithGithub = async()=>{
      await authClient.signIn.social({
        provider:"github"
      });
    }
  return (
    <Modal onClose={closeSignIn} isOpen={isSignInOpen}>
       <h2 className="text-gray-100 text-xl mb-2 font-semibold">Sign in to NorthStories</h2>
       <p className="text-sm text-gray-400 mb-8 ">
        Continue with one of providers below
       </p>
       <div className="space-y-4">
         {/*google login*/}
         <button onClick={signInWithGoogle} className="w-full flex items-center justify-center gap-3 py-3 rounded-full cursor-pointer bg-white text-black font-medium hover:bg-gray-200 transition">
            <FaGoogle />
         continue with Google
         </button>
         <button onClick={signInWithGithub} className="w-full flex items-center justify-center gap-3 py-3 rounded-full cursor-pointer bg-hover text-white font-medium border border-white/10 hover:bg-[#202020]">
            <FaGithub className="text-xl" />
            continue with Github
         </button>
       </div>
       <p className="text-xs text-gray-400 mt-8 text-center">By continuing You agree to our terms & privacy policy</p>
    </Modal>
  )
}
