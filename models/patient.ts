const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
  petName: String,
  petType: String,
  ownerName: String,
  ownerAddress: String,
  ownerPhoneNumber: Number,
  appointment: Array
})

const Patient = mongoose.model('patient', PatientSchema);

module.exports = Patient;