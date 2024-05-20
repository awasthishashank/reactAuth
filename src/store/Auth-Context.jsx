import React, { useState, useEffect, useCallback } from "react";

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);
  const [logoutTimer, setLogoutTimer] = useState(null);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, [logoutTimer]);

  const loginHandler = (token) => {
    localStorage.setItem('token', token);
    setToken(token);

    // Set the logout timer for 5 minutes (300000 ms)
    const timer = setTimeout(logoutHandler, 300000);
    setLogoutTimer(timer);
  };

  useEffect(() => {
    if (initialToken) {
      // If there's an initial token, set a logout timer
      const timer = setTimeout(logoutHandler, 300000);
      setLogoutTimer(timer);
    }
  }, [initialToken, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;

// import React, { useState } from "react";

// const AuthContext = React.createContext({
//     token : '',
//     isLoggedIn : false,
//     login : (token)=>{},
//     logout : ()=>{}
// });

// export const AuthContextProvider = (props) => {
//     const initialToken = localStorage.getItem('token');
//     const [token ,setToken] = useState(initialToken)
//     const userIsLoggedIn = !!token ;
//     const loginHandler = (token) =>{
//         localStorage.setItem('token',token)
//         setToken(token)
//     }
//     const logoutHandler = () =>{
//         setToken(null)
//         localStorage.removeItem('token');
//     }
//     const contextValue = {
//         token:token,
//         isLoggedIn:userIsLoggedIn,
//         login : loginHandler,
//         logout :logoutHandler
//     }
//     return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
// }
// export default AuthContext ;