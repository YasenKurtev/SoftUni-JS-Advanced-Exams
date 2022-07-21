let { expect } = require('chai');
let { cinema } = require('./cinema');

describe('cinema checker', () => {

    describe('showMovies checker', () => {
        it('empty array', () => {
            expect(cinema.showMovies([])).to.equal('There are currently no movies to show.');
        })

        it('correct array', () => {
            expect(cinema.showMovies(['King Kong', 'Joker', 'The Tomorrow War'])).to.equal('King Kong, Joker, The Tomorrow War');
        })
    })

    describe('ticketPrice checker', () => {
        it('correct projection', () => {
            expect(cinema.ticketPrice('Premiere')).to.equal(12.00);
        })

        it('correct projection', () => {
            expect(cinema.ticketPrice('Normal')).to.equal(7.50);
        })

        it('incorrect projection', () => {
            expect(() => cinema.ticketPrice('Student')).to.throw('Invalid projection type.');
        })
    })

    describe('swapSeatsInHall checker', () => {
        it('invalid input', () => {
            expect(cinema.swapSeatsInHall(1)).to.equal('Unsuccessful change of seats in the hall.');
        })

        it('invalid input', () => {
            expect(cinema.swapSeatsInHall(1, 'string')).to.equal('Unsuccessful change of seats in the hall.');
        })

        it('invalid input', () => {
            expect(cinema.swapSeatsInHall('string', 1)).to.equal('Unsuccessful change of seats in the hall.');
        })

        it('invalid input', () => {
            expect(cinema.swapSeatsInHall(1, 21)).to.equal('Unsuccessful change of seats in the hall.');
        })

        it('invalid input', () => {
            expect(cinema.swapSeatsInHall(21, 1)).to.equal('Unsuccessful change of seats in the hall.');
        })

        it('invalid input', () => {
            expect(cinema.swapSeatsInHall(0, 1)).to.equal('Unsuccessful change of seats in the hall.');
        })

        it('invalid input', () => {
            expect(cinema.swapSeatsInHall(1, 0)).to.equal('Unsuccessful change of seats in the hall.');
        })

        it('invalid input', () => {
            expect(cinema.swapSeatsInHall(-1, 1)).to.equal('Unsuccessful change of seats in the hall.');
        })

        it('invalid input', () => {
            expect(cinema.swapSeatsInHall(1, -1)).to.equal('Unsuccessful change of seats in the hall.');
        })

        it('correct input', () => {
            expect(cinema.swapSeatsInHall(1, 20)).to.equal('Successful change of seats in the hall.');
        })
    })
})