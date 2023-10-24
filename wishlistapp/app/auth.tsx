"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { login, signout, isUserValid } from "./(hooks)/pocketbase";

export default function Auth() {
  // const [isLoading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  // const isLoggedIn = pb.authStore.isValid;
  const router = useRouter();

  // async function login(data: any) {
  //   setLoading(true);
  //   try {
  //     const authData = await pb
  //       .collection("users")
  //       .authWithPassword(data.email, data.password);
  //   } catch (e) {
  //     alert(e);
  //   }
  //   setLoading(false);
  // }

  if (isUserValid())
    return (
      <>
        <h1>Logged in: {isUserValid() && "Yeeee"}</h1>
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
      {/* {isLoading && <p>Loading ...</p>} */}

      <form
        onSubmit={handleSubmit((e) => {
          login(e.email, e.password);
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
