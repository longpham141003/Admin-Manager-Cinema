import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState({
        fullName: '',
        username: '',
        email: '',
        phone: '',
    });
    const [users, setUsers] = useState([]);

    // Function to update specific fields of userDetails
    const updateUserDetails = (field, value) => {
        setUserDetails(prevDetails => ({
            ...prevDetails,
            [field]: value,
        }));
    };

    return (
        <UserContext.Provider value={{
            users,
            setUsers,
            userDetails,
            setUserDetails,
            updateUserDetails,
        }}>
            {children}
        </UserContext.Provider>
    );
};
