import React from 'react';
import './App.css';
import AddMask from './Components/AddMask';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const styles = {
  // root: {
  //   display: 'flex',
  //   flexWrap: 'wrap',
  //   justifyContent: 'space-around',
  //   overflow: 'hidden'
  // },

  paper: {
    cursor: "pointer",
    height: "50%",
    padding: "2vw",
    textAlign: "center",
    color: "#000000",
    whiteSpace: "nowrap",
    background: "#cfd8dc",
    marginTop: "2vh",
    marginBottom: "2vh",
    ['@media (max-width:600px)']: { // mobile devices
      height: '100px',
      marginTop: "1%",
      marginBottom: "1%",

    },

    ['@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait)']: //ipad
    {
      height: '200px',
      marginTop: "1%",
      marginBottom: "1px",
      fontSize: "30px",
    },
  },
  container: {
    maxWidth: "600px",
    paddingTop: "10%"
  }
};
const useStyles = makeStyles(styles);
// const classes = useStyles();
export const MaterialGrid = () => {
  const classes = useStyles();
  const history = useHistory();
  return (<Container className={classes.container}>
    <div>
      <Grid container spacing={2}>
      <Grid item xs={6} md={6}>
          <Paper className={classes.paper} style={{ whiteSpace: 'normal' }} type='button'
            onClick={() => { history.push('/addMask') }}>Add a new mask</Paper>
        </Grid>
      </Grid>
    </div>
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
        {/* <Route path="/staff/add/result" render={props => <AddStaffResult {...props}/>} /> */}
      </Switch>
    </Router>;
  }
}

export default App;