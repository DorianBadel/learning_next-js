import Link from "next/link";

async function getWishlistItems(){
    const res = await fetch('http://127.0.0.1:8090/api/collections/Wishlist_item/records?page=1&perPage=30', { cache: 'no-store' })
    const data = await res.json();

    return data?.items as any[];
}

export default async function WishlistPage() {
    const wishlistItems = await getWishlistItems();

    return(
        <div>
            <h1>Wishlist Page</h1>
            <div>
                {wishlistItems?.map((item) => {
                    return <WishlistItem key={item.id} wl_item={item}/>;
                })}                
            </div>
        </div>
    )
}

function WishlistItem({ wl_item }: any) {
    const { id, name, price, link } = wl_item || {};
  
    return (
      <Link href={`/wishlist/${id}`}>
        <div>
          <h2>{name}</h2>
          <p>{price}</p>
          <p>{link}</p>
        </div>
      </Link>
    )
  }