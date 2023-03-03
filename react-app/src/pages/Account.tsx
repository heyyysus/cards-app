import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { getLocalUser } from "../api/user";
import { IUser } from "../api/models/IUser";
import { AccountSettingsList } from "../components/AccountSettingsList";
import { UserProfileChip } from "../components/UserProfileChip";

export default function AccountPage(){

    return (<AccountSettingsList />);
    
}