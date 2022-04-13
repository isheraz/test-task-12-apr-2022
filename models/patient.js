"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PatientSchema = new Schema({
    _id: Number,
    petName: String,
    petType: String,
    ownerName: String,
    ownerAddress: String,
    ownerPhoneNumber: Number,
    appointment: Array
});
const Patient = mongoose.model('patient', PatientSchema);
module.exports = Patient;
