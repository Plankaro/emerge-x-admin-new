"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent } from "../ui/card";
import { useRouter } from "next/navigation";
import { useSignInMutation } from "@/store/api/auth"; // Adjust this path if needed
import { toast } from "sonner";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const router = useRouter();

  const [signIn, { isLoading, isError, error }] = useSignInMutation();

  const handleLogin: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await signIn(data).unwrap();

      console.log("lkjlk", response);

      if (response?.user?.token && response?.user?._id) {
        console.log(response)

        const token = response.user.token
        const id = response.user._id
        localStorage.setItem("authToken", token);
        localStorage.setItem("userId", id);
        router.push("/");
        toast("Login successful!");
      } else {
        const errorMessage = response?.error || "Login failed.";
        toast(errorMessage);
      }
    } catch (err: unknown) {
      const errorMessage =
        (err as { message?: string })?.message ||
        "An error occurred. Please try again.";
      toast(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500">
      <Card className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <CardContent>
          <h1 className="text-2xl font-semibold text-center mb-6 text-gray-700">
            Login
          </h1>
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-sm text-gray-600">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
              {errors.email && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="text-sm text-gray-600">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                    message:
                      "Password must be at least 6 characters, include one uppercase letter, one lowercase letter, one number, and one special character.",
                  },
                })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
              {errors.password && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
