import { ComponentProps, FC } from 'react';
import Button from '@mui/material/Button';
import { useAuth0 } from '@auth0/auth0-react';
import { ClassNamesArg } from '@emotion/react';

export interface LoginButtonProps {
    className?: string,
};

export const LoginButton: FC<LoginButtonProps> =  ({ className }) => {
    
    const { loginWithRedirect } = useAuth0();
    return (<Button className={className} onClick={() => { loginWithRedirect() }} variant='contained'>Login</Button>)
};

