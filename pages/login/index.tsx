import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import LoginForm from "@components/LoginForm";

const Login = () => {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/dashboard");
  }, [user]);

  return <LoginForm />;
};

export default Login;
