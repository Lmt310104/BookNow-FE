// import React, {createContext, useState, ReactNode} from "react"
// interface User {
//     user_id: number | null;
//     role: string | null;
//     isAuth: boolean;
//     isPending: boolean;
// }
// interface AuthContextType {
//     user: User;
//     setUser: React.Dispatch<React.SetStateAction<User>>;
// }

// export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// interface AuthProviderProps {
//     children: ReactNode;
// }

// export const AuthProvider: React.FC<{children: AuthProviderProps}> = (props) => {
//     const [user, setUser] = useState({
//         user_id: null,
//         role: null,
//         isAuth: false,
//         isPending: true
//     });

//     return (
//         <AuthContext.Provider value={{user, setUser}}>
//             {props.children}
//         </AuthContext.Provider>
//     );
// }

