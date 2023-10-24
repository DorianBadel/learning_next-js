// import Link from "next/link";
import CreateWlItem from "./[id]/CreateWlItem";
import DisplayWlItems from "./[id]/DisplayWlItems";

export default async function WishlistPage() {
  return (
    <div>
      <h1>Wishlist Page </h1>
      <DisplayWlItems />

      <CreateWlItem />
    </div>
  );
}
