import { createContext } from "react";

const contextData = createContext({
    isLoggedIn: false,
    token: null,
    userInfos: {},
    login: () => {},
    logout: () => {},
})

export default contextData