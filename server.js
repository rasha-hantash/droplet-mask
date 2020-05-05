const express = require('express');
const path = require('path');


const app = express();

// const dotenv = require('dotenv');
// dotenv.config();
require('dotenv').config();

const AirtablePlus = require('airtable-plus');
var cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.post("/addNewMask", (req, res) => {

  const airtable = new AirtablePlus({
    baseID: process.env.REACT_APP_API_AIRTABLE_BASE,
    apiKey: process.env.REACT_APP_API_AIRTABLE_KEY,
    tableName: 'Staff',
  });



  (async () => {
    try {

      console.log(req.body);
      const staffRes = await airtable.read({
        filterByFormula: `{Staff Barcode} = "${req.body.staffBarcode}"`
      });

      
      if (staffRes.length === 0) {
        console.log("here not found");
        res.status(200).send({message: 'User not found', severity: 'warning'});
      } 
      let hasAuth = staffRes[0].fields.hasOwnProperty('Droplet Auth');
      console.log(hasAuth);
       if (!hasAuth) {
        console.log("here no droplet")
        // res.status(200).send('User not authorized for droplet mask');
        res.status(200).send({message: 'User not authorized for droplet mask', severity: 'warning'});
      } else {
        //todays date
        // current timestamp in milliseconds
        let date1 = new Date();
        console.log(date1);
        console.log(staffRes[0].fields['Droplett Date']);
        let date2 = new Date(staffRes[0].fields['Droplett Date']);
        console.log(date2);
        // To calculate the time difference of two dates 
        let Difference_In_Time = date2.getTime() - date1.getTime();
        // To calculate the no. of days between two dates 
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        //To display the final no. of days (result) 
        console.log("Total number of days between dates  <br>"
          + date1 + "<br> and <br>"
          + date2 + " is: <br> "
          + Math.floor(Math.abs(Difference_In_Days))
          + " days");
        console.log('success');
        res.status(200).send({message: 'Success!!', severity: 'success'});
        console.log(typeof Math.abs(Difference_In_Days));
        if(Math.floor(Math.abs(Difference_In_Days)) <= 7){
            const updateRes = await airtable.update(staffRes[0].id, {
            ['Droplet Number']: staffRes[0].fields['Droplet Number'] + 1,
            });
        } else {
          //call update
          //change date to current date
          console.log(date1.toLocaleDateString());
          const updateRes = await airtable.update(staffRes[0].id, {
            ['Droplet Number']: 1,
            ['Droplett Date']: date1.toLocaleDateString(),
            });
        }
        
      }

    }
    catch (e) {
      console.error(e);
    }
  })();
});
const port = process.env.PORT || 4000;
app.listen(port);
console.log("listening on port ", port);
