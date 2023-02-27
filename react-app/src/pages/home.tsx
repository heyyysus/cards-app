import { useAuth0 } from '@auth0/auth0-react';
import { FC } from 'react';
import { LoginButton } from '../components/LoginButton';
import { ProfileCard } from '../components/ProfileCard';

import Styles from './home.module.css';

export interface HomePageProps {};

const HomePage: FC<HomePageProps> =  ({  }) => {

    const { user, isAuthenticated, isLoading } = useAuth0();

    if(isLoading)
        return (
            <p>Loading...</p>
        );
    else if (isAuthenticated && user){
        return(<ProfileCard user={user} />);
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