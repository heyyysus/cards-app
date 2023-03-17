import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { IUser } from "../api/models/IUser";
import { getAllUsers, getLocalUser, submitUserAction } from "../api/user";
import { UserList } from "../components/UserList";


export default function ExplorePage() {
    const { user, getAccessTokenSilently } = useAuth0();
    const [ localUser, setLocalUser ] = useState<IUser | null>(null);
    const [ searchUserList, setSearchUserList ] = useState<IUser[]>([]);

    const handleUserAction = async (user_id: string, action: string) => {
        const t = await getAccessTokenSilently();
        const result = await submitUserAction(t, user_id, action);
        if(result) reloadUserData(t);
        
    }

    const reloadUserData = (token: string) => {
        getLocalUser(token)
            .then(u => setLocalUser(u))
            getAllUsers(token)
            .then(l => setSearchUserList(l))
    }
    
    useEffect(() => {
        getAccessTokenSilently()
        .then(t => {
            reloadUserData(t)
        })
    }, [user]);

    if(!localUser){
        return (
            <p>Loading ...</p>
        );
    } else {
        return (
            <UserList handleUserAction={handleUserAction}  userList={searchUserList} localUser={localUser}/>
        );
    }

}