const repository = require('../repositories/librosRepository');

const generosValidos = ["Ficción", "No ficción", "Historia", "Ciencia", "Arte"]

function validateBook(book) {
    if(!book.author || !book.title) {
        throw new Error('autor y titulo obligatorios')
    }
    if(book.publishedYear < 1800 || book.publishedYear > 2025) {
        throw new Error ('año no valido')
    }
    if(!generosValidos.includes(book.category)) {
        throw new Error(`genero no valido, debe ser: ${generosValidos.join(', ')}`)
    }
}

async function getAllBooks(filters ={}) {
    let AllBooks = await repository.getAllBooks();
    if (filters.available === 'true') {
        AllBooks = AllBooks.filter(b => b.availableCopies > 0)
    }
    if(filters.category) {
        AllBooks = AllBooks.filter(b =>
            b.category.toLowerCase() === filters.category.toLowerCase()
        );
    }
    if(filters.author !== undefined) {
        AllBooks = AllBooks.filter(b =>
            b.author.toLowerCase().includes(filters.author.toLowerCase())
        );
    }
    return AllBooks;
}

async function getBookById(id) {
    const book= await repository.getBookById(id);
    if(!book) {
        throw new Error ('libro no encontrado')
    }
    return book;
}

async function createBook(data) {
        if (data.availableCopies < 0) {
        throw new Error('Las copias disponibles no pueden ser negativas')
    }

    if (data.totalCopies < 1) {
        throw new Error('Debe haber al menos 1 copia total')
    }

    if (data.availableCopies > data.totalCopies) {
        throw new Error('Las copias disponibles no pueden superar las copias totales')
    }
    const allBooks = await repository.getAllBooks();
    const isbnExists = allBooks.some(b => b.isbn === data.isbn);
    if(isbnExists) {
        throw new Error('ya existe ese ISBN pa')
    }
    const book = {
        title: data.title,
        author: data.author,
        isbn: data.isbn,
        category: data.category,
        availableCopies: data.availableCopies,
        totalCopies: data.totalCopies,
        publishedYear: data.publishedYear
    }
    validateBook(book)
    book.id = allBooks.length > 0
    ? Math.max(...allBooks.map(b => b.id)) +1
    : 1;
    return await repository.createBook(book)
}

async function updateBook(id, updates) {
    const exists = await repository.getBookById(id);
    if(!exists) {
        throw new Error ('no encontrado')
    }
    return await repository.updateBook(id, updates);
}

async function deleteBook(id) {
    const eliminado = await repository.deleteBook(id)
    if(!eliminado) {
        throw new Error ('no encontrado')
    }
    return eliminado
}

//falta devolver y prestar

module.exports =  {
    deleteBook,
    createBook,
    getAllBooks,
    getBookById,
    updateBook
}

