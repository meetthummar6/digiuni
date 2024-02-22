import {auth} from "@clerk/nextjs"
import { supabase } from "@/utils/supabaseClient"
import { redirect } from "next/navigation"
import { IconBadge } from "@/components/icon-badge"
import { LayoutDashboard } from "lucide-react"

const CourseIdPage = async ({
  params
}: {
  params: {
    courseId: string
  }
}) => {
  const {userId}= auth();
  if(!userId) return redirect('/');
  let { data: Course, error } = await supabase
    .from('Course')
    .select("*")
    .eq('id', params.courseId)
  if(!Course) return redirect('/');
  const course=Course[0];
  const requiedFields=[
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];
  const totalFields=requiedFields.length
  const completedFields=requiedFields.filter(Boolean).length;
  const completionText=`${completedFields}/${totalFields}`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">
            Course setup
          </h1>
          <span className="text-sm text-grayt">
            Complete all fields {completionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div className="flex items-center gap-x-2">
          <IconBadge icon={LayoutDashboard} />
          <h2 className="text-xl">
            Customize your course
          </h2>
        </div>
      </div>
    </div>
  )
}

export default CourseIdPage