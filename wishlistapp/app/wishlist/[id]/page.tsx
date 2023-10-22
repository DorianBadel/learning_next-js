import EditWlItem from "./EditWlItem";

async function getWlItem(itemId: string) {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/WishlistItems/records/${itemId}`,
    { cache: "no-store" }
  );

  const data = await res.json();
  return data;
}

export default async function ItemPage({ params }: any) {
  const wlItem = await getWlItem(params.id);
  return (
    <div>
      <h1>Wishlist/ {wlItem?.Name}</h1>
      <div>
        <h2>{wlItem?.Name}</h2>
        <p>{wlItem?.Price}</p>
        <p>{wlItem?.Item_link}</p>
      </div>
      <EditWlItem wl_item={wlItem} />
    </div>
  );
}
