let { expect } = require('chai');
let { ChristmasMovies } = require('./christmasMovies');

describe('ChristmasMovies checker', () => {

    describe('buyMovie checker', () => {
        it('return movie', () => {
            let christmas = new ChristmasMovies();

            expect(christmas.buyMovie('Last Christmas', ['Madison Ingoldsby', 'Emma Thompson', 'Boris Isakovic', 'Madison Ingoldsby']))
                .to.equal('You just got Last Christmas to your collection in which Madison Ingoldsby, Emma Thompson, Boris Isakovic are taking part!');
        })

        it('return error', () => {
            let christmas = new ChristmasMovies();
            christmas.buyMovie('Home Alone', ['Macaulay Culkin', 'Joe Pesci', 'Daniel Stern']);

            expect(() => christmas.buyMovie('Home Alone', ['Macaulay Culkin', 'Joe Pesci', 'Daniel Stern']))
                .to.throw('You already own Home Alone in your collection!');
        })
    })

    describe('discardMovie checker', () => {
        it('discard movie from collection and watched', () => {
            let christmas = new ChristmasMovies();
            christmas.buyMovie('Home Alone', ['Macaulay Culkin', 'Joe Pesci', 'Daniel Stern']);
            christmas.watchMovie('Home Alone');

            expect(christmas.discardMovie('Home Alone')).to.equal('You just threw away Home Alone!');
        })

        it('movie is not watched error', () => {
            let christmas = new ChristmasMovies();
            christmas.buyMovie('Home Alone', ['Macaulay Culkin', 'Joe Pesci', 'Daniel Stern']);

            expect(() => christmas.discardMovie('Home Alone')).to.throw('Home Alone is not watched!');
        })

        it('movie is not in collection error', () => {
            let christmas = new ChristmasMovies();

            expect(() => christmas.discardMovie('Home Alone')).to.throw('Home Alone is not at your collection!');
        })
    })

    describe('watchMovie checker', () => {
        it('no movie in collection error', () => {
            let christmas = new ChristmasMovies();

            expect(() => christmas.watchMovie('Home Alone')).to.throw('No such movie in your collection!');
        })
    })

    describe('favoriteMovie checker', () => {
        it('no movies watched', () => {
            let christmas = new ChristmasMovies();

            expect(() => christmas.favouriteMovie()).to.throw('You have not watched a movie yet this year!');
        })

        it('favorite movie result', () => {
            let christmas = new ChristmasMovies();
            christmas.buyMovie('Home Alone', ['Macaulay Culkin', 'Joe Pesci', 'Daniel Stern']);
            christmas.buyMovie('Home Alone 2', ['Macaulay Culkin']);
            christmas.watchMovie('Home Alone');
            christmas.watchMovie('Home Alone');
            christmas.watchMovie('Home Alone 2');

            expect(christmas.favouriteMovie()).to.equal('Your favourite movie is Home Alone and you have watched it 2 times!');
        })
    })

    describe('mostStarredActor checker', () => {
        it('no movie in collection error', () => {
            let christmas = new ChristmasMovies();

            expect(() => christmas.mostStarredActor()).to.throw('You have not watched a movie yet this year!');
        })

        it('most starred actor result', () => {
            let christmas = new ChristmasMovies();
            christmas.buyMovie('Home Alone', ['Macaulay Culkin', 'Joe Pesci', 'Daniel Stern']);
            christmas.buyMovie('Home Alone 2', ['Macaulay Culkin']);
            christmas.buyMovie('The Grinch', ['Benedict Cumberbatch', 'Rashida Jones']);

            expect(christmas.mostStarredActor()).to.equal('The most starred actor is Macaulay Culkin and starred in 2 movies!');
        })
    })
})