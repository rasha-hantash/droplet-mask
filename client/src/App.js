import React from 'react';
import './App.css';
import AddMask from './Components/AddMask';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Card, CardContent } from '@material-ui/core';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
const styles = {
  container: {
    paddingTop: "10%",
    cursor: "pointer",
    margin: '0 auto',
    width: '70%',
    textAlign: 'center '
  }
};
const useStyles = makeStyles(styles);
export const MaterialGrid = () => {
  const classes = useStyles();
  const history = useHistory();
  return (<Container className={classes.container}>
    <Card onClick={() => { history.push('/addMask') }} className={classes.root} variant="outlined">
      <CardContent style={{marginTop: '5%'}}>
        <CameraAltIcon></CameraAltIcon>
          <div >Add a new mask</div>
      </CardContent>
    </Card>
  </Container>
  );
};


class App extends React.Component {
  render() {
    // return 

    return <Router>
      <Route />
      <Switch>
        <Route exact path="/" component={MaterialGrid} />
        <Route exact path="/addMask" component={AddMask} />
      </Switch>
    </Router>;
  }
}

export default App;