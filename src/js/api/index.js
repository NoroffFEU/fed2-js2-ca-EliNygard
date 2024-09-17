// add class SocialAPI here? 

export default class SocialAPI {

    constructor(apiBase) {
        this.apiBase = apiBase;
    }

    get apiRegisterPath() {
        return `${this.apiBase}/auth/register`
    }
    get apiLoginPath() {
        return `${this.apiBase}/auth/login`
    }


    auth = {
        login: async ({ email, password }) => {
            const body = JSON.stringify({ email, password})

            const response = await fetch(this.apiLoginPath, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "post",
                body,
            })

            if (response.ok) {
                const { data } = await response.json()
                const { accessToken: token, ...user } = data;
                localStorage.token = token;
                localStorage.user = JSON.stringify(user)
                return data;
            }

            throw new Error("Error")
        },

        // register: async ({ name,
        //     email,
        //     password,
        //     bio,
        //     banner,
        //     avatar, }) => {
        //         const body = JSON.stringify({email, password, bio, banner, avatar})

        //         const response = await fetch(this.)
        //     }
    }
}