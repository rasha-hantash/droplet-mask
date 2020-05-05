
import React from 'react';
import { Container, Button, Snackbar, TextField, InputAdornment, IconButton} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import Scanner from './Scanner'
import axios from 'axios';
import CenterFocusWeakOutlinedIcon from '@material-ui/icons/CenterFocusWeakOutlined';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = theme => ({
    marginAutoContainer: {
        height: "50%",
        padding: "2vw",
        textAlign: "center",

    },
    marginAutoItem: {
        margin: 'auto'
    },
    alignItemsAndJustifyContent: {
        width: 500,
        height: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'pink',
    },
    root: {
        // '& .MuiTextField-root': {
        //   margin: theme.spacing(1),
        // },

        width: "40%",
        ['@media (max-width:600px)']: { // mobile devices
            marginLeft: "2%",
            width: "95%"

        },

        ['@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait)']: //ipad
        {
            marginLeft: "2%",
            width: "95%",
            fontSize: "30px",
        },
    }
});

class AddMask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            staffBarcode: '',
            lastresult: [],
            scanning: false,
            severity: 'success',
            message: 'Success!',
            open: false

        };
        this.addNewMask = this.addNewMask.bind(this);
        this.backToMainPage = this.backToMainPage.bind(this);
    }

    _scan = () => {
        this.setState({ scanning: !this.state.scanning })
    }

    _onDetected = result => {

        this.state.lastresult.push(result.codeResult.code);
        console.log(this.state.lastresult);
        if (this.state.lastresult.length >= 20) {
            this._logResults();
            this.setState({ ...this.state, scanning: false })
            console.log("This is your state", this.state);

        }
    }
    _logResults = () => {
        console.log("This is your result ", this.state.lastresult)
        let code = this._orderByOccurance(this.state.lastresult)[0];
        this.setState({ ...this.state, staffBarcode: code })
    }

    //return the barcode that occured the most during the scan
    _orderByOccurance = (arr) => {
        var counts = {};
        arr.forEach(function (value) {
            if (!counts[value]) {
                counts[value] = 0;
            }
            counts[value]++;
        });
        return Object.keys(counts).sort(function (curKey, nextKey) {
            return counts[curKey] < counts[nextKey];
        });
    }


    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
        });
        console.log(this.state);
    };

    async addNewMask() {
        const { staffBarcode } = this.state;

        const staffBarcodeReq = {
            staffBarcode
        };
        let response = await axios.post('/addNewMask', staffBarcodeReq);
        console.log(response);
        this.state.message = response.data.message;
        this.state.severity= response.data.severity;
        // this.state.message = response.data;
        this.setState({...this.state, open: true});


    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        console.log('here');
        this.setState({...this.state, open: false});
      };

    async backToMainPage() {
        this.props.history.push('/');
    }

    render() {
        const { classes } = this.props;
        return (
            <Container className={classes.marginAutoContainer}>
                <IconButton style={{ marginRight: '38%' }} onClick={this.backToMainPage}>
                    <ArrowBackIcon></ArrowBackIcon>
                </IconButton>
                <form noValidate autoComplete="off" >
                    <TextField required className={classes.root}
                        id="standard-full-width"
                        name="staffBarcode"
                        value={this.state.staffBarcode}
                        onChange={event => this.handleChange(event)}
                        // style={{ width: "40%", marginBottom: "1%" }}
                        placeholder="Scan Staff Barcode" label="Required"
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><IconButton onClick={this._scan}><CenterFocusWeakOutlinedIcon>

                            </CenterFocusWeakOutlinedIcon></IconButton>
                            </InputAdornment>,
                        }}
                        InputLabelProps={{
                            shrink: true,

                        }}>
                    </TextField>
                </form>
                <form></form>
                <Button className={classes.root} style={{ marginTop: "1%" }} color="primary" variant="outlined" onClick={this.addNewMask}>Add Mask</Button>
                <Snackbar open={this.state.open} autoHideDuration={3000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity={this.state.severity}>
                        {this.state.message}
                </Alert>
                </Snackbar>
                <div>
                    {(this.state.scanning) ? <Scanner onDetected={this._onDetected} /> : null}
                </div>
            </Container>
        )
    }
}
export default withStyles(styles)(AddMask);
