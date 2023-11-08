"use client";

import { useState } from "react";
import { createTag } from "@/app/(hooks)/pocketbase";
import { useRouter } from "next/navigation";

function CreateWlGroup() {
  const [tagName, setTagName] = useState("");
  const router = useRouter();

  function handleSubmit(e: any) {
    e.preventDefault();
    createTag(tagName).then(() => router.refresh());
  }
  return (
    <form onSubmit={handleSubmit} style={{ display: "inline-flex", gap: 20 }}>
      <input
        type="text"
        value={tagName}
        onChange={(e) => setTagName(e.target.value)}
      />
      <button type="submit">Create</button>
    </form>
  );
}

export default CreateWlGroup;
