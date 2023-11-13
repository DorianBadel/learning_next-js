"use client"; // Makes sure the component is only rendered on the client side

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createWlItem, ItemPostT } from "@/app/(hooks)/pocketbase";
import SelectTags from "./SelectTags";

export default function CreateWlItem() {
  const [content, setContent] = useState<ItemPostT>({
    Name: "",
    Price: "",
    Item_link: "",
    Priority: 0,
    Image: undefined,
    tagId: "",
  });

  const router = useRouter();

  const create = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!content) return;
    await createWlItem(content).then(() => {
      alert("Item Created");
      router.replace("/wishlist");
    });
  };

  return (
    <form onSubmit={create}>
      <h1>Create Wishlist Item</h1>
      <input
        name="imageField"
        type="file"
        placeholder="Image"
        onChange={(e) => {
          if (e.target.files) {
            setContent((prev) => ({
              ...prev,
              Image: e.target.files ? e.target.files[0] : undefined,
            }));
            console.log(content.Image);
          }
        }}
      />
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
      <SelectTags
        selectName={"nameField"}
        selectionChange={(tagId: string) => {
          setContent((prev) => ({ ...prev, tagId }));
        }}
      />
      <button type="submit">Create note</button>
    </form>
  );
}
