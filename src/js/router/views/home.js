import { setLogoutListener } from "../../ui/global/logout";
import { viewPostsAll } from "../../ui/posts/viewPostsAll";
import { viewProfiles } from "../../ui/profile/viewProfiles";
import { authGuard } from "../../utilities/authGuard";

authGuard();
setLogoutListener();
viewPostsAll()
viewProfiles()
