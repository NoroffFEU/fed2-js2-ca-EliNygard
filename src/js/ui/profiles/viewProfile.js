import api from "../../api/instance.js";

export async function viewProfile() {
  try {
    const parameterString = window.location.search;

    const searchParameters = new URLSearchParams(parameterString);

    const profileName = searchParameters.get("name");

    const profile = await api.profiles.readSingleProfile(profileName);

    const section = document.createElement("section")

    const banner = document.createElement("img")
    banner.classList.add("profile-banner")
    banner.src = profile.banner.url

    const avatar = document.createElement("img")
    avatar.classList.add("profile-avatar")
    avatar.src = profile.avatar.url

    const name = document.createElement("h2")
    name.textContent = profile.name

    const bio = document.createElement("p")
    bio.textContent = profile.bio

    const countPosts = document.createElement("p")
    countPosts.textContent = `${profile.name} has written ${profile._count.posts} posts.`

    section.append(banner, avatar, name, bio, countPosts)

    document.querySelector("body").appendChild(section)

  } catch (error) {
    console.error(error);
  }
}
