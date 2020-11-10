import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import MenuItem from '@material-ui/core/MenuItem'
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { ApiBaseRepository } from '../utils/ApiBaseRepository'
import SearchIcon from '@material-ui/icons/Search';
import Card from '@material-ui/core/Card';


const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1, 1, 0, 1),
      width: 200,
    },
  },
  paper: {
    margin: 'auto',
    width: 436,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    justifyContent: 'center',
    display: 'flex',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
    maxWidth: 300,
    display: 'flex',
    justifyContent: 'center'
  },
  vclabel: {
    fontSize: 13,
    margin: theme.spacing(1),
  },
  freeWordSearch: {
    margin: theme.spacing(5),
  },
  searchButton: {
    margin: theme.spacing(2),
  }
}));


interface OwnProps {
  handleSearch: (positions: string[], word: string) => void;
}

type Props = OwnProps

const Search: React.FC<Props> = (props: Props) => {

  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {

  }, [])


  const positions = ['全て', 'ST', 'CF', 'LW', 'RW', 'CAM', 'CM', 'LM', 'RM', 'CDM',
    'LWB', 'RWB', 'LB', 'RB', 'CB', 'GK',];


  const voiceChats = ['PS4', 'DisCord', 'VC不可', ''];


  function getStyles(position: string, positionNames: string[], theme: any) {
    return {
      fontWeight:
        positionNames.indexOf(position) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  // 選択中のポジション（複数）
  const [positionNames, setPositionNames] = React.useState(['全て']);

  const [voiceChat, setVoiceChat] = React.useState('');

  const [searchWord, setSearchWord] = React.useState('');

  const handleChange = (event: any) => {
    if (event.target.value.includes('全て') && !positionNames.includes('全て')) {
      setPositionNames(['全て'])
    } else if (positionNames.includes('全て')) {
      setPositionNames(event.target.value.filter((value: string) => value !== '全て'))
    }
    else {
      setPositionNames(event.target.value);
    }
    console.log(event.target.value)
  };

  const handleVoiceChatChange = (event: any) => {
    setVoiceChat(event.target.value);
  };

  const handleTextChange = (event: any) => {
    setSearchWord(event.target.value);
  };
  return (
    <Card variant='outlined'>
      <Grid container spacing={1} justify="center" alignItems="center">
        <Grid item xs={12} sm={6}>
          <TextField id="freetext" label="自由検索" value={searchWord} variant="outlined" size="small" onChange={handleTextChange} className={classes.freeWordSearch} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-chip-label">ポジション選択</InputLabel>
            <Select
              labelId="searchPositionLabel"
              id="searchPosition"
              multiple
              value={positionNames}
              onChange={handleChange}
              input={<Input id="selectSearchPosition" />}
              renderValue={(selected: string[] | unknown) => (
                selected &&
                <div className={classes.chips}>
                  {(selected as string[]).map((value: string) => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
            >
              {positions.map((position) => (
                <MenuItem key={position} value={position} style={getStyles(position, positionNames, theme)}>
                  {position}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2} sm={6} />
        <Grid item xs={8} sm={6}>
          <Button id="search" variant="contained" color="primary" startIcon={<SearchIcon />} className={classes.searchButton} onClick={() => props.handleSearch(positionNames, searchWord)}>
            検索する
　　　      </Button>
        </Grid>
        <Grid item xs={2} sm={6} />

        {/* VCはとりあえずなし。（VCを募集内容に含めているツイートが少ないため）
        <Grid item xs={6} >
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend" className={classes.vclabel}>VC選択</FormLabel>
            <RadioGroup aria-label="position" name="position" value={voiceChat} onChange={handleVoiceChatChange} row>
              <FormControlLabel
                value="PS4"
                control={<Radio color="primary" />}
                label="PS4"
                labelPlacement="top"
              />
              <FormControlLabel
                value="DisCord"
                control={<Radio color="primary" />}
                label="DisCord"
                labelPlacement="top"
              />
              <FormControlLabel
                value="VC不可"
                control={<Radio color="primary" />}
                label="VC不可"
                labelPlacement="top"
              />
            </RadioGroup>
          </FormControl>
        </Grid> */}



      </Grid>
    </Card >
  );


}

export default Search; 