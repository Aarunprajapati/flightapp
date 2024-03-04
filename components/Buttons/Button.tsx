import React from 'react';


type ButtonProps = {
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: 'primary' | 'success' | 'secondary';
  onClick?: (ev: Event) => void;
  className?: string;
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  variant = 'solid',
  size = 'md',
  colorScheme = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) => {

  const baseClasses = "w-full rounded-md font-semibold focus:outline-none disabled:cursor-not-allowed";

  const variantClasses = {
    solid: "bg-opacity-100",
    outline: "bg-transparent border-2",
    ghost: "bg-transparent text-black border-1",
  };


  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const colorSchemeClasses = {
    primary: "text-white bg-blue-500 border-blue-500",
    success: "text-white bg-green-500 border-green-500",
    secondary: "text-white bg-red-500 border-red-500 ",
  };


  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${colorSchemeClasses[colorScheme]} ${className}`;

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
