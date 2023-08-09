import { FC } from 'react';
import { IPlan } from '../api/models/IPlan';
import { IUser } from '../api/models/IUser';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import config from "../config.json";
import { SimpleMap } from './SimpleMap';
import { PlanFeedMap } from './PlanFeedMap';
import PlansFeedItemOptionsMenu from './PlansFeedItemOptionsMenu';
import { User } from '@auth0/auth0-react';
import { format } from 'node:path/posix';
import { Divider } from '@mui/material';

export interface PlansFeedItemProps {
    planItem: IPlan,
    localUser: IUser,
    handlePlanAction: (plan_id: number, action: string) => void,
};

export const PlansFeedItem: FC<PlansFeedItemProps> =  ({ planItem, localUser, handlePlanAction }) => {

    const isAuthor = planItem.author?.user_id === localUser.user_id;

    const handleOptionsClick = ({ pageX, pageY }: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setOptionsMenuLocation({ x: pageX - 320, y: pageY });
    };

    const handleCloseOptions = () => {
      setOptionsMenuLocation(null);
    };

    React.useEffect(() => {
      console.log(planItem);
    }, [planItem]);

    const [ optionsMenuLocation, setOptionsMenuLocation ] = React.useState<{ x: number, y: number } | null>(null);

    const formatTimestampToString = (date: Date) => {
      const newDate = new Date(date);
      return newDate.toLocaleString('en-US');
    }

    const formatTimeOfEvent = (start: Date, end: Date) => {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const isSameDay = startDate.getDate() === endDate.getDate();

      if (isSameDay) {
        return `${startDate.toLocaleString()} - ${endDate.toLocaleTimeString()}`;
      }

      else {
        return `${startDate.toLocaleString()} - ${endDate.toLocaleString()}`;
      }
    }

    return (
    <Card sx={{ marginBottom: '50px', width: "100%" }}>
      <CardHeader
        avatar={
          <Avatar alt={planItem.author?.username}
          src={planItem.author?.profile_img ? `${config.IMAGE_ROOT_URL}${planItem.author.profile_img}` : `${process.env.PUBLIC_URL}${config.DEFAULT_PROFILE_IMAGE}`} />
        }
        action={
          <IconButton aria-label="settings" onClick={ handleOptionsClick } >
            <MoreVertIcon />
          </IconButton>
        }
        title={planItem.author?.username}
        subheader={planItem?.ts ? `Posted ${formatTimestampToString(planItem.ts)}` : ""}
      />
      <CardContent>
        {/** PlansFeedItemOptionsMenu Must be in front of PlanFeedMap */}
        {(optionsMenuLocation) ? <div style={{
          position: 'absolute',
          top: optionsMenuLocation.y,
          left: optionsMenuLocation.x,
          zIndex: 1000,
        }}><PlansFeedItemOptionsMenu 
              handleClose={ handleCloseOptions } 
              isAuthor={ isAuthor }
              planItem={ planItem }
              handlePlanAction={ handlePlanAction }
          /></div> : null}

        <Typography variant="h5" color="text.primary" sx={{
        }}>
          {planItem.plan_name}
        </Typography>

        <Typography variant="body1" color="text.primary" sx={{
          marginBottom: '5px',
        }}>
          {planItem.plan_desc}
        </Typography>

        <Divider sx={{
          "marginTop": "20px",
          "marginBottom": "20px",
        }} />

        <Typography variant='subtitle1' color="text.secondary">
            { planItem?.start_ts && planItem.end_ts ? formatTimeOfEvent(planItem.start_ts, planItem.end_ts) : ""} 
        </Typography>

        {/* MAP GOES HERE */}
        {/* <SimpleMap center={{lat: planItem.plan_lat || 0, lng: planItem.plan_lng || 0}} zoom={15} /> */}
        <PlanFeedMap center={{lat: planItem.plan_lat || 0, lng: planItem.plan_lng || 0}} zoom={15} />

      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        
      </CardActions>
    </Card>
    );
};