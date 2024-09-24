import api from "../../api/instance.js";
import { onFollowProfile } from "./followProfile.js";
import { onUnfollowProfile } from "./unfollowProfile.js";

export async function viewProfiles(limit, page) {
  try {
    const profilesObject = await api.profiles.readAllProfiles(limit, page);

    const profiles = profilesObject.data;

    const list = profiles.map((profile) => {
      const li = document.createElement("li");

      const a = document.createElement("a");
      a.href = `/profiles/profile/?name=${profile.name}`;
      a.innerText = profile.name;

      const btnFollow = document.createElement("button");
      btnFollow.textContent = "Follow";
      btnFollow.addEventListener("click", () => onFollowProfile(profile));

      const btnUnfollow = document.createElement("button");
      btnUnfollow.textContent = "Unfollow";
      btnUnfollow.addEventListener("click", () => onUnfollowProfile(profile));

      const btnPosts = document.createElement("button");
      btnPosts.textContent = "View posts";

      const btnProfile = document.createElement("button")
      btnProfile.textContent = "View Profile"
      btnProfile.addEventListener("click", () => {
        window.location.href = `/profiles/profile/?${profile.name}`
      } )

      const aProfile = document.createElement("a");
      aProfile.href = `/profiles?profile=${profile.name}`;
      aProfile.textContent = "View Profile";

      li.append(a, btnFollow, btnUnfollow, btnPosts, aProfile, btnProfile);

      return li;
    });

    document.getElementById("profilesAll").innerHTML = "";
    document.getElementById("profilesAll").append(...list);
  } catch (error) {
    console.error(error);
  }
}
