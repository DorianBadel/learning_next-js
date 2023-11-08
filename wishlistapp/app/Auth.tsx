"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { login, signout, isUserValid } from "./(hooks)/pocketbase";

export default function Auth() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

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
