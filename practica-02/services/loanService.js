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
    const maxBooks = user.membershipType === 'basic' ? 3 : 5
    if (user.booksCurrentlyBorrowed >= maxBooks) {
        throw new Error(`Has alcanzado el límite de ${maxBooks} libros para tu membresía ${user.membershipType}`)
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
    await repositoryUsers.updateUser(data.userId, {
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
    if (filters.status) {
    loans = loans.filter(l => l.status === filters.status)
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

async function returnLoan(id) {
    const loan = await repository.getLoanById(id)
    if (!loan) {
        throw new Error('Préstamo no encontrado')
    }
    
    if (loan.status === 'returned') {
        throw new Error('Este préstamo ya fue devuelto')
    }
    
    if (loan.status !== 'active' && loan.status !== 'overdue') {
        throw new Error('Solo se pueden devolver préstamos activos o vencidos')
    }
    
    const libro = await repositoryBooks.getBookById(loan.bookId)
    const user = await repositoryUsers.getUserById(loan.userId)
    
    if (!libro) {
        throw new Error('Libro no encontrado')
    }
    
    if (!user) {
        throw new Error('Usuario no encontrado')
    }

    const updates = {
        returnDate: new Date().toISOString(),
        status: 'returned'
    }
    
    await repositoryBooks.updateBook(loan.bookId, {
        availableCopies: libro.availableCopies + 1
    })
    
    await repositoryUsers.updateUser(loan.userId, {
        booksCurrentlyBorrowed: user.booksCurrentlyBorrowed - 1
    })
    
    return await repository.updateLoan(id, updates)
}

module.exports =  {
    getAllLoans,
    getLoanById,
    createLoan,
    returnLoan
}