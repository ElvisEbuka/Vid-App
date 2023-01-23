const express = require('express')
const Joi = require('joi');

const customerRouter = express.Router()

const users = [
    {id: 1, name: 'Marve Kalu', age: 25, emailAddress: 'marvekalu@gmail.com', country: 'canada' },
    {id: 2, name: 'Dubem Godspower', age: 23, emailAddress: 'dubbido@gmail.com', country: 'dubai'},
]


customerRouter.get('/customers', (req, res) => {
    res.status(200).json(users)
});

customerRouter.get('/customers/:id', (req, res) => {
    const found = users.find (user => user.id === parseInt(req.params.id))
    if(!found) {
        res.status(404).send(`user with ID :${req.params.id} not found`)
        return;
    }
    res.status(200).json(found) 
});

customerRouter.post('/customers/signup', (req, res) => {

    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        birthYear:  Joi.number().integer().min(1990).required(),
        country: Joi.string().required(),
    })

    const result = schema.validate(req.body)

    if (result.errors) {
        res.status(400).send(result.error.details[0].message)
        return
    }

    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        birthYear: req.body.birthYear,
        country: req.body.country,
    }

    const getAge = (birthYear) => {
        return newUser.age = new Date().getFullYear() - birthYear

    }

    // console.log(getAge(newUser.birthYear));

    delete newUser.birthYear

    users.push(newUser)

    res.status(201).json(newUser)

})

customerRouter.put('/customers/:id', (req, res) => {
    const found = users.find( user => user.id === parseInt(req.params.id))

    if(!found) {
        res.status(404).send(`user with ID :${req.params.id} not found`)
        return;
    }

    const schema = Joi.object({
        name: Joi.string().required(),
        email:Joi.string().email().required(),
        birthYear: Joi.number().integer().min(1990).required(),
        country: Joi.string().required(),
    })

    const result = schema.validate(req.body);

    if (result.error) {
        res.status(404).send(result.error.details[0].message)
        return;
    }

    const updateUser = {
        id: users.length  + 1,
        name: req.params.name,
        email: req.params.email,
        birthYear: req.params.birthYear,
        country: req.params.country,
    }

    const getAge = (birthYear) => {
        return updateUser.age = new Date ().getFullYear() - birthYear
    }

    console.log(getAge(updateUser.birthYear));

    const targetIndex = users.indexOf(found)
    console.log(targetIndex);
    
    delete updateUser.birthYear

    users.splice(targetIndex, 1, updateUser)

    res.status(200).json(updateUser)
});

customerRouter.delete('/movies/:id', (req, res) => {

    const found = users.find(user => user.id === parseInt (req.params.id))

    if (!found) {
        res.status(404).send(`User with ID ${req.params.id} not found`)
        return
    }

    const targetIndex = users.indexOf(found)
    users.splice(targetIndex, 1)
    res.status(200).end(`User with ID ${req.params.id} successfully deleted`)
    
})

module.exports = customerRouter;
