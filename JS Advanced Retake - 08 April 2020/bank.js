class Bank {

    constructor(bankName) {
        this._bankName = bankName;
        this.allCustomers = [];
    }

    newCustomer(customer) {
        let isFound = false;
        for (let element of this.allCustomers) {
            if (element['personalId'] === customer['personalId']) {
                isFound = true;
                break;
            }
        }

        if (isFound === true) {
            throw new Error(`${customer['firstName']} ${customer['lastName']} is already our customer!`);
        }

        this.allCustomers.push({
            firstName: customer['firstName'],
            lastName: customer['lastName'],
            personalId: customer['personalId'],
            transactions: []
        });
        return customer;
    }

    depositMoney(personalId, amount) {
        let isFound = false;
        let index;
        for (let element of this.allCustomers) {
            if (element['personalId'] === Number(personalId)) {
                index = this.allCustomers.indexOf(element);
                isFound = true;
                break;
            }
        }

        if (isFound === false) {
            throw new Error('We have no customer with this ID!');
        }

        if (this.allCustomers[index].hasOwnProperty('totalMoney')) {
            this.allCustomers[index]['totalMoney'] += Number(amount);
        } else {
            this.allCustomers[index]['totalMoney'] = Number(amount);
        }

        let transactionNumber = this.allCustomers[index]['transactions'].length + 1;

        this.allCustomers[index]['transactions'].unshift(`${transactionNumber}. ${this.allCustomers[index]['firstName']} ${this.allCustomers[index]['lastName']} made deposit of ${amount}$!`);

        return `${this.allCustomers[index]['totalMoney']}$`;
    }

    withdrawMoney(personalId, amount) {
        let isFound = false;
        let index;
        for (let element of this.allCustomers) {
            if (element['personalId'] === Number(personalId)) {
                index = this.allCustomers.indexOf(element);
                isFound = true;
                break;
            }
        }

        if (isFound === false) {
            throw new Error('We have no customer with this ID!');
        }

        if (this.allCustomers[index]['totalMoney'] < Number(amount)) {
            throw new Error(`${this.allCustomers[index]['firstName']} ${this.allCustomers[index]['lastName']} does not have enough money to withdraw that amount!`);
        } else {
            this.allCustomers[index]['totalMoney'] -= Number(amount);
            let transactionNumber = this.allCustomers[index]['transactions'].length + 1;

            this.allCustomers[index]['transactions'].unshift(`${transactionNumber}. ${this.allCustomers[index]['firstName']} ${this.allCustomers[index]['lastName']} withdrew ${amount}$!`);
            return `${this.allCustomers[index]['totalMoney']}$`;
        }
    }

    customerInfo(personalId) {
        let isFound = false;
        let index;
        for (let element of this.allCustomers) {
            if (element['personalId'] === Number(personalId)) {
                index = this.allCustomers.indexOf(element);
                isFound = true;
                break;
            }
        }

        if (isFound === false) {
            throw new Error('We have no customer with this ID!');
        }

        let result = [
            `Bank name: ${this._bankName}`,
            `Customer name: ${this.allCustomers[index]['firstName']} ${this.allCustomers[index]['lastName']}`,
            `Customer ID: ${this.allCustomers[index]['personalId']}`,
            `Total Money: ${this.allCustomers[index]['totalMoney']}$`,
            'Transactions:'
        ];

        for (let element of this.allCustomers[index]['transactions']) {
            result.push(element);
        }

        return result.join('\n');
    }

}

let bank = new Bank('SoftUni Bank');

console.log(bank.newCustomer({ firstName: 'Svetlin', lastName: 'Nakov', personalId: 6233267 }));
console.log(bank.newCustomer({ firstName: 'Mihael', lastName: 'Mileva', personalId: 4151596 }));

bank.depositMoney(6233267, 250);
console.log(bank.depositMoney(6233267, 250));
bank.depositMoney(4151596, 555);

console.log(bank.withdrawMoney(6233267, 125));

console.log(bank.customerInfo(6233267));
