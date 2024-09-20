import { setLogoutListener } from "../../ui/global/logout";
import { viewPostsAll } from "../../ui/posts/viewPostsAll";
import { authGuard } from "../../utilities/authGuard";

authGuard();
setLogoutListener();
viewPostsAll()
