"use client"
import { LucideIcon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
interface SidebarItemProps{
    icon: LucideIcon;
    label: String;
    href: String;
}
const SidebarItem = (
    {
        icon:Icon,
        label,
        href
    }: SidebarItemProps
) => {
    const pathname=usePathname();
    const router=useRouter();

    const isActive=(pathname==="/" && href==="/")||(pathname===href)||pathname?.startsWith(`${href}/`);

    const onClick=()=>{
        router.push(`${href}`);
    }
  return (
    <button
        onClick={onClick}
        type="button"
        className={
            cn("flex items-center gap-x-2 text-blacker text-sm font-[500] pl-6 transition-all hover:text-graya hover:bg-grayc/15",
            isActive && "text-grayb bg-grayc/15 hover:bg-grayc/15"
            )
        }
    >
        <div className="flex items-center gap-x-2 py-4">
            <Icon
                size={22}
                className={cn("text-blacker",
                isActive && "text-grayb")}
            />
            {label}
        </div>
        <div 
            className={cn("ml-auto opacity-0 border-2 border-grayb h-full transition-all",
                isActive && "opacity-100")}
        />
    </button>
  )
}

export default SidebarItem