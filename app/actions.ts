 "use server";

import { title } from "process";
import { prisma } from "./utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

 export async function handleSubmission(FormData:FormData){
    const{getUser}=getKindeServerSession();
    const user=await getUser();
    if(!user){
        return redirect("/api/auth/register");
    }

    const title=FormData.get('title')
    const content=FormData.get('content')
    const url=FormData.get('url')
    
    await prisma.blogPost.create({
            data:{
                title:title as string,
                content:content as string,
                imageUrl:url as string,
                authorId:user?.id as string,
                authorImage:user?.picture as string,
                authorName:user?.given_name as string,
            }
        });
        return redirect("/dashboard");
    }