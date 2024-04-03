"use client";
import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  isChid?: boolean;
}

const LoginButton = ({
  children,
  mode = "redirect",
  isChid,
}: LoginButtonProps) => {
  const router = useRouter();
  const onClick = () => {
    router.push("auth/login");
  };
  if (mode === "modal") {
    return <span>&quot;TODO Implement modal&quot;</span>;
  }
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
export default LoginButton;
