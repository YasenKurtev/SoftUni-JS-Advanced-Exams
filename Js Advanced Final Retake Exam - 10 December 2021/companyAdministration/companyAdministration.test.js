let { expect } = require('chai');
let { companyAdministration } = require('./companyAdministration');

describe('companyAdministration Checker', () => {

    describe('hiringEmployee Checker', () => {
        it('position not Programmer', () => {
            expect(() => companyAdministration.hiringEmployee('name', 'Manager', 1)).to.throw('We are not looking for workers for this position.');
        })

        it('experience equal to 3', () => {
            expect(companyAdministration.hiringEmployee('Yasen', 'Programmer', 3)).to.equal('Yasen was successfully hired for the position Programmer.');
        })

        it('experience greater than 3', () => {
            expect(companyAdministration.hiringEmployee('Yasen', 'Programmer', 4)).to.equal('Yasen was successfully hired for the position Programmer.');
        })

        it('experience less than 3', () => {
            expect(companyAdministration.hiringEmployee('Yasen', 'Programmer', 2)).to.equal('Yasen is not approved for this position.');
        })
    })

    describe('calculateSalary Checker', () => {
        it('invalid input', () => {
            expect(() => companyAdministration.calculateSalary('string')).to.throw('Invalid hours');
        })

        it('invalid input', () => {
            expect(() => companyAdministration.calculateSalary(-1)).to.throw('Invalid hours');
        })

        it('input below 160', () => {
            expect(companyAdministration.calculateSalary(159)).to.equal(2385);
        })

        it('input 160', () => {
            expect(companyAdministration.calculateSalary(160)).to.equal(2400);
        })

        it('input above 160', () => {
            expect(companyAdministration.calculateSalary(161)).to.equal(3415);
        })
    })

    describe('firedEmployee Checker', () => {
        it('invalid input', () => {
            expect(() => companyAdministration.firedEmployee(1, 1)).to.throw('Invalid input');
        })

        it('invalid input', () => {
            expect(() => companyAdministration.firedEmployee(["Petar", "Ivan", "George"], 'string')).to.throw('Invalid input');
        })

        it('invalid input', () => {
            expect(() => companyAdministration.firedEmployee(["Petar", "Ivan", "George"], 3)).to.throw('Invalid input');
        })

        it('invalid input', () => {
            expect(() => companyAdministration.firedEmployee(["Petar", "Ivan", "George"], -1)).to.throw('Invalid input');
        })

        it('correct input', () => {
            expect(companyAdministration.firedEmployee(["Petar", "Ivan", "George"], 1)).to.equal('Petar, George');
        })

        it('correct input', () => {
            expect(companyAdministration.firedEmployee(["Petar"], 0)).to.equal('');
        })
    })

})