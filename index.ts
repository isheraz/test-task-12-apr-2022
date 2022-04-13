import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
const mongoose = require('mongoose');

const Patient = require('./models/patient.js')

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
let pkincrement = 0;

app.use(express.json());

//---------//
// TO DO...//
//---------//

//------------------//

// Connect To Mongo..
// Create Schemas...
// npm install 
// and setup Mongoose...
// Write Tests...
// Push to Github...

//------------------//

// Configuring the database
const dbConfig = "mongodb+srv://hospitalapi123:hospitalapi123@cluster0.wpcbp.mongodb.net/hospitaldata?retryWrites=true&w=majority";

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(() => {
  console.log('Could not connect to the database. Exiting now... ');
  process.exit();
});
//asd

//Base Point...
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Pet Hospital API');
});


//Add a new patients.....
app.post('/patient/add', (req: Request, res: Response) => {
  res.send('Added a new Pet!');
  //Requires As Body....
  /* 1) Pet Name
     2) Pet Type
     3) Owner Name
     4) Owner Address
     5) Owner Phone Number */

  let input = req.body;
  console.log(input);

  let patient = new Patient({

    _id: pkincrement,
    petName: input.petName,
    petType: input.petType,
    ownerName: input.ownerName,
    ownerAddress: input.ownerAddress,
    ownerPhoneNumber: input.ownerPhoneNumber

  })

  patient.save().then(() => {
    console.log('Saved Patient!');
    pkincrement++;
  })

});

//Get All Patients.....
app.get('/patient', (req: Request, res: Response) => {

  Patient.find().then((result: Response) => {
    res.send(result);
  })
});

// [OPTIONAL]: Get A Specific Patient!
app.get('/patient/:id', (req: Request, res: Response) => {
  let id = req.params.id
  res.send('Patient ' + id);
});

//Update Patient Details...
app.patch('/patient/:id', (req: Request, res: Response) => {

  let identify = req.params.id;
  let input = req.body;
  if (input._id) {
    res.send('Cant Update _id');
    return false;
  }

  Patient.findByIdAndUpdate({ _id: identify }, input).then(() => {
    return res.send('Updated Patient number ' + identify + '\'s Details');
  })

});

//Delete Patient Details...
app.delete('/patient/:id', (req: Request, res: Response) => {

  let identify = req.params.id;
  let input = req.body;

  if (input._id) {
    res.send('Refrain from sending _.id');
    return false;
  }

  Patient.findByIdAndDelete({ _id: identify }, input).then(() => {
    res.send('Deleted Patient number ' + identify + '\'s Details');
  })
});

// [OPTIONAL]: Get All Appointments!
app.get('/appointment', (req: Request, res: Response) => {
  res.send('All Appointments Are....')
});

//---------------------------Done-Till-Here------------------------//

//Add an appoinment to an existing Patient...
app.post('/patient/:id/appointment', (req: Request, res: Response) => {
  //Requires As Body....
  /* 1) Appointment Start Time
      2) Appointment End Time
      3) Description
      4) Fee paid (True / False)
      5) Amount Paid */

  let identify = req.params.id;
  let inputArr = req.body;

  if (!(Object.prototype.toString.call(inputArr) == '[object Array]')) {
    res.send('Error, Please Send an Array Containing The Appointments!')
    return false;
  }

  Patient.findByIdAndUpdate({ _id: identify }, { appointment: inputArr }).then(() => {
    return res.send('Done Updating the appointments!');
  });

});

//Get A Specific Patient's Appointment...
app.get('/patient/:id/appointment', (req: Request, res: Response) => {
  let identify = req.params.id;

  Patient.findOne({ _id: identify }).then((result: Response) => {
    res.send(result.appointment);
  })

});

//Update Appointment Details... // REVISIT!
app.patch('/patient/:id/appointment', (req: Request, res: Response) => {
  let identify = req.params.id;
  let inputArr = req.body;

  Patient.findByIdAndUpdate({ _id: identify }, { appointment: inputArr }).then(() => {
    return res.send('Done Updating the appointments!');
  });

});

//Delete Appointment Details...
app.delete('/patient/:id/appointment', (req: Request, res: Response) => {
  let identify = req.params.id;

  Patient.findByIdAndUpdate({ _id: identify }, { appointment: [] }).then(() => {
    return res.send('Done Updating the appointments!');
  });

});

//Get by Date!...
app.get('/appointment/:date/:month/:year', (req: Request, res: Response) => {
  let date = req.params.date;
  let month = req.params.month;
  let year = req.params.year;

  let dateSorted = date + '/' + month + '/' + year;

  Patient.findOne({ "appointment.day": dateSorted }).then((results: Response) => {
    res.send(results);
  })

})

//Get by Paid Status....
app.get('/appointment/paid/:id', (req: Request, res: Response) => {
  let booled = req.params.id;
  if (booled == 'false') {
    res.send('Here are all the unpaid Appointments')
    return false;
  }
  res.send('Here are all the paid Appointments')
})

//Get Remaining Bill of patient....
app.get('/patient/:id/remains', (req: Request, res: Response) => {
  let id = req.params.id;
  res.send('Remains of ' + id + ' Are....')
})

// 12 & 13 Reamining....

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});