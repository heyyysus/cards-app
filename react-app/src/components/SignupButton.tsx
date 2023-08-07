import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

export function SignupButton() {
    const { loginWithRedirect } = useAuth0();
    

    return (
        <Button
            variant="contained"
            color="primary"
            onClick={() => loginWithRedirect()}
        >
            Sign Up
        </Button>
    );
}