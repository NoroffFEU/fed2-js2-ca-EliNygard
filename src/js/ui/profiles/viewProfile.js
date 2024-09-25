import api from "../../api/instance.js";

export async function viewProfile() {
  try {
    const parameterString = window.location.search;

    const searchParameters = new URLSearchParams(parameterString);

    const profileName = searchParameters.get("name");

    const profile = await api.profiles.readSingleProfile(profileName);
    console.log(profile);

    const profileCard = document.createElement("section");

    const banner = document.createElement("img");
    banner.classList.add("profile-banner");
    banner.src = profile.banner.url;

    const avatar = document.createElement("img");
    avatar.classList.add("profile-avatar");
    avatar.src = profile.avatar.url;

    const name = document.createElement("h2");
    name.textContent = profile.name;

    const bio = document.createElement("p");
    bio.textContent = profile.bio;

    const countPosts = document.createElement("p");
    countPosts.textContent = `${profile.name} has written ${profile._count.posts} posts.`;

    const posts = profile.posts;
    console.log(posts);

    if (posts) {
      const list = posts.map((post) => {
        const li = document.createElement("li");

        const title = document.createElement("h4");
        title.textContent = post.title;

        const body = document.createElement("p");
        body.textContent = post.body;

        li.append(title, body);
        return li;
      });
      document.getElementById("postsList").append(...list);
    } else {
      console.log("profile has no posts yet");
    }
    profileCard.append(banner, avatar, name, bio, countPosts);
    document.getElementById("profileCard").appendChild(profileCard);
  } catch (error) {
    console.error("Error fetching profile: ", error);
    alert(error);
  }
}
