import React from 'react'
 
 export function Badge({ variant = "default", className, ...props }) {
   const variantClasses = {
     default: "bg-primary text-primary-foreground hover:bg-primary/80",
     secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
     success: "bg-green-100 text-green-800 hover:bg-green-200",
     warning: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
   }
 
   return (
     <div
       className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variantClasses[variant]} ${className}`}
       {...props}
     />
   )
 }