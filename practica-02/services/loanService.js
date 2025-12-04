const repository = require('../repositories/loansRepository')
const repositoryUsers = require('../repositories/usersRepository')
const repositoryBooks = require('../repositories/librosRepository')

async function createLoan(data) {
    const libro = await repositoryBooks.getBookById(loan.bookId)
    const user = await repositoryUsers.getUserById(loan.userId)
    if(!libro) {
        throw new Error ('libro no encontrado')
    }
    if(!user) {
        throw new Error ('usuario no encontrado')
    }
    if(!libro.availableCopies > 0) {
        throw new Error ('libro sin copias disponibles')
    }
    if(user.isActive !== false) {
        throw new Error ('usuario no activo')
    }

    const loan = {
        userId: loan.userId,
        bookId: loan.bookId,
        loanDate: new Date().toISOString(),
        dueDate: new Date().toISOString(),
        returnDate: null,
        status: active
    }
    const AllLoans = await repository.getAllLoans()
    loan.id = AllLoans.length() > 0
    ? Math.max(... AllLoans.map(l => l.id)) + 1
    : 1
    return await repository.createLoan(loan)
}