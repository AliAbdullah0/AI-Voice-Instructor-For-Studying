"use client";

import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import { loginUser, createUser } from "@/actions/user.actions";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (type: FormType) =>
  z.object({
    name: type === "sign-up" ? z.string().min(3, "Name must be at least 3 characters") : z.string().optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(3, "Password must be at least 3 characters"),
  });

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<ReturnType<typeof authFormSchema>>>({
    resolver: zodResolver(authFormSchema(type)),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<ReturnType<typeof authFormSchema>>) => {
    setLoading(true);
    try {
      if (type === "sign-up") {
        const formData = new FormData();
        formData.set("username", data.name ?? "");
        formData.set("email", data.email);
        formData.set("password", data.password);
        const result = await createUser(formData);

        if (!result.success) {
          toast.error("User Already Exists");
          return;
        }

        toast.success("Account created successfully. Please sign in.");
        router.push("/sign-in");
      } else {
        const formData = new FormData();
        formData.set("email", data.email);
        formData.set("password", data.password);
        const result = await loginUser(formData);

        if (!result.success) {
          toast.error("Error Creating User!");
          return;
        }

        toast.success("Signed in successfully.");
        router.push("/");
      }
    } catch (error) {
      console.error("Auth error:", error);
      toast.error(`There was an error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  const isSignIn = type === "sign-in";

  return (
    <div className="bg-dark flex min-h-screen items-center justify-center w-full px-4 sm:px-6">
      <div className="flex flex-col gap-6 mt-20 ms:mt-0 py-8 sm:py-10 md:py-14 px-4 sm:px-6 md:px-10 w-full max-w-md sm:max-w-lg bg-dark rounded-2xl">
        <div className="flex flex-row gap-2 justify-center items-center">
          <h2 className="text-[#62F6B5] text-2xl sm:text-3xl">
            Brain<span className="text-primary">waves</span>
          </h2>
        </div>
        <h3 className="text-center text-base sm:text-lg md:text-xl">
          Learn anything with Brainwaves
        </h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Name"
                        {...field}
                        disabled={loading}
                        className="text-sm sm:text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your email address"
                      type="email"
                      {...field}
                      disabled={loading}
                      className="text-sm sm:text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      {...field}
                      disabled={loading}
                      className="text-sm sm:text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-2 text-sm sm:text-base"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : isSignIn ? (
                "Sign In"
              ) : (
                "Create an Account"
              )}
            </Button>
          </form>
        </Form>

        <p className="text-center text-sm sm:text-base">
          {isSignIn ? "No account yet?" : "Have an account already?"}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1"
          >
            {!isSignIn ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
