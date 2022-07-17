function solve() {

    class LibraryCollection {
        constructor(capcity) {
            this.capcity = Number(capcity);
            this.books = [];
        }

        addBook(bookName, bookAuthor) {
            if (this.capcity <= 0) {
                throw new Error('Not enough space in the collection.');
            }

            this.books.push({
                bookName: bookName,
                bookAuthor: bookAuthor,
                payed: false
            })

            this.capcity--;

            return `The ${bookName}, with an author ${bookAuthor}, collect.`
        }

        payBook(bookName) {
            let isFound = false;
            let isPaid = true;
            let index;

            for (let i = 0; i < this.books.length; i++) {
                index = i;
                if (this.books[i]['bookName'] === bookName) {
                    isFound = true;
                    if (this.books[i]['payed'] === false) {
                        isPaid = false;
                    }
                    break;
                }
            }

            if (isFound === false) {
                throw new Error(`${bookName} is not in the collection.`);
            }

            if (isPaid === true) {
                throw new Error(`${bookName} has already been paid.`);
            }

            this.books[index]['payed'] = true;

            return `${bookName} has been successfully paid.`
        }

        removeBook(bookName) {
            let isFound = false;
            let isPaid = true;
            let index;

            for (let i = 0; i < this.books.length; i++) {
                index = i;
                if (this.books[i]['bookName'] === bookName) {
                    isFound = true;
                    if (this.books[i]['payed'] === false) {
                        isPaid = false;
                    }
                    break;
                }
            }

            if (isFound === false) {
                throw new Error('The book, you\'re looking for, is not found.');
            }

            if (isPaid === false) {
                throw new Error(`${bookName} need to be paid before removing from the collection.`);
            }

            this.books.splice(index, 1);

            this.capcity++;

            return `${bookName} remove from the collection.`
        }

        getStatistics(bookAuthor) {
            if (bookAuthor == undefined) {
                let result = [`The book collection has ${this.capcity} empty spots left.`];
                let sortedBooks = this.books.sort((a, b) => a['bookName'].localeCompare(b['bookName']));

                for (let book of sortedBooks) {
                    let paid;
                    if (book['payed'] === true) {
                        paid = 'Has Paid';
                    } else {
                        paid = 'Not Paid';
                    }
                    result.push(`${book['bookName']} == ${book['bookAuthor']} - ${paid}.`);
                }

                return result.join('\n');
            } else {
                let isFound = false;
                let index;
                let paid;

                for (let i = 0; i < this.books.length; i++) {
                    if (this.books[i]['bookAuthor'] === bookAuthor) {
                        index = i;
                        isFound = true;
                        if (this.books[i]['payed'] === true) {
                            paid = 'Has Paid';
                        } else {
                            paid = 'Not Paid';
                        }
                        break;
                    }
                }

                if (isFound === false) {
                    throw new Error(`${bookAuthor} is not in the collection.`);
                }

                return `${this.books[index]['bookName']} == ${this.books[index]['bookAuthor']} - ${paid}.`;
            }
        }

    }

    const library = new LibraryCollection(2)
    library.addBook('In Search of Lost Time', 'Marcel Proust');
    library.addBook('Don Quixote', 'Miguel de Cervantes');
    library.payBook('Don Quixote');
    console.log(library.removeBook('Don Quixote'));
    console.log(library.removeBook('In Search of Lost Time'));

}

solve();