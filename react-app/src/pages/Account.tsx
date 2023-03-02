import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { getLocalUser } from "../api/auth";
import { IUser } from "../api/models/IUser";
import { AccountSettingsList } from "../components/AccountSettingsList";
import { UserProfileChip } from "../components/UserProfileChip";

export default function AccountPage(){

    const { user, isAuthenticated, isLoading, getAccessTokenSilently, logout } = useAuth0();

    const [ localUser, setLocalUser ] = useState<IUser | null>(null);

    useEffect(() => {
        getAccessTokenSilently()
        .then(t => {
            console.log(t);
            getLocalUser(t)
            .then(u => { console.log(u); setLocalUser(u) })
        })
    }, [getAccessTokenSilently, user?.sub])

    if(isLoading || (isAuthenticated && !localUser))
        return (
            <p>Loading...</p>
        );
    else if (localUser){
        return(
        <>
            <AccountSettingsList user={localUser} />
        </>
        );
    }
   else
    return (<></>);
    
}