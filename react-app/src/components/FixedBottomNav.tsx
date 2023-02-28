import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation, useNavigate } from 'react-router-dom';
import path from 'path';

export interface FixedBottomNavProps {
};

export const FixedBottomNav: FC<FixedBottomNavProps> =  ({ }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const paths = ["/", "/explore", "/account"]
    useEffect(() => { 
      console.log(location.pathname)
    }, [location])

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={1}>
        <BottomNavigation
          showLabels
          value={paths.indexOf(location.pathname)}
          onChange={(event, newValue) => {
            navigate(paths[newValue]);
          }}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Expore" icon={<SearchIcon />} />
          <BottomNavigationAction label="Account" icon={<PersonIcon />} />
        </BottomNavigation>
      </Paper>
    );
};
