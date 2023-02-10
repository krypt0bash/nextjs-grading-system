import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Logo from "@public/logo.svg";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

const LoginForm = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const validationSchema = z.object({
    email: z.string().email().min(5, { message: "Invalid email address." }),
    password: z
      .string()
      .min(5, { message: "Password must be at least 6 characters." }),
  });

  type ValidationSchema = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });
  const onSubmit: SubmitHandler<ValidationSchema> = async (logins) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: logins.email,
      password: logins.password,
    });
    if (!error) {
      router.push("/dashboard");
      toast.success("Successfully logged in.");
    } else {
      toast.error("Wrong credentials. Please try again.");
    }
  };
  return (
    <div className="h-screen w-screen flex">
      <div className="flex flex-col w-auto md:w-1/2 md:m-6 mx-auto items-center justify-center">
        <form
          className="flex flex-col mx-auto w-96 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div
            className="flex items-center md:mb-6 cursor-pointer"
            onClick={() => {
              router.push("/");
            }}
          >
            <Logo className="w-8 mr-2" />
            <h1 className="font-semibold hidden md:block">eCatalog</h1>
          </div>

          <div className="mb-8">
            <h1 className="font-semibold text-3xl">Welcome back</h1>
            <p className="text-gray-400 font-light text-sm">
              Welcome back! Please enter your details.
            </p>
          </div>

          <input
            type="text"
            className="bg-gray-100 rounded-md outline-none py-2 px-4 w-full my-1"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          <input
            type="password"
            className="bg-gray-100 rounded-md outline-none py-2 px-4 w-full my-1"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          <Link
            className="text-sm underline text-gray-600 ml-auto mb-10"
            href="/login/forgot"
          >
            Forgot password
          </Link>
          <input
            className="w-full cursor-pointer bg-gray-900 text-white font-semibold rounded-md px-10 py-2"
            type="submit"
            value="Log in"
          />
        </form>
        <div className="flex flex-col text-sm mt-4 items-center text-red-500">
          {errors.email && <span>{errors.email?.message}</span>}
          {errors.password && <span>{errors.password?.message}</span>}
        </div>
      </div>
      <div className="hidden md:block bg-cover grayscale bg-login-image w-1/2" />
    </div>
  );
};

export default LoginForm;
