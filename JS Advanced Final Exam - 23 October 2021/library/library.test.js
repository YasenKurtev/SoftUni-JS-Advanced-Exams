let { expext, expect } = require('chai');
let { library } = require('./library');

describe('library Checker', () => {

    describe('calcPriceOfBook Checker', () => {
        it('invalid input', () => {
            expect(() => library.calcPriceOfBook(1, 1)).to.throw('Invalid input');
        })

        it('invalid input', () => {
            expect(() => library.calcPriceOfBook('string', 'string')).to.throw('Invalid input');
        })

        it('price less than 1980', () => {
            expect(library.calcPriceOfBook('Harry Potter', 1979)).to.equal('Price of Harry Potter is 10.00');
        })

        it('price equal to 1980', () => {
            expect(library.calcPriceOfBook('Harry Potter', 1980)).to.equal('Price of Harry Potter is 10.00');
        })

        it('price above 1980', () => {
            expect(library.calcPriceOfBook('Harry Potter', 1981)).to.equal('Price of Harry Potter is 20.00');
        })
    })

    describe('findBook Checker', () => {
        it('array length is 0', () => {
            expect(() => library.findBook([], 'Troy')).to.throw('No books currently available');
        })

        it('book found', () => {
            expect(library.findBook(["Troy", "Life Style", "Torronto"], 'Troy')).to.equal('We found the book you want.');
        })

        it('price above 1980', () => {
            expect(library.findBook(["Troy", "Life Style", "Torronto"], 'Harry Potter')).to.equal('The book you are looking for is not here!');
        })
    })

    describe('arrangeTheBooks Checker', () => {
        it('invalid input', () => {
            expect(() => library.arrangeTheBooks('string')).to.throw('Invalid input');
        })

        it('invalid input', () => {
            expect(() => library.arrangeTheBooks(-1)).to.throw('Invalid input');
        })

        it('books arranged', () => {
            expect(library.arrangeTheBooks(39)).to.equal('Great job, the books are arranged.');
        })

        it('books arranged', () => {
            expect(library.arrangeTheBooks(40)).to.equal('Great job, the books are arranged.');
        })

        it('books not arranged', () => {
            expect(library.arrangeTheBooks(41)).to.equal('Insufficient space, more shelves need to be purchased.');
        })
    })
})