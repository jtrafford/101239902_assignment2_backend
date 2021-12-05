const express = require('express')
const cors = require('cors');
const app = express()
const port = 9090
const mongoose = require('mongoose')
const mongoURI = 'mongodb+srv://jilliantrafford:fullstack@comp3123.on7h9.mongodb.net/101239902_assignment2?retryWrites=true&w=majority'
const employeeModel = require("./model/Employee.js");

let corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
}

app.use(cors(corsOptions))

mongoose.Promise = global.Promise;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB.");    
}).catch(err => {
    console.log('Error. Could not connect to databse.', err);
});


app.use(express.json())

app.get('/', (req, res) => {
  res.send('COMP3123 Backend Assignment Two')
})

//all employee resources fetched
app.get('/api/v1/employees', async (req, res) => {
    
    const employees = await employeeModel.find({});
  
    try {
      res.send({employees});
    } catch (err) {
      console.log(err)
      res.status(500).send(err);
    }
});

//create new employee and save
app.post('/api/v1/employees', async (req, res) => {
    console.log(req.body.data)
    const employee = new employeeModel(req.body);

    try {
      await employee.save();
      res.send(employee);
    } catch (err) {
      res.status(500).send(err);
    }
});

// CHANGE _ID FIELD TO NUMBER INSTEAD OF OBJECTID *************
//search for employee resources based off of id
app.get('/api/v1/employees/:id', async (req, res) => {
    try {
        const id = await employeeModel.findById(req.params.id)
        console.log(id)
        res.send(id)
    } catch(err) {
        res.status(500).send(err)
    }
})

//update employee resources using id
app.put('/api/v1/employees/:_id', async (req, res) => {
    try {
      await employeeModel.findByIdAndUpdate(req.params._id, req.body)
      
      res.send("Update Complete.")
    } catch (err) {
      res.status(500).send(err)
    }
})
   

//delete employee using id
app.delete('/api/v1/employees/:_id', async (req, res) => {
    try {
      const employee = await employeeModel.findByIdAndDelete(req.params._id)
  
      if (!employee) res.status(404).send("No Employee Found")
      res.status(200).send()
    } catch (err) {
      res.status(500).send(err)
    }
})



app.listen(port, () => {
  console.log(`Server is running on: http://localhost: ${port}`)
})


