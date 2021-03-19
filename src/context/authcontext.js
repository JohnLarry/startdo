import { createContext, useContext } from "react";

export const AuthContext = createContext();
export const UuidContext = createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function useUuid(){
    return  useContext(UuidContext);
}