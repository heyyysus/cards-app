import React, { FC } from 'react';

import { IPlan } from '../api/models/IPlan';
import { IUser } from '../api/models/IUser';

import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

import { User } from '@auth0/auth0-react';

export interface PlansFeedItemOptionsMenuProps {
    handleClose: () => void;
    isAuthor: boolean;
    user?: User;
}

export const PlansFeedItemOptionsMenu = ({ handleClose, isAuthor }: PlansFeedItemOptionsMenuProps) => {

    const handleDelete = () => {
        console.log("Delete");
    }


    return (
    <Paper sx={{ width: 320, maxWidth: '100%' }}>
        <MenuList>
        { (isAuthor) ? (
            <MenuItem onClick={e => handleDelete()}>
                <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
            </MenuItem>
        ) : (<></>)}
        
        <Divider />
        <MenuItem onClick={handleClose}>
            <ListItemIcon>
            <CloseIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Close</ListItemText>
        </MenuItem>
        </MenuList>
    </Paper>
    );
}

export default PlansFeedItemOptionsMenu;