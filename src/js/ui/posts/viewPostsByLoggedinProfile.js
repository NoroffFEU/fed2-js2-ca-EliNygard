import api from "../../api/instance.js";

/**
 * Fetches and displays posts made by the logged-in profile.
 *
 * This function retrieves the posts associated with the logged-in profile from the API and dynamically creates
 * a list of links for each post. Each link directs to a detailed view of the post by using the post's ID in the URL.
 * The posts are appended to the HTML element with the ID "viewPostsProfile".
 *
 * @async
 * @function viewPostsByLoggedinProfile
 * @returns {Promise<void>} Resolves when the posts are fetched and displayed, or an error is caught.
 *
 * @throws {Error} Will throw an error if there is an issue fetching the posts from the API.
 */

export async function viewPostsByLoggedinProfile() {
  try {
    const posts = await api.profile.loggedInProfile.readPosts();

    const list = posts.map((post) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `/post/?id=${post.id}`;
      a.innerText = post.title;
      li.appendChild(a);
      return li;
    });

    document.querySelector("#viewPostsProfile").append(...list);
  } catch (error) {
    console.error("Error fetching posts: ", error);
    alert(error);
  }
}
