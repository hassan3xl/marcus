import RegisterForm from "@/components/auth/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Marcus Store",
  description: "Create an account to get started with Marcus Store.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <RegisterForm />
    </div>
  );
}
