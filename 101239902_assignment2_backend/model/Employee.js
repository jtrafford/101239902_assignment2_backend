
const mongoose = require('mongoose')


const EmployeeSchema =  mongoose.Schema({
   
    firstName: {
        type: String, 
        required: [true, 'First Name is Required'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is Required'],
        trim: true,
    },
    emailId: {
        type: String,
        trim: true,
        required: [true, 'Email is Required'],
        //match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid Email Address'],
        trim: true,
    }
})


const Employee  = mongoose.model('Employee', EmployeeSchema)
module.exports = Employee
