import { onLogout } from "../../ui/auth/logout";
import { viewPostsAll } from "../../ui/posts/viewPostsAll";
import { viewPostsFollowing } from "../../ui/posts/viewPostsFollowing";
import { viewProfiles } from "../../ui/profiles/viewProfiles";
import { authGuard } from "../../utilities/authGuard";

authGuard();
onLogout()
viewProfiles()
viewPostsFollowing()
viewPostsAll()


