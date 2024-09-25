import api from "../../api/instance.js";

export async function onFollowProfile(profile) {
    const follow = profile.name
  try {
    const profile = await api.profiles.follow(follow)
    alert(`You are now following ${follow}.`)
    return profile
    
  } catch (error) {
    console.error("Error trying to follow profile: ", error);
    alert(error);
  }
}
