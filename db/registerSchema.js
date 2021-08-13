const mongoose = require('mongoose')

const regSchema = new mongoose.Schema({
    name: String,
    email: String,
    contact: String,
    course: String,
    branch: String,
    organisation: String,
    current_city: String,
    designation: String,
    exams_cleared: {type: String, required: false},
    year_cleared_exam: {type: String, required: false},
    higher_course: {type: String, required: false},
    higher_institution: {type: String, required: false},
    higher_year: {type: String, required: false},
    batchmate_one_name: {type: String, required: false},
    batchmate_one_number: {type: String, require: false},
    batchmate_one_org: {type: String, require: false},
    batchmate_two_name: {type: String, require: false},
    batchmate_two_number: {type: String, require: false},
    batchmate_two_org: {type: String, require: false},
})

const msgSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
})


const statusSchema = new mongoose.Schema({
    isLaunched: Boolean
})
const statusModel = mongoose.model("status", statusSchema)
const regUserModel = mongoose.model("registered-alumnis", regSchema)
const msgModel = mongoose.model("messages", msgSchema)
module.exports = {regUserModel: regUserModel, msgModel: msgModel, statusModel: statusModel}