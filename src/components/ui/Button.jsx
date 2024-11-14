


export default function Button({ children, variant = "default", ...props }) {
    const baseStyles = "px-4 py-2 rounded-2xl text-white font-semibold";
    const variantStyles = {
      default: "bg-primary_hard hover:bg-primary_hard",
      ghost: "bg-transparent hover:bg-indigo-700",
    };
    
    return (
      <button 
        className={`${baseStyles} ${variantStyles[variant]}`} 
        {...props}
      >
        {children}
      </button>
    );
  }
  