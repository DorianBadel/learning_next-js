"use client";

import PocketBase from "pocketbase";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const pb = new PocketBase("http://127.0.0.1:8090");

export default function Auth() {
  const [isLoading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const isLoggedIn = pb.authStore.isValid;
  const router = useRouter();

  async function login(data: any) {
    setLoading(true);
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(data.email, data.password);
    } catch (e) {
      alert(e);
    }
    setLoading(false);
  }

  if (isLoggedIn)
    return (
      <>
        <h1>Logged in: {isLoggedIn && pb.authStore.model?.email.toString()}</h1>
        <button
          onClick={() => {
            pb.authStore.clear();
            router.refresh();
          }}
        >
          Logout
        </button>
      </>
    );
  return (
    <>
      {isLoading && <p>Loading ...</p>}

      <form onSubmit={handleSubmit(login)}>
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
