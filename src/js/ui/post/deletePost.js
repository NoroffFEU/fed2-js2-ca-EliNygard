import api from "../../api/instance.js";

export async function onDeletePost() {
  const id = api.id;

  try {
    await api.post.delete(id);
    alert(`Post #${id} has been deleted`);
  } catch (error) {
    console.error("Error deleting post", error);
    alert(error);
  } finally {
    localStorage.removeItem("id")
    window.location.href = "/profile/";
  }
}
