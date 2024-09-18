const { Book, Author } = require('../models');

exports.createBook = async (req, res, next) => {
    try {
        // req.body > get the data from the request (from the form on the frontend)
        const author = await Author.findByPk(req.body.authorId);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        const book = await Book.create({ ...req.body, AuthorId: author.id });
        res.status(201).json(book);
    } catch (err){
        next(err);
    }
}

exports.getAllBooks = async (req, res, next) => {
    try {
        // SELECT * FROM books LEFT JOIN authors ON books.authorId = authors.id
        const books = await Book.findAll({
            include: [{ model: Author, as: 'Author' }]
        });

        res.status(200).json(books);
    } catch (err){
        next(err);
    }
}

exports.deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findByPk(req.params.id);
        const destroyBook = await Book.destroy({ where: { id: book.id } });
        res.status(200).json(destroyBook);
    }catch (err){
        next(err);
    }
}

exports.updateBook = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        const { authorId, ...bookData } = req.body;
        
        // Vérifiez si le livre existe
        const book = await Book.findByPk(bookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        // Vérifiez si l'auteur existe
        if (authorId) {
            const author = await Author.findByPk(authorId);
            if (!author) {
                return res.status(404).json({ message: "Author not found" });
            }
        }

        // Mettez à jour le livre
        await book.update({ ...bookData, AuthorId: authorId });

        // Récupérez le livre mis à jour avec les informations de l'auteur
        const updatedBook = await Book.findByPk(bookId, {
            include: [{ model: Author, as: 'Author' }]
        });

        res.status(200).json(updatedBook);
    } catch (err) {
        next(err);
    }
}

exports.getBook = async (req, res, next) => {
    try {
        const book = await Book.findByPk(req.params.id);
        res.status(200).json(book);
    }catch (err) {
        next(err);
    }
}

exports.updateBookWithAuthorId = async (req, res, next) => {
    try {
        // Cherche le livre par son id
        const book = await Book.findByPk(req.params.id);
        console.log(book);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Cherche l'auteur par son id
        const author = await Author.findByPk(req.body.id);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }

        // Mise à jour du livre avec l'ID de l'auteur
        const update = await Book.update(
            { AuthorId: author.id }, 
            { where: { id: book.id } }
        );

        // Vérifie si la mise à jour a bien eu lieu
        if (update[0] === 0) {
            return res.status(400).json({ message: 'Update failed' });
        }

        // Retourne un succès si tout s'est bien passé
        res.status(200).json({ message: 'Book updated successfully' });
    } catch (err) {
        next(err); // Gestion des erreurs
    }
};