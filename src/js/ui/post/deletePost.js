import api from "../../api/instance.js";

export async function onDeletePost() {
  const id = api.id;

  try {
    await api.post.delete(id);
    alert(`Post #${id} has been deleted`);
  } catch (error) {
    console.error(error);
    alert(error);
  } finally {
    window.location.href = "/profile/";
  }
}
