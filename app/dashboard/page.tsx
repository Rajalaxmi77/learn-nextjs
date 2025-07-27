// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
// import { redirect } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { prisma } from "../utils/db";
import { redirect } from "next/navigation";

async function getData(userId:string){
    await new Promise((resolve)=>setTimeout(resolve,3000));
    const data=await prisma.blogPost.findMany({
        where:{
            authorId:userId,
        },
        orderBy:{
            createdAt:'desc',
        },
    });
    return data;
}

export  default async function DashboardRoute(){
    // const{getUser}=getKindeServerSession()
    // const user=await getUser();

    // if(!user){
    //     return redirect("/api/auth/register");
    // }
    const { getUser } = getKindeServerSession();
const user = await getUser();

if (!user) {
  return redirect("/api/auth/register");
}

const data = await getData(user.id);


    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium">your blog articles</h2>
                <Link className={buttonVariants()} href="/dashboard/create">Create Post</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
            {data.map((item)=>(
                <div key={item.id}>
                    <h1>{item.title}</h1>
                </div>
            ))}
        </div>
    );
}