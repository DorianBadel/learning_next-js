import EditWlItem from "./EditWlItem";
//This can be changed to use client so that it always works
//currently it breaks when a new item is created and edited.
//Solution is the same as in DisplayWlItems

export default async function ItemPage({ params }: any) {
  return (
    <div>
      <h1>Wishlist/{params.id.substring(2)}</h1>
      <EditWlItem wl_itemId={params.id} />
    </div>
  );
}
