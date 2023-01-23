const express = require('express');
const Joi = require('joi');

const movieRouter = express.Router();

const movieGenres = [
    {id: 1, name: "Action"}, {id: 2, name: "Horror"}, {id: 3, name: "Romance"}, {id: 4, name: "Comedy"}, {id: 5, name: "Drama"}, {id: 6, name: "Fantasy"}, {id: 7, name: "Crime"}, {id: 8, name: "Sports"}, {id: 9, name: "Western"}, {id: 10, name: "Mystery"}, {id: 11, name: "Thriller"}, {id: 12, name: "Sci-Fi"}, {id: 13, name: "War"}, {id: 14, name: "Animation"}
]

movieRouter.get('/movies', (req, res) => {
    res.status(200).json(movieGenres)
});

movieRouter.get('/movies/:id', (req, res) => {
    const found = movieGenres.find( genre => genre.id === parseInt(req.params.id))
    if(!found){
        res.status(404).json( `movie genre with ID :${req.params.id} not found`)
        return
    }
    res.status(200).json(found)
      
});

movieRouter.get('/movies/:name', (req, res) => {
    const found = moviesGenres.find(genre => genre.name.toLowerCase() === req.params.name.toLowerCase())

    if(!found) {
        res.status(404).json(`movies genre with name :${req.params.name} was not found`)
        return
    }
        res.status(200).json(found)
    });

movieRouter.post('/movies', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    const result = schema.validate(req.body)

    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return
    }

    const newGenre = {
        id: movieGenres.length + 1,
        name: req.body.name
    }

    movieGenres.push(newGenre)
    res.status(201).json(newGenre)
});

movieRouter.put('/movies/:id', (req, res) => {
    const found = movieGenres.find ( genre => genre.id === (req.params.id))

    if(!found) {
        res.status(404).send(`movies genre with ID :${req.params.id} was not found`)
        return
    }

    const schema = Joi.object({
        name: Joi.strings().min(3).required()
    })

    const result = schema.validate(req.body)

    if(result.error) {
        res.status(400).json(result.error.details[0].message)
        return
    }

    found.name = req.body.name
    res.send(found)
})
movieRouter.delete('/movies/:id', (req, res) => {
    const found = movieGenres.find(genre => genre.id === parseInt(req.params.id))

    if (found) {
        const indexCheck = movieGenres.indexOf(found)
        movieGenres.splice(indexCheck, 1)
        res.status(200).send(`Movie genre with ID ${req.params.id} successfully deleted`)
        return
    } 
        res.status(404).send(`Movie genre with ID ${req.params.id} not found`)
})


module.exports = movieRouter;