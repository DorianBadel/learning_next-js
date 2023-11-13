"use client"; // Makes sure the component is only rendered on the client side
import { getWlItem } from "@/app/(hooks)/pocketbase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SelectTags from "@/app/createItem/SelectTags";
// import { updateWlItem, deleteWlItem } from "@/app/(hooks)/pocketbase";

export default function EditWlItem({ wl_itemId }: { wl_itemId: string }) {
  const [content, setContent] = useState({
    Name: "",
    Price: "",
    Item_link: "",
    tagId: "",
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getWlItem(wl_itemId).then((wl_item) => {
      if (!wl_item) return;
      setContent({
        Name: wl_item.Name,
        Price: wl_item.Price,
        Item_link: wl_item.Item_link,
        tagId: wl_item.Tag ? wl_item.Tag.id : "",
      });
      setIsLoading(false);
      console.log(wl_item);
    });
  }, []);

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

  if (isLoading) return <p>Loading ...</p>;

  return (
    <div>
      <div>
        <form onSubmit={update}>
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
            selectName="selectField"
            selectionChange={(tagId: string) => {
              setContent((prev) => ({ ...prev, tagId }));
            }}
            initialValue={content.tagId}
          />
          <button type="submit">Update</button>
        </form>
        <button onClick={deleteItem}>Delete</button>
      </div>
    </div>
  );
}
