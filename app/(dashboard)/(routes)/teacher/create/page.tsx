"use client"

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Form,
    FormControl,
    FormField,
    FormDescription,
    FormLabel,
    FormMessage,
    FormItem,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
const formSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
})

const CreatePage = () => {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });

    const { isSubmitting, isValid} = form.formState;

    const onSubmit = async(values: z.infer<typeof formSchema>) => {
       try{
        const res=await axios.post("/api/courses", values)
        router.push(`/teacher/courses/${res.data[0].id}`)
        toast.success("Course created")
       }catch{
        toast.error("Something went wrong")
       }
    }

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
        <div>
            <h1 className="text-2xl font-semibold">
                Name your Course
            </h1>
            <p className="text-sm text-slate-600">
                What would you like to name your course? Don&apos;t worry, you can change it later.
            </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 mt-8"
                >
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Course Title</FormLabel>
                                <FormControl>
                                    <Input 
                                    disabled={isSubmitting}
                                    placeholder="e.g. 'Advanced web devlopment'" 
                                    {...field} />
                                </FormControl>
                                <FormDescription>
                                    The title of your course.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center gap-x-2">
                        <Link href="/">
                            <Button
                                type="button"
                                variant="ghost"
                            >
                                 Cancel
                            </Button>
                        </Link>
                        <Button type="submit" disabled={!isValid || isSubmitting} variant={"bluebutton"}>
                            Continue
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    </div>
  )
}

export default CreatePage