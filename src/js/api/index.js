import { API_KEY } from "./constants";

/**
 * A class representing the SocialAPI service for authentication.
 * This class provides methods to interact with the authentication API for registering, logging in and logging out users.
 * !! update as new things are added !!
 */
export default class SocialAPI {
  /**
   * The base URL for the API
   * @type {string}
   */
  apiBase = "";

  /**
   * Creates an instance of the SocialAPI class
   * @param {string} apiBase
   */
  constructor(apiBase = "https://v2.api.noroff.dev") {
    this.apiBase = apiBase;
  }

  get user() {
    try {
      return JSON.parse(localStorage.user);
    } catch {
      return null;
    }
  }

  get id() {
    try {
      return JSON.parse(localStorage.id);
    } catch {
      return null;
    }
  }

  get apiRegisterPath() {
    return `${this.apiBase}/auth/register`;
  }

  get apiLoginPath() {
    return `${this.apiBase}/auth/login`;
  }

  get apiPostPath() {
    return `${this.apiBase}/social/posts`;
  }
  
    get apiPostsFollowing() {
      return `${this.apiPostPath}/following`;
    }

    get apiPostsQueryParameters() {
      return `?_author=true&_comments=true&_reactions=true`
    }

  get apiAllProfiles() {
    return `${this.apiBase}/social/profiles`;
  }

  get apiLoggedInProfilePostsPath() {
    return `${this.apiAllProfiles}/${this.user.name}/posts`;
  }

  get apiSingleProfile() {
    return `${this.apiAllProfiles}/${profile}`
  }

  get apiProfilesQueryParameters() {
    return `?_following=true&_followers=true&_posts=true`
  }

  /**
   * The authentication methods for the SocialAPI.
   * @property {function} register - Registers a new user with the provided information.
   * @property {function} login - Logs in a user with the given credentials.
   * @property {function} logout - Logs out the current user by clearing local storage.
   */
  auth = {
    /**
     * Registers a new user.
     * Sends the user's details to the API to create a new account.
     *
     * @param {Object} userData - The new user's details.
     * @param {string} userData.name - The user's name.
     * @param {string} userData.email - The user's email address.
     * @param {string} userData.password - The user's password.
     * @param {string} userData.bio - The user's bio.
     * @param {string} userData.banner - The user's banner image URL.
     * @param {string} userData.avatar - The user's avatar image URL.
     * @returns {Promise<Object>} The newly registered user's data if successful.
     * @throws {Error} Throws an error if the registration fails.
     */
    register: async ({ name, email, password, bio, banner, avatar }) => {
      const body = JSON.stringify({
        name,
        email,
        password,
        bio,
        banner,
        avatar,
      });

      const response = await fetch(this.apiRegisterPath, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        body,
      });

      if (response.ok) {
        const { data } = await response.json();
        return data;
      }

      throw new Error(
        "Something went wrong. Could not register account. Please try again."
      );
    },
    /**
     * Logs in a user.
     * Sends the user's email and password to the API to retrieve an access token and user information.
     *
     * @param {Object} userData - The user's login details.
     * @param {string} userData.email - The user's email.
     * @param {string} userData.password - The user's password.
     * @returns {Promise<Object>} The user's data and access token if the login is successful.
     * @throws {Error} Throws an error if the login request fails.
     */
    login: async ({ email, password }) => {
      const body = JSON.stringify({ email, password });

      const response = await fetch(this.apiLoginPath, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        body,
      });

      if (response.ok) {
        const { data } = await response.json();
        const { accessToken: token, ...user } = data;
        localStorage.token = token;
        localStorage.user = JSON.stringify(user);
        return data;
      }

      throw new Error("Could not login. Please try again or register a user.");
    },
    /**
     * Logs out the current user by clearing the token and user data from local storage.
     * The user is then redirected to the home page.
     */
    logout: () => {
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/auth/login/";
      } catch (error) {
        console.error(error);
        alert("Could not logout. Please try again.");
      }
    },
  };

  post = {
    create: async ({ title, body }) => {
      const response = await fetch(this.apiPostPath, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
          "X-Noroff-API-Key": API_KEY,
        },
        method: "post",
        body: JSON.stringify({ title, body }),
      });
      if (response.ok) {
        return await response.json();
      }

      throw new Error(error);
    },

    update: async (id, { title, body }) => {
      const response = await fetch(`${this.apiPostPath}/${id}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
          "X-Noroff-API-Key": API_KEY,
        },
        method: "put",
        body: JSON.stringify({ title, body }),
      });

      if (response.ok) {
        return await response.json();
      }
      throw new Error("Could not update post " + id);
    },

    delete: async (id) => {
      const response = await fetch(`${this.apiPostPath}/${id}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
          "X-Noroff-API-Key": API_KEY,
        },
        method: "delete",
      });

      if (response.ok) {
        console.log("Post was deleted");
        // const text = this.util.handleResponse(response, "text")
        // return text
      }
      throw new Error("Could not delete post with" + id);
    },

    read: async (id) => {
      const response = await fetch(`${this.apiPostPath}/${id}${this.apiPostsQueryParameters}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
          "X-Noroff-API-Key": API_KEY,
        },
        method: "get",
      });

      if (response.ok) {
        const { data } = await response.json();
        return data;
      }

      throw new Error("Could not fetch post");
    },

    loadPostData: async (id, form) => {
      try {
        const post = await this.post.read(id);

        form.querySelector("#title").value = post.title;
        form.querySelector("#body").value = post.body;
      } catch (error) {
        console.error("Error fetching post data", error);
      }
    },
  };

  posts = {
    read: async (limit = 12, page = 1) => {
      const url = new URL(`${this.apiPostPath}${this.apiPostsQueryParameters}`);

      url.searchParams.append("limit", limit);
      url.searchParams.append("page", page);

      const response = await fetch(url, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
          "X-Noroff-API-Key": API_KEY,
        },
        method: "get",
      });

      if (response.ok) {
        const { data } = await response.json();
        return data;
      }
      throw new Error("Could not fetch posts");
    },

    readFollowing: async (limit = 12, page = 1) => {
      const url = new URL(`${this.apiPostsFollowing}${this.apiPostsQueryParameters}`);

      url.searchParams.append("limit", limit);
      url.searchParams.append("page", page);

      const response = await fetch(url, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
          "X-Noroff-API-Key": API_KEY,
        },
        method: "get",
      });

      if (response.ok) {
        const { data } = await response.json();

        return data;
      }
      throw new Error("Could not fetch posts from the following profiles");
    },
  };

  profile = {
    loggedInProfile: {
      readPosts: async () => {
        const url = new URL(`${this.apiLoggedInProfilePostsPath}${this.apiProfilesQueryParameters}`);

        const response = await fetch(url, {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.token}`,
            "X-Noroff-API-Key": API_KEY,
          },
          method: "get",
        });
        if (response.ok) {
          const { data } = await response.json();
          return data;
        }
        throw new Error("Could not fetch posts from profile");
      },
    },
  };
  profiles = {
    readAllProfiles: async (limit = 20, page = 1) => {
      const url = new URL(`${this.apiAllProfiles}${this.apiProfilesQueryParameters}`);

      url.searchParams.append("limit", limit);
      url.searchParams.append("page", page);

      const response = await fetch(url, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
          "X-Noroff-API-Key": API_KEY,
        },
        method: "get",
      });
      if (response.ok) {
        const { data } = await response.json();
        return data;
      }
      throw new Error("Could not get profiles", error);
    },
    readSingleProfile: async (profile) => {
      const url = new URL(`${this.apiSingleProfile}${this.apiProfilesQueryParameters}`)

      const response = await fetch(url, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
          "X-Noroff-API-Key": API_KEY,
        },
        method: "get",
      })
      if (response.ok) {
        const { data } = await response.json()
        return data
      }
      throw new Error("Could not get profile", error)
    },
    follow: async (profile) => {
      const url = new URL(`${this.apiAllProfiles}/${profile}/follow`);

      const response = await fetch(url, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
          "X-Noroff-API-Key": API_KEY,
        },
        method: "put",
      });
      if (response.ok) {
        const { data } = await response.json();
        return data;
      }
      throw new Error("You are already following this profile.");
    },

    unfollow: async (profile) => {
      const url = new URL(`${this.apiAllProfiles}/${profile}/unfollow`);

      const response = await fetch(url, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
          "X-Noroff-API-Key": API_KEY,
        },
        method: "put",
      });
      if (response.ok) {
        const { data } = await response.json();
        return data;
      }
      throw new Error("You are not following this profile.");
    },
  };
}
