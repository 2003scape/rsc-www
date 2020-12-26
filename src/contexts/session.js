import { createContext, useState } from 'react';

export const SessionContext = createContext();

const SessionContextProvider = (props) => {
    const [user, setUser] = useState(props.session.user || {});
    const [token, setToken] = useState(props.session.token || '');

    const storeUser = (user) => {
        setUser({ id: user.id, username: user.username, rank: user.rank });
    };

    return (
        <SessionContext.Provider value={{ user, storeUser, token, setToken }}>
            {props.children}
        </SessionContext.Provider>
    );
};

export default SessionContextProvider;
