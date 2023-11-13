"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { login, signout, isUserValid } from "./(hooks)/pocketbase";
import { useState } from "react";

export default function Auth() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (loading) return <p>Loading ...</p>;

  if (isUserValid())
    return (
      <>
        <div>Logged in: {isUserValid() && "Yeeee"}</div>
        <button
          onClick={() => {
            signout();
            router.refresh();
          }}
        >
          Logout
        </button>
      </>
    );
  return (
    <>
      <form
        onSubmit={handleSubmit((e) => {
          setLoading(true);
          login(e.email, e.password);
          setLoading(false);
        })}
      >
        <input type="text" placeholder="email" {...register("email")} />
        <input
          type="password"
          placeholder="password"
          {...register("password")}
        />
        <button type="submit">Log in </button>
      </form>
    </>
  );
}
