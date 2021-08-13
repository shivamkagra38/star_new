const mongoose = require('mongoose')

const regSchema = new mongoose.Schema({
    name: String,
    email: String,
    contact: String,
    course: String,
    branch: String,
    organisation: String,
    current_city: String,
    exams_cleared: {type: String, required: false},
    year_cleared_year: {type: String, required: false},
    higer_course: {type: String, required: false},
    higer_institution: {type: String, required: false},
    higer_year: {type: String, required: false},
    batchmate_one_name: {type: String, required: false},
    batchmate_one_number: {type: String, require: false},
    batchmate_one_org: {type: String, require: false},
    batchmate_two_name: {type: String, require: false},
    batchmate_two_number: {type: String, require: false},
    batchmate_two_org: {type: String, require: false},
})

const regUserModel = mongoose.model("Registered", regSchema)

module.exports = {regUserModel: regUserModel}