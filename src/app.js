// import "./css/style.css";
import SocialAPI from "./js/api/index.js";

import router from "./js/router/index.js";

await router(window.location.pathname);

const api = new SocialAPI("https://v2.api.noroff.dev")

const user = await api.auth.login({
    email: "fake@email.com",
    password: "fakePassword"
})





