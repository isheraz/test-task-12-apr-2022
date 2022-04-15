const express = require('express');
const Patient = require('../models/patient')

const router = express.Router();

//Add a new patients.....
router.post('/patient/add', (req: Request, res: Response) => {
    res.send('Added a new Pet!');
    //Requires As Body....
    /* 1) Pet Name
       2) Pet Type
       3) Owner Name
       4) Owner Address
       5) Owner Phone Number */
  
    let input = req.body;
    console.log(input);
  
    if(!(input.petName &&
      input.petType &&
      input.ownerName &&
      input.ownerAddress &&
      input.ownerPhoneNumber))
      res.send(404) //Missing Fields!
  
    let patient = new Patient({
      petName: input.petName,
      petType: input.petType,
      ownerName: input.ownerName,
      ownerAddress: input.ownerAddress,
      ownerPhoneNumber: input.ownerPhoneNumber
  
    })
    patient.save()
    //Successfully Saved!
  });
  
  //Get All Patients.....
  router.get('/patient', (req: Request, res: Response) => {
  
    Patient.find().then((result: Response) => {
      res.send(result);
    })
  });
  
  // // [OPTIONAL]: Get A Specific Patient!
  // router.get('/patient/:id', (req: Request, res: Response) => {
  //   let id = req.params.id
  //   res.send('Patient ' + id);
  // });
  
  //Update Patient Details...
  router.patch('/patient/:id', (req: Request, res: Response) => {
  
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
  router.delete('/patient/:id', (req: Request, res: Response) => {
  
    let identify = req.params.id;
    let input = req.body;
  
    if (input._id) {
      res.send('Refrain from sending _.id');
      return false;
    }
  
    Patient.findByIdAndDelete({ _id: identify }, input).then(() => {
      res.send('Deleted Patient number ' + identify + '\'s Details');
    })
    .catch((err: Response) => {
      res.send("Cant Find ID!");
    })
  });
  
// [OPTIONAL]: Get All Appointments!
router.get('/appointment', (req: Request, res: Response) => {
    let appointments = new Array;
  
    Patient.find().then((result: Response) => {
      result.forEach(indvObj => {
          appointments.push(indvObj.appointment);
      });
      res.send(appointments);
    })
  
  });
  
  //Add an appoinment to an existing Patient...
  router.post('/patient/:id/appointment', (req: Request, res: Response) => {
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
  router.get('/patient/:id/appointment', (req: Request, res: Response) => {
    let identify = req.params.id;
  
    Patient.findOne({ _id: identify }).then((result: Response) => {
      res.send(result.appointment);
    })
  
  });
  
  //Update Appointment Details... // REVISIT!
  router.patch('/patient/:id/appointment', (req: Request, res: Response) => {
    let identify = req.params.id;
    let inputArr = req.body;
  
    Patient.findByIdAndUpdate({ _id: identify }, { appointment: inputArr }).then(() => {
      return res.send('Done Updating the appointments!');
    });
  
  });
  
  //Delete Appointment Details...
  router.delete('/patient/:id/appointment', (req: Request, res: Response) => {
    let identify = req.params.id;
  
    Patient.findByIdAndUpdate({ _id: identify }, { appointment: [] }).then(() => {
      return res.send('Done Updating the appointments!');
    });
  
  });
  
  //Get by Date!...
  router.get('/appointment/:date/:month/:year', (req: Request, res: Response) => {
    let date = req.params.date;
    let month = req.params.month;
    let year = req.params.year;
  
    let dateSorted = date + '/' + month + '/' + year;
  
    Patient.findOne({ "appointment.day": dateSorted }).then((results: Response) => {
      res.send(results);
    })
  
  })
  
  //Get by unpaid Status....
  router.get('/appointment/unpaid', (req: Request, res: Response) => {
    // let booled = req.params.id;
    Patient.find({ 'appointment.feePaid': false })
      .then((result: Response) => {
        res.send(result);
      })
  })
  
  //Get Remaining Bill of patient....
  router.get('/patient/:id/remains', (req: Request, res: Response) => {
    let id = req.params.id;
  
    Patient.find({ _id: id })
      .then((result: Response) => {
        if(result[0].appointment === true){
          return res.send(result[0].appointment[0].amount);
        }
        return res.send('No Remaining Bills!')
      })
  
  })
  
  // Get popular pet type..
  router.get('/patient/popular/get', (req: Request, res: Response) => {
  
    Patient.find().then((result: Response) => {
  
      let LocalArray: any[] = new Array;
      let VoteSpaces = new Array(10).fill(0);
      
      result.forEach(petJSON => LocalArray.push(petJSON.petType))
      let pets = [...new Set(LocalArray)];
  
      result.forEach(petJSON => {
  
          pets.forEach((pet, index) => {
          
              if(petJSON.petType === pet){
                  VoteSpaces[index]++;
              }
  
          })
  
      })
  
      VoteSpaces.length = pets.length;
      let largestFromVotes = VoteSpaces.indexOf(Math.max(...VoteSpaces))
  
    res.send(pets[largestFromVotes]);
    
    })
    
  })
  

  module.exports = router;