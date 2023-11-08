"use client"; // Makes sure the component is only rendered on the client side

import { useState } from "react";
import { useRouter } from "next/navigation";
// import { updateWlItem, deleteWlItem } from "@/app/(hooks)/pocketbase";

export default function EditWlItem({ wl_item }: any) {
  const [content, setContent] = useState({
    Name: wl_item.Name || "",
    Price: wl_item.Price || "",
    Item_link: wl_item.Item_link || "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  const update = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // updateWlItem(
    //   wl_item.id,
    //   content.Name,
    //   content.Price,
    //   content.Item_link
    // ).then(() => {
    //   router.refresh();
    //   router.push("/wishlist");
    // });
  };

  const deleteItem = async () => {
    // deleteWlItem(wl_item.id).then(() => {
    //   router.refresh();
    //   router.push("/wishlist");
    // });
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
