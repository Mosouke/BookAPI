const Book = require('./book');
const Author = require('./author');

// Define the relationships
Book.belongsTo(Author);
Author.hasMany(Book);

module.exports = {
    Book,
    Author
};