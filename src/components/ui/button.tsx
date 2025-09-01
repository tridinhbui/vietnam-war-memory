import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-goldVN focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-redVN text-primary-foreground shadow-[0_8px_30px_rgba(200,16,46,.25)] hover:bg-redVN-700 hover:shadow-[0_12px_40px_rgba(200,16,46,.4)] hover:-translate-y-0.5 active:translate-y-0 border border-redVN-700/20",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border-2 border-goldVN bg-transparent text-goldVN shadow-[0_4px_20px_rgba(255,208,0,.15)] hover:bg-goldVN hover:text-accent-foreground hover:shadow-[0_8px_30px_rgba(255,208,0,.25)] hover:-translate-y-0.5 active:translate-y-0",
        secondary:
          "bg-surface text-secondary-foreground shadow-xs hover:bg-surface/80 border border-goldVN/20",
        ghost:
          "hover:bg-goldVN/10 hover:text-goldVN",
        link: "text-goldVN underline-offset-4 hover:underline hover:text-goldVN-600",
        gold:
          "bg-goldVN text-accent-foreground shadow-[0_8px_30px_rgba(255,208,0,.25)] hover:bg-goldVN-600 hover:shadow-[0_12px_40px_rgba(255,208,0,.4)] hover:-translate-y-0.5 active:translate-y-0 border border-goldVN-700/20",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
