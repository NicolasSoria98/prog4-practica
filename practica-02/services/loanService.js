const repository = require('../repositories/loansRepository')
const repositoryUsers = require('../repositories/usersRepository')
const repositoryBooks = require('../repositories/librosRepository')

async function createLoan(data) {
    const libro = await repositoryBooks.getBookById(data.bookId)
    const user = await repositoryUsers.getUserById(data.userId)
    if(!libro) {
        throw new Error ('libro no encontrado')
    }
    if(!user) {
        throw new Error ('usuario no encontrado')
    }
    if(libro.availableCopies <= 0) {
        throw new Error ('libro sin copias disponibles')
    }
    if(user.isActive === false) {
        throw new Error ('usuario no activo')
    }

    const loan = {
        userId: data.userId,
        bookId: data.bookId,
        loanDate: new Date().toISOString(),
        dueDate: new Date().toISOString(),
        returnDate: null,
        status: 'active'
    }

    const AllLoans = await repository.getAllLoans()
    loan.id = AllLoans.length > 0
    ? Math.max(... AllLoans.map(l => l.id)) + 1
    : 1

    await repositoryBooks.updateBook(data.bookId, {
        availableCopies: libro.availableCopies -1
    })
    await repositoryUsers.updateUser(data.bookId, {
        booksCurrentlyBorrowed: user.booksCurrentlyBorrowed +1,
        totalBooksBorrowed: user.totalBooksBorrowed + 1
    })
    return await repository.createLoan(loan)
}

async function getAllLoans(filters={}){
    let loans = await repository.getAllLoans()
    if (filters.bookId) {
        const bookId = parseInt(filters.bookId)
        loans = loans.filter(l => l.bookId === bookId)
    }
    if(filters.userId) {
        const userId = parseInt(filters.userId)
        loans = loans.filter(l => l.userId === userId)
    }
    return loans
}

async function getLoanById(id) {
    const loan = await repository.getLoanById(id)
    if(!loan) {
        throw new Error('no encontrado')
    }
    return loan
}

module.exports =  {
    getAllLoans,
    getLoanById,
    createLoan
}