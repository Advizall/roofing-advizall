
import { type VariantProps } from "class-variance-authority"
import { type ClassValue } from "clsx"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { sheetVariants } from "@/components/ui/sheet"

export type SidebarContext = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

export interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}
