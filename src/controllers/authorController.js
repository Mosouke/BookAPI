
const { Author} = require('../models');

exports.createAuthor = async (req, res, next) => {
    try {
        // req.body > get the dta from the request (from the form on the frontend)
        const author = await Author.create(req.body);
        res.status(201).json(author);
    } catch (err){
        next(err);
    }
}

exports.getAllAuthors = async (req, res, next) => {
    try {
        // SELECT * FROM authors
        const authors = await Author.findAll();
        res.status(200).json(authors);
    } catch (err){
        next(err);
    }
}

exports.deleteAuthor = async (req, res, next) => {
    try {
        const author = await Author.findByPk(req.params.id);
        const destroyAuthor = await Author.destroy({ where: { id: author.id } });
        res.status(200).json(destroyAuthor);
    }catch (err){
        next(err);
    }
}

exports.updateAuthor = async (req, res, next) => {
    try {
        const author = await Author.findByPk(req.params.id);
        const updateAuthor = await Author.update(req.body, { where: { id: author.id } });
        res.status(200).json(updateAuthor);
    }catch (err){
        next(err);
    }
}

exports.getAuthor = async (req, res, next) => {
    try {
        const author = await Author.findByPk(req.params.id);
        res.status(200).json(author);
    } catch (err){
        next(err);
    }
}   