import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const { title } = await req.json();

        if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { data, error } = await supabase
            .from('Course')
            .insert([
                { title: title, userId: userId, categoryId:null },
            ])
            .select()

        if (error) console.log("Can't create course", error);
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.log("Can't create course", error);
        return NextResponse.json({ error: "Can't create course" }, { status: 500 });
    }
}