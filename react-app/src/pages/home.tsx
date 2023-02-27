import { GetTokenSilentlyOptions, useAuth0 } from '@auth0/auth0-react';
import { FC, useEffect, useState } from 'react';
import { getLocalUser } from '../api/auth';
import { IUser } from '../api/models/IUser';
import { LoginButton } from '../components/LoginButton';
import { ProfileCard } from '../components/ProfileCard';

import Styles from './home.module.css';

export interface HomePageProps {};

const HomePage: FC<HomePageProps> = ({  }) => {

    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

    const [ localUser, setLocalUser ] = useState<IUser | null>(null);

    useEffect(() => {
        getAccessTokenSilently()
        .then(t => {
            getLocalUser(t)
            .then(u => setLocalUser(u))
        })
    }, [getAccessTokenSilently, user?.sub])

    if(isLoading || (isAuthenticated && !localUser))
        return (
            <p>Loading...</p>
        );
    else if (localUser){
        return(<p>{localUser.user_id}</p>);
    }
    else
    return (
        <div className={ Styles.home_page }>
            <div>
                <LoginButton className={ Styles.login_button } />
            </div>
        </div>
    );
};

export default HomePage;