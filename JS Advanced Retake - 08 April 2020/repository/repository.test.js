let { expect } = require('chai');
let { Repository } = require("./repository.js");

describe('Repository checker', () => {

    describe('Count checker', () => {
        it('length is 0', () => {
            let repo = new Repository({ name: "string", age: "number", birthday: "object" });

            expect(repo.count).to.equal(0);
        })

        it('length above 0', () => {
            let repo = new Repository({ name: "string", age: "number", birthday: "object" });
            repo.add({ name: "Pesho", age: 22, birthday: new Date(1998, 0, 7) });

            expect(repo.count).to.equal(1);
        })
    })

    describe('Add checker', () => {
        it('property name is missing', () => {
            let repo = new Repository({ name: "string", age: "number", birthday: "object" });

            expect(() => repo.add({ name: "Pesho", age: 22 })).to.throw('Property birthday is missing from the entity!');
        })

        it('property type is incorrect', () => {
            let repo = new Repository({ name: "string", age: "number", birthday: "object" });

            expect(() => repo.add({ name: "Pesho", age: "22", birthday: new Date(1998, 0, 7) })).to.throw('Property age is not of correct type!');
        })

        it('successfull add', () => {
            let repo = new Repository({ name: "string", age: "number", birthday: "object" });

            expect(repo.add({ name: "Pesho", age: 22, birthday: new Date(1998, 0, 7) })).to.equal(0);
        })
    })

    describe('getId checker', () => {
        it('id does not exist', () => {
            let repo = new Repository({ name: "string", age: "number", birthday: "object" });

            expect(() => repo.getId(0)).to.throw('Entity with id: 0 does not exist!')
        })

        it('id is -1', () => {
            let repo = new Repository({ name: "string", age: "number", birthday: "object" });

            expect(() => repo.getId(-1)).to.throw('Entity with id: -1 does not exist!')
        })

        it('id exists', () => {
            let repo = new Repository({ name: "string", age: "number", birthday: "object" });
            repo.add({ name: "Pesho", age: 22, birthday: new Date(1998, 0, 7) });

            expect(repo.getId(0)).to.eql({ name: "Pesho", age: 22, birthday: new Date(1998, 0, 7) });
        })
    })

    describe('update checker', () => {
        it('id does not exist', () => {
            let repo = new Repository({ name: "string", age: "number", birthday: "object" });

            expect(() => repo.update(1, { name: 'Gosho', age: 22, birthday: new Date(1998, 0, 7) })).to.throw('Entity with id: 1 does not exist!')
        })

        it('id is -1', () => {
            let repo = new Repository({ name: "string", age: "number", birthday: "object" });

            expect(() => repo.update(-1, { name: 'Gosho', age: 22, birthday: new Date(1998, 0, 7) })).to.throw('Entity with id: -1 does not exist!')
        })

        it('property name is missing', () => {
            let repo = new Repository({ name: "string", age: "number", birthday: "object" });
            repo.add({ name: "Pesho", age: 22, birthday: new Date(1998, 0, 7) });

            expect(() => repo.update(0, { name: 'Gosho', age: 22 })).to.throw('Property birthday is missing from the entity!');
        })

        it('property type is incorrect', () => {
            let repo = new Repository({ name: "string", age: "number", birthday: "object" });
            repo.add({ name: "Pesho", age: 22, birthday: new Date(1998, 0, 7) });

            expect(() => repo.update(0, { name: 'Gosho', age: '22', birthday: new Date(1998, 0, 7) })).to.throw('Property age is not of correct type!');
        })

        it('successful update', () => {
            let repo = new Repository({ name: "string", age: "number", birthday: "object" });
            repo.add({ name: "Pesho", age: 22, birthday: new Date(1998, 0, 7) });
            repo.update(0, { name: 'Gosho', age: 22, birthday: new Date(1998, 0, 7) });

            expect(repo.getId(0)).to.eql({ name: 'Gosho', age: 22, birthday: new Date(1998, 0, 7) });
        })
    })

    describe('del checker', () => {
        it('id does not exist', () => {
            let repo = new Repository({ name: "string", age: "number", birthday: "object" });

            expect(() => repo.del(1, { name: 'Gosho', age: 22, birthday: new Date(1998, 0, 7) })).to.throw('Entity with id: 1 does not exist!')
        })

        it('id is -1', () => {
            let repo = new Repository({ name: "string", age: "number", birthday: "object" });

            expect(() => repo.del(-1, { name: 'Gosho', age: 22, birthday: new Date(1998, 0, 7) })).to.throw('Entity with id: -1 does not exist!')
        })

        it('id exists', () => {
            let repo = new Repository({ name: "string", age: "number", birthday: "object" });
            repo.add({ name: "Pesho", age: 22, birthday: new Date(1998, 0, 7) });
            repo.add({ name: "Pesho", age: 22, birthday: new Date(1998, 0, 7) });
            repo.del(1);

            expect(() => repo.getId(1)).to.throw('Entity with id: 1 does not exist!');
        })
    })

})