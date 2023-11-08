// // import { getWlItem } from "@/app/(hooks)/pocketbase";
// import EditWlItem from "./EditWlItem";

// //This can be changed to use client so that it always works
// //currently it breaks when a new item is created and edited.

// //Solution is the same as in DisplayWlItems
// export default async function ItemPage({ params }: any) {
//   const wlItem = await getWlItem(params.id);
//   if (!wlItem) return <div>Item not found</div>;

//   return (
//     <div>
//       <h1>Wishlist/ {wlItem.Name}</h1>
//       <div>
//         <h2>{wlItem.Name}</h2>
//         <p>{wlItem.Price}</p>
//         <p>{wlItem.Item_link}</p>
//       </div>
//       <EditWlItem wl_item={wlItem} />
//     </div>
//   );
// }

import React from "react";

function page() {
  return <div>page</div>;
}

export default page;
