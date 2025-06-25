"use client";


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";


function page() {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });


  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "test@gmail.com",
    },
    resolver: zodResolver(schema),
  });


  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      throw new Error();
      console.log(data);
    } catch (error) {
      setError("email", {
        message: "this email is already taken",
      });
    }
  };
  return (
    <div className="p-20">
      <form
        className="flex justify-center flex-col space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="bg-[#292929] p-6 rounded-xl"
          {...register("email")}
          type="text"
          placeholder="Email"
        />
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}
        <input
          className="bg-[#292929] p-6 rounded-xl"
          {...register("password")}
          type="password"
          placeholder="Password"
        />


        {errors.password && (
          <div className="text-red-500">{errors.password.message}</div>
        )}
        <button
          disabled={isSubmitting}
          className="cursor-pointer bg-[#DAAF60] p-5 text-[#200100] rounded-xl"
          type="submit"
        >
          {isSubmitting ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}


export default page;
