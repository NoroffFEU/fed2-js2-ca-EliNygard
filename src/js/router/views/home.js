import { setLogoutListener } from "../../ui/global/logout";
import { authGuard } from "../../utilities/authGuard";

authGuard();
setLogoutListener();
