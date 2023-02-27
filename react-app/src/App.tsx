import React from 'react';
import Button from '@mui/material/Button';
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Route, Routes as Switch } from "react-router-dom";

import HomePage from "./pages/home";
import Container from '@mui/material/Container';

import Styles from "./App.module.css";

function App() {
  return (
    <Container className={ Styles.main_container } maxWidth='md'>

        <Router>
          <Switch>
            <Route path='/' element={<HomePage />} />
          </Switch>
        </Router>
    </Container>
  );
}

export default App;
