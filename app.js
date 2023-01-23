const express = require('express')

require ('dotenv').config()

const Joi = require('joi')

const morgan = require('morgan')

const {customerRouter} = require('./routes')
const {movieRouter} = require('./routes')


const PORT = process.env.PORT || 5000
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//routes
app.use('/users', customerRouter)
app.use('/users', movieRouter)

app.get('/',  (req, res) => {
        res.send(`hello world from port ${PORT}`)
});

// app.get('/:id', (req, res) => {
//     const id = req.params.id

//     res.status(200).send({
//         message: `hello to elvis from user with id ${id}` 
//     })
// })

// app.get('/newRoute',  (req, res) => {
//     res.send('hello world from new route');
//     console.log(newRoute)
// });

app.listen(PORT, () => {
    console.log(`server is running  port ${PORT}`)
});