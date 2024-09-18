const Book = require('./book');
const Author = require('./author');
const User = require('./user');

//Define the relationship
Book.belongsTo(Author);
Author.hasMany(Book);

module.exports = {
    Book,
    Author, 
    User
};