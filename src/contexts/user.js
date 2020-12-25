import { createContext, useState } from 'react';

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [user, setUser] = useState({});
    const storeUser = (user) => { setUser({ id: user.id }); };
    const logout = () => { setUser({}); };

    console.log('user context', props.test);

    return (
        <UserContext.Provider value={{ user, storeUser }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
