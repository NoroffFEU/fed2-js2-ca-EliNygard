import api from "../../api/instance.js";

export async function onDeletePost() {
  const id = api.id;

  try {
    await api.post.delete(id);
    alert(`The post has been deleted`);
    window.location.href = "/profile/";
  } catch (error) {
    console.error(error);
    alert(`The post could not be deleted`);
  }
}
