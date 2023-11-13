"use client";

import {
  TagT,
  getAllTags,
  ItemT,
  getAllItems,
  retrieveWlImageUrl,
} from "@/app/(hooks)/pocketbase";
import Link from "next/link";

import { useEffect, useState } from "react";
import CreateWlGroup from "./CreateWlGroup";

export default function DisplayWlItems() {
  const [wishlist, setWishlist] = useState<TagT[] | undefined>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAllTags().then((data) => setWishlist(data));
    setLoading(false);
  }, []);

  if (isLoading) return <p>Loading ...</p>;

  //TODO - add a check if the user is logged in
  if (!wishlist?.length) return <p>Please log in to see the wishlist</p>;

  return (
    <div>
      <CreateWlGroup />
      {wishlist?.map((wl) => {
        return <WishlistGroup key={wl.id} wishlist={wl} />;
      })}
    </div>
  );
}

function WishlistGroup({ wishlist }: { wishlist: TagT }) {
  const [items, setItems] = useState<ItemT[] | undefined>([]);
  const [isLoading, setLoading] = useState<boolean | null>(null);

  function LoadItems() {
    setLoading(true);
    getAllItems({ tagId: wishlist.id }).then((data) => setItems(data));
    setLoading(false);
  }

  if (isLoading !== null && isLoading) return <p>Loading ...</p>;

  return (
    <div>
      <button onClick={LoadItems}>{wishlist.Name}</button>
      {isLoading !== null &&
        !isLoading &&
        items?.map((wl_item) => {
          return <WishlistItem key={wl_item.id} wl_item={wl_item} />;
        })}
    </div>
  );
}
function WishlistItem({ wl_item }: { wl_item: ItemT }) {
  const { id, Name, Price, Item_link, Image } = wl_item;

  return (
    <Link href={`/wishlist/${id}`}>
      <div>
        {Image && (
          <>
            <img src={retrieveWlImageUrl(id, Image)} alt="item image" />
          </>
        )}
        <h2>{Name}</h2>
        <p>{Price}</p>
        <p>{Item_link}</p>
      </div>
    </Link>
  );
}
