"use client"; // Makes sure the component is only rendered on the client side

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditWlItem({ wl_item }: any) {
  const [content, setContent] = useState({
    Name: wl_item.Name || "",
    Price: wl_item.Price || "",
    Item_link: wl_item.Item_link || "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  const update = async () => {
    await fetch(
      `http://127.0.0.1:8090/api/collections/WishlistItems/records/${wl_item.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...content,
        }),
      }
    );
    router.back();
  };

  const deleteItem = async () => {
    await fetch(
      `http://127.0.0.1:8090/api/collections/WishlistItems/records/${wl_item.id}`,
      {
        method: "DELETE",
      }
    ).catch((error) => {
      console.error("Error:", error);
    });

    router.back();
  };

  return (
    <div>
      <button onClick={() => setIsEditing(!isEditing)}>Edit</button>

      {isEditing && (
        <div>
          <form onSubmit={update}>
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
            <button type="submit">Update</button>
          </form>
          <button onClick={deleteItem}>Delete</button>
        </div>
      )}
    </div>
  );
}
