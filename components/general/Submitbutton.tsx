"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export function Submitbutton(){
    const {pending}=useFormStatus();

    return <Button className="w-fit" type="submit" disabled={pending}>{pending?"submitting":"submit"}</Button>;
    
}