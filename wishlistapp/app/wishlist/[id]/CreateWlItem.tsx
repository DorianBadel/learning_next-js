"use client"; // Makes sure the component is only rendered on the client side

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createWlItem } from "@/app/(hooks)/pocketbase";

export default function CreateWlItem() {
  const [content, setContent] = useState({
    Name: "",
    Price: "",
    Item_link: "",
  });

  const router = useRouter();

  const create = async () => {
    createWlItem(content.Name, content.Price, content.Item_link).then(() => {
      setContent({ Name: "", Price: "", Item_link: "" });
      router.refresh();
    });
  };

  return (
    <form onSubmit={create}>
      <h1>Create Wishlist Item</h1>
      <input
        name="nameField"
        type="text"
        placeholder="Name"
        onChange={(e) =>
          setContent((prev) => ({ ...prev, Name: e.target.value }))
        }
        value={content.Name}
      />
      <input
        name="priceField"
        type="text"
        placeholder="Price"
        onChange={(e) =>
          setContent((prev) => ({ ...prev, Price: e.target.value }))
        }
        value={content.Price}
      />
      <input
        name="linkField"
        type="text"
        placeholder="Item_link"
        onChange={(e) =>
          setContent((prev) => ({ ...prev, Item_link: e.target.value }))
        }
        value={content.Item_link}
      />
      <button type="submit">Create note</button>
    </form>
  );
}
