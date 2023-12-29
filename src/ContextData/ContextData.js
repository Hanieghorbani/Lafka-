import { createContext } from "react";

const ContextData = createContext({
    isLoggedIn: false,
    token: null,
    userInfos: {},
    login: () => {},
    logout: () => {},
})

export default ContextData