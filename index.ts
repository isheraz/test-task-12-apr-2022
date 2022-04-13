import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

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

//Mongo DB Connections...
//Require Mongo.
const { MongoClient, ServerApiVersion } = require('mongodb');

//Connection URI...
const uri = "mongodb+srv://hospitalapi123:hospitalapi123@cluster0.wpcbp.mongodb.net/hospitaldata?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(() => {
  
  const collection = client.db("test").collection("devices");  
  client.close();

});



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
});

//Get All Patients.....
app.get('/patient', (req: Request, res: Response) => {
  res.send('all patients are....')
});

//Update Patient Details...
app.patch('/patient/:id', (req: Request, res: Response) => {
  let id = req.params.id
  res.send('Updated '+id)
});

//Delete Patient Details...
app.delete('/patient/:id', (req: Request, res: Response) => {
  let id = req.params.id
  res.send('Deleted '+id)
});

// [OPTIONAL]: Get A Specific Patient!
app.get('/patient/:id', (req: Request, res: Response) => {
  let id = req.params.id
  res.send('Patient '+id+' is')
});

// [OPTIONAL]: Get All Appointments!
app.get('/appointment', (req: Request, res: Response) => {
  res.send('All Appointments Are....')
});

//Add an appoinment to an existing Patient...
app.post('/appointment/:id', (req: Request, res: Response) => {
  let id = req.params.id
  res.send('Added appointment for '+id);
  //Requires As Body....
  /* 1) Appointment Start Time
     2) Appointment End Time
     3) Description
     4) Fee paid (True / False)
     5) Amount Paid */
});

//Get A Specific Patient's Appointment...
app.get('/appointment/:id', (req: Request, res: Response) => {
  let id = req.params.id
  res.send('All the appointment(s) for '+id);
});

//Update Appointment Details...
app.patch('/appointment/:id',(req: Request, res: Response) => {
  let id = req.params.id;
  res.send('Updated appointment(s) Details for '+id)
});

//Delete Appointment Details...
app.delete('/appointment/:id',(req: Request, res: Response) => {
  let id = req.params.id;
  res.send('Deleted appointment(s) Details for '+id)
});

//Get by Date!...
app.get('/appointment/day/:id', (req: Request, res: Response) => {
  let date = req.params.id;
  res.send('Appointments of the date '+date+'are...')
})

//Get by Paid Status....
app.get('/appointment/paid/:id', (req: Request, res: Response) => {
  let booled = req.params.id;
  if(booled == 'false'){
    res.send('Here are all the unpaid Appointments')
    return false;
  }
  res.send('Here are all the paid Appointments')
})

//Get Remaining Bill of patient....
app.get('/patient/remains/:id', (req: Request, res: Response) => {
  let id = req.params.id;
  res.send('Remains of '+id+' Are....')
})

// 12 & 13 Reamining....

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});