import PocketBase from "pocketbase";
//Defaults
export const url = `https://rough-thunder-1366.fly.dev`;
const collectionItems = "WishlistItems";
const pb = new PocketBase(url);
pb.autoCancellation(false);

export function isUserValid() {
  return pb.authStore.isValid;
}

//User validation
export async function login(username: string, password: string) {
  console.log(username, password);
  try {
    await pb.collection("users").authWithPassword(username, password);

    window.location.reload();
  } catch (e) {
    alert(e);
  }
}
export function signout() {
  try {
    pb.authStore.clear();
  } catch (e) {
    alert(e);
  }
}
// export async function signup(username: string, password: string) {
//   const data = {
//     username: username,
//     password: password,
//     passwordConfirm: password,
//   };
//   await pb.collection("users").create(data);
// }

const collectionTag = "WishlistTags";

export type TagT = {
  id: string;
  Name: string;
  Priority: number;
  Items: ItemT[] | undefined;
};
export async function getAllTags(): Promise<TagT[] | undefined> {
  if (!pb.authStore.isValid) return;
  try {
    const data = await pb
      .collection(collectionTag)
      .getFullList({
        sort: "-created",
        user: pb.authStore.model?.id,
        expand: "Items",
      })
      .then((data) => {
        const parsedData = data.map((tag) => {
          return {
            id: tag.id,
            Name: tag.Name,
            Priority: tag.Priority,
            Items: tag.expand?.Items,
          };
        });
        return parsedData;
      });

    return data;
  } catch (e) {
    alert(e);
    return [];
  }
}

export type TagOptionT = {
  id: string;
  Name: string;
};

export async function getTagOptions(): Promise<TagOptionT[] | undefined> {
  const data = await pb
    .collection(collectionTag)
    .getFullList({
      sort: "-created",
      user: pb.authStore.model?.id,
      fields: "id,Name",
    })
    .then((data) => {
      const parsedData = data.map((tag) => {
        return {
          id: tag.id,
          Name: tag.Name,
        };
      });
      return parsedData;
    });
  return data;
}

export async function createTag(name: string) {
  if (!pb.authStore.isValid) return;
  try {
    const data = {
      Name: name,
      userId: pb.authStore.model?.id,
      user: pb.authStore.model?.id,
    };
    await pb.collection(collectionTag).create(data);
  } catch (e) {
    alert(e);
  }
}

export type ItemT = {
  id: string;
  Name: string;
  Price: string;
  Item_link: string;
  Priority: number;
  Tag?: TagT;
};

export async function getAllItems({
  tagId,
}: {
  tagId: string;
}): Promise<ItemT[] | undefined> {
  if (!pb.authStore.isValid) return;
  try {
    const data = await pb
      .collection(collectionItems)
      .getFullList({
        sort: "-created",
        user: pb.authStore.model?.id,
        filter: `tagId='${tagId}'`,
      })
      .then((data) => {
        const parsedData = data.map((item) => {
          return {
            id: item.id,
            Name: item.Name,
            Price: item.Price,
            Item_link: item.Item_link,
            Priority: item.Priority,
          };
        });
        return parsedData;
      });
    return data;
  } catch (e) {
    alert(e);
    return [];
  }
}

export async function getWlItem(id: string): Promise<ItemT | undefined> {
  if (!pb.authStore.isValid) return;
  try {
    const data = await pb
      .collection(collectionItems)
      .getOne(id, { user: pb.authStore.model?.id, expand: "tagId" })
      .then((data) => {
        return {
          id: data.id,
          Name: data.Name,
          Price: data.Price,
          Item_link: data.Item_link,
          Priority: data.Priority,
          Tag: data.expand?.tagId,
        };
      });
    return data;
  } catch (e) {
    console.log("error", e);
  }
}

export type ItemPostT = {
  Name: string;
  Price: string;
  Item_link: string;
  Priority: number;
  tagId: string;
};

export async function createWlItem(item: ItemPostT) {
  if (!pb.authStore.isValid) return;
  console.log("Create Item", item);
  const data = {
    ...item,
    user: pb.authStore.model?.id,
  };
  await pb.collection(collectionItems).create(data);
}

export async function updateWlItem(item: ItemPostT, id: string) {
  if (!pb.authStore.isValid) return;
  try {
    const data = {
      ...item,
      user: pb.authStore.model?.id,
    };
    await pb.collection(collectionItems).update(id, data);
  } catch (e) {
    alert(e);
  }
}

export async function deleteWlItem(id: string) {
  if (!pb.authStore.isValid) return;
  let confirm = window.confirm("Are you sure you want to delete this task?");
  if (!confirm) {
    return;
  }
  try {
    await pb
      .collection(collectionItems)
      .delete(id, { user: pb.authStore.model?.id });
  } catch (e) {
    alert(e);
  }
}

// export async function createTag(name: string) {
//   if (!pb.authStore.isValid) return;
//   try {
//     const data = {
//       Name: name,
//       userId: pb.authStore.model?.id,
//       user: pb.authStore.model?.id,
//     };
//     await pb.collection(collectionTag).create(data);
//   } catch (e) {
//     alert(e);
//   }
// }

//Setters

export default pb;

// export async function toggleTask(id, title, completed) {
//   const data = {
//     title: title,
//     completed: !completed,
//     user: pb.authStore.model.id,
//   };
//   await pb.collection("tasks").update(id, data);
// }
