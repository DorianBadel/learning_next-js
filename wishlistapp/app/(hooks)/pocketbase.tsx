import PocketBase from "pocketbase";

//Defaults
const url = `http://127.0.0.1:8090`;
const collection = "WishlistItems";
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

//Getters
export async function getAllWlItems() {
  try {
    const data = await pb.collection(collection).getFullList({
      sort: "-created",
      user: pb.authStore.model?.id,
    });
    console.log(data);
    return data;
  } catch (e) {
    alert(e);
    return [];
  }
}

export async function getWlItem(id: string) {
  try {
    const data = await pb
      .collection(collection)
      .getOne(id, { user: pb.authStore.model?.id });
    console.log(data);
    return data;
  } catch (e) {
    console.log("error", e);
  }
}

//Setters
export async function createWlItem(name: string, price: string, link: string) {
  try {
    const data = {
      Name: name,
      Price: price,
      Item_link: link,
      user: pb.authStore.model?.id,
    };
    await pb.collection(collection).create(data);
  } catch (e) {
    alert(e);
  }
}

export async function updateWlItem(
  id: string,
  name: string,
  price: string,
  link: string
) {
  try {
    const data = {
      Name: name,
      Price: price,
      Item_link: link,
      user: pb.authStore.model?.id,
    };
    await pb.collection(collection).update(id, data);
  } catch (e) {
    alert(e);
  }
}

export async function deleteWlItem(id: string) {
  let confirm = window.confirm("Are you sure you want to delete this task?");
  if (!confirm) {
    return;
  }

  try {
    await pb
      .collection(collection)
      .delete(id, { user: pb.authStore.model?.id });
  } catch (e) {
    alert(e);
  }
}

export default pb;

// export async function toggleTask(id, title, completed) {
//   const data = {
//     title: title,
//     completed: !completed,
//     user: pb.authStore.model.id,
//   };
//   await pb.collection("tasks").update(id, data);
// }
