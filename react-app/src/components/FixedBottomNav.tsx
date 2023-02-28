import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { FC, useState } from 'react';
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";

export interface FixedBottomNavProps {};

export const FixedBottomNav: FC<FixedBottomNavProps> =  ({}) => {
    const [ value, setValue ] = useState(0);
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={1}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Expore" icon={<SearchIcon />} />
          <BottomNavigationAction label="Account" icon={<PersonIcon />} />
        </BottomNavigation>
      </Paper>
    );
};
