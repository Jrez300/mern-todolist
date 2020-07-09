const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose  = require('mongoose');
const todoRoutes = express.Router()
const dotenv = require('dotenv')
dotenv.config()

let Todo = require('./todo.model')
//attatching middleware
app.use(cors());
app.use(bodyParser.json());

//connect MongoDB using Mongoose
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-8bxaw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,{ useNewUrlParser: true,  useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', function(){
    console.log("MongoDB database connection established Successfully");
})

//Endpoint delivering all todo items
todoRoutes.route('/').get(function(req,res){
    Todo.find(function(err, todo){
        if(err){
            console.log(err);
        } else{
            res.json(todo);
        }
    });
});
//Endpoint to retrieve todo items by ID
todoRoutes.route('/:id').get(function(req,res){
    let id = req.params.id;
    Todo.findById(id, function(err, todo){
        res.json(todo)
    });
});

//Update existing todo
todoRoutes.route('/update/:id').post(function(req,res){
    Todo.findById(req.params.id, function(err,todo){
        if(!todo)
        res.status(404).send('data is not found');
        else
        todo.todo_description = req.body.todo_description;
        todo.todo_responsible = req.body.todo_responsible;
        todo.todo_priority = req.body.todo_priority;
        todo.todo_completed = req.body.todo_completed;

        todo.save().then(todo => {
            res.json("Todo Updated!")
        })
        .catch(err =>{
            res.status(400).send("Update not possible!");
        });
    });
})
//Add new Todo route
todoRoutes.route('/add').post(function(req,res){
    let todo = new Todo(req.body);
    todo.save()
    .then(todo => {
        res.status(200).json({'todo':'todo added successfully'})
    })
    .catch(err => {
        res.status(400).send('adding new todo failed');
    });
});
app.use('/todos', todoRoutes)

//server listening to port 4000
app.listen(process.env.PORT, function(){
    console.log('Server is running in port:' + process.env.PORT)
});