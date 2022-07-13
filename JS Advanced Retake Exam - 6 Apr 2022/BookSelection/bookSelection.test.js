let { expect } = require('chai');
let { bookSelection } = require('./bookSelection');

describe('bookSelection Checker', () => {
    describe('isGenreSuitable Checker', () => {
        it('is not suitable', () => {
            expect(bookSelection.isGenreSuitable('Thriller', 11)).to.equal(`Books with Thriller genre are not suitable for kids at 11 age`);
        })

        it('is not suitable', () => {
            expect(bookSelection.isGenreSuitable('Horror', 11)).to.equal(`Books with Horror genre are not suitable for kids at 11 age`);
        })

        it('is not suitable', () => {
            expect(bookSelection.isGenreSuitable('Thriller', 12)).to.equal(`Books with Thriller genre are not suitable for kids at 12 age`);
        })

        it('is not suitable', () => {
            expect(bookSelection.isGenreSuitable('Horror', 12)).to.equal(`Books with Horror genre are not suitable for kids at 12 age`);
        })

        it('is suitable', () => {
            expect(bookSelection.isGenreSuitable('Thriller', 13)).to.equal(`Those books are suitable`);
        })

        it('is suitable', () => {
            expect(bookSelection.isGenreSuitable('Horror', 13)).to.equal(`Those books are suitable`);
        })
    })

    describe('isItAffordable Checker', () => {
        it('input not a number', () => {
            expect(() => bookSelection.isItAffordable('string', 1)).to.throw('Invalid input');
        })

        it('input not a number', () => {
            expect(() => bookSelection.isItAffordable(1, 'string')).to.throw('Invalid input');
        })

        it('not enough budget', () => {
            expect(bookSelection.isItAffordable(2, 1)).to.equal('You don\'t have enough money');
        })

        it('enough budget', () => {
            expect(bookSelection.isItAffordable(1, 1)).to.equal('Book bought. You have 0$ left');
        })

        it('enough budget', () => {
            expect(bookSelection.isItAffordable(1, 2)).to.equal('Book bought. You have 1$ left');
        })
    })

    describe('suitableBooks Checker', () => {
        it('invalid input', () => {
            expect(() => bookSelection.suitableTitles(1, 'Horror')).to.throw('Invalid input');
        })

        it('invalid input', () => {
            expect(() => bookSelection.suitableTitles([], 1)).to.throw('Invalid input');
        })

        it('result check', () => {
            expect(bookSelection.suitableTitles([{ title: "The Da Vinci Code", genre: "Thriller" }], 'Thriller')).to.eql(['The Da Vinci Code']);
        })
    })
})