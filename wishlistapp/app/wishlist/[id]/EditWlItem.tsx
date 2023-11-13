"use client"; // Makes sure the component is only rendered on the client side
import {
  deleteWlItem,
  getWlItem,
  updateWlItem,
  ItemPostT,
} from "@/app/(hooks)/pocketbase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SelectTags from "@/app/createItem/SelectTags";

export default function EditWlItem({ wl_itemId }: { wl_itemId: string }) {
  const [content, setContent] = useState<ItemPostT>({
    Name: "",
    Price: "",
    Item_link: "",
    tagId: "",
    Image: undefined,
    Priority: 0,
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
        Priority: wl_item.Priority,
      });
      setIsLoading(false);
    });
  }, []);

  const update = async () => {
    updateWlItem(content, wl_itemId).then(() => {
      alert("Item updated");
      router.refresh();
      router.push("/wishlist");
    });
  };

  const deleteItem = async () => {
    deleteWlItem(wl_itemId).then(() => {
      router.refresh();
      router.push("/wishlist");
    });
  };

  if (isLoading) return <p>Loading ...</p>;

  return (
    <div>
      <div>
        <form onSubmit={update}>
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
