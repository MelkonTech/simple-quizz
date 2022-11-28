import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../redux/actions';
import { useHistory } from 'react-router';
import { Box } from '@mui/system';
import { handleAmountChange, handleScoreChange } from '../redux/actions';
import { Button, List, ListItem, ListItemText, Divider } from '@mui/material';

const FinalScreen = () => {
  const disptach = useDispatch();
  const history = useHistory();
  const { score, userInfo } = useSelector((state) => state);
  const [usersRate, setUserRate] = useState([]);
  const dispatch = useDispatch();

  const handleBackToSettings = () => {
    disptach(handleScoreChange(0));
    disptach(handleAmountChange(50));
    history.push('/');
  };

  const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
  };

  useEffect(() => {
    const setStorage = (name, score) => {
      let rate = JSON.parse(localStorage.getItem('usersRate')) || [];

      const userInfo = {
        name: name,
        score: score,
      };

      if (name && score) {
        rate.push(userInfo);
      }

      localStorage.setItem('usersRate', JSON.stringify(rate));
      setUserRate(JSON.parse(localStorage.getItem('usersRate')));
    };

    dispatch(addUser({ name: userInfo.name, score: score }));

    setStorage(userInfo.name, userInfo.score);
  }, [score, dispatch, userInfo.name, userInfo.score]);

  const usersRating = []
    .concat(usersRate)
    .sort((a, b) => (b?.score > a?.score ? 1 : -1))
    .map((item, i) => (
      <List key={i} sx={style} component="nav" aria-label="mailbox folders">
        <ListItem button>
          <ListItemText primary={`username: ${item?.name}`} />
          <ListItemText primary={`score: ${item?.score}`} />
        </ListItem>
        <Divider />
      </List>
    ));

  return (
    <Box mt={30}>
      {usersRating}
      <Button
        style={{ marginTop: '1rem' }}
        onClick={handleBackToSettings}
        variant="outlined"
      >
        back to settings!
      </Button>
    </Box>
  );
};

export default FinalScreen;
