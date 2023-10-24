"use client";

import { getAllWlItems } from "@/app/(hooks)/pocketbase";
import Link from "next/link";

import { useEffect, useState } from "react";

export default function DisplayWlItems() {
  const [wishlistItems, setWishlistItems] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAllWlItems().then((data) => {
      setWishlistItems(data);
      setLoading(false);
    });
  }, []);

  if (isLoading) return <p>Loading ...</p>;

  if (!wishlistItems?.length) return <p>Please log in to see the wishlist</p>;

  return (
    <div>
      {wishlistItems?.map((item: { id: any }) => {
        return <WishlistItem key={item.id} wl_item={item} />;
      })}
    </div>
  );
}
function WishlistItem({ wl_item }: any) {
  const { id, Name, Price, Item_link } = wl_item || {};

  return (
    <Link href={`/wishlist/${id}`}>
      <div>
        <h2>{Name}</h2>
        <p>{Price}</p>
        <p>{Item_link}</p>
      </div>
    </Link>
  );
}
