// components/Increment.tsx  
import React, { useState, useEffect } from 'react';
// import JSONBigInt from 'json-bigint'
import { ApiBaseRepository } from '../utils/ApiBaseRepository'
import Tweet from '../models/Tweet'
import { makeStyles, Paper, ListItemAvatar, Chip, Typography, IconButton } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Post from './post'
import Search from './search'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ApartmentIcon from '@material-ui/icons/Apartment';
import Link from '@material-ui/core/Link';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inline: {
    display: 'inline',
  },
  paper: {
    width: '50%',
    minWidth: 400,
    margin: theme.spacing(1)
  },
  buttonArea: {
    display: 'flex',
    width: '50%',
    minWidth: 400,
    margin: theme.spacing(1),
    justifyContent: "space-around",
    alignItems: "center"
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  positionTag: {
    //margin: theme.spacing(0, 7)
  },
  userInfo: {
    display: "flex",
    marginBottom: theme.spacing(2)
  },
  paperUpper: {
    display: "flex",
    justifyContent: "space-between",
    //margin: theme.spacing(0, 7)
  },
  paperBottom: {
    display: "flex",
    justifyContent: "space-between",
    margin: theme.spacing(0, 7)
  }

}));
interface OwnProps { }

type Props = OwnProps

const Home: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const [tweets, setTweets] = useState<Array<Tweet>>([]);

  useEffect(() => {
    ApiBaseRepository.get('/tweets', { transformResponse: [data => data] }).then(response => {
      const JSONbig = require('json-bigint')({ "storeAsString": true })
      setTweets(JSONbig.parse(response.data))
    });

  }, [])

  const handleSearch = (positions: string[], word: string) => {
    var query = '?'
    const positionParams = positions.join(',')
    const wordParams = word.replace("　", " ").split(' ').join(',')
    if (positionParams.length != 0 && !positionParams.includes('全て')) {
      query += `positions=${positionParams}&`
    }

    if (wordParams.length != 0) {
      query += `words=${wordParams}&`
    }
    ApiBaseRepository.get(`/tweets/search` + query)
      .then(response => {
        const JSONbig = require('json-bigint')({ "storeAsString": true })
        setTweets(JSONbig.parse(response.data))
      });
  }

  const tweetsList = tweets.map((tweet: Tweet, index: number) => {
    let dateTime = new Date(tweet.tweeted_at * 1000);

    return (
      <Paper className={classes.paper} key={index}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            {
              tweet.is_club ?
                <ApartmentIcon style={{ fontSize: 40 }} color='action' /> :
                <AccountCircleIcon style={{ fontSize: 40 }} color='action' />
            }
          </ListItemAvatar>
          <div >
            <div className={classes.paperUpper}>
              <div className={classes.userInfo}>
                <Typography color="textPrimary">{tweet.user.name}</Typography>
                <Typography color="textSecondary">@{tweet.user.screen_name}</Typography>
              </div>
              <Typography color="textSecondary">{getStringFromDate(dateTime)}</Typography>
            </div>

            <Typography color="textPrimary">{tweet.full_text}</Typography>
          </div>

        </ListItem>
        <div className={classes.paperBottom}>
          <div className={classes.positionTag}>
            {tweet.positions && tweet.positions.map((position: string) =>
              <Chip
                color="secondary"
                label={position}
                className={classes.chip}
              />
            )}
          </div>
          <IconButton edge="start" color="inherit" aria-label="menu" href={`https://twitter.com/${tweet.user.screen_name}/status/${tweet.tweet_id}`} target="_blank">
            <OpenInNewIcon />
          </IconButton>
        </div>
      </Paper>
    )
  })

  return (
    <div className={classes.root}>
      <div className={classes.buttonArea}>
        <Search handleSearch={handleSearch} />
        <Post />
      </div>
      <List className={classes.list}>

        {tweetsList}
      </List>
    </div>

  )
}

function getStringFromDate(date: Date) {

  var year_str = date.getFullYear();
  //月だけ+1すること
  var month_str = (1 + date.getMonth()).toString();
  var day_str = date.getDate().toString();
  var hour_str = date.getHours().toString();
  var minute_str = date.getMinutes().toString();
  var second_str = date.getSeconds().toString();

  month_str = ('0' + month_str).slice(-2);
  day_str = ('0' + day_str).slice(-2);
  hour_str = ('0' + hour_str).slice(-2);
  minute_str = ('0' + minute_str).slice(-2);
  second_str = ('0' + second_str).slice(-2);

  var format_str = 'MM月DD日 hh:mm';
  format_str = format_str.replace(/MM/g, month_str);
  format_str = format_str.replace(/DD/g, day_str);
  format_str = format_str.replace(/hh/g, hour_str);
  format_str = format_str.replace(/mm/g, minute_str);

  return format_str;
};

export default Home; 