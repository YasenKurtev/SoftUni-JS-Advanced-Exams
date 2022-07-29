class ChristmasDinner {

    constructor(budget) {
        this.budget = Number(budget);
        this.dishes = [];
        this.products = [];
        this.guests = {};
    }

    get budget() {
        return this._budget;
    }

    set budget(value) {
        if (value < 0) {
            throw new Error('The budget cannot be a negative number');
        }
        this._budget = value;
    }

    shopping(product) {
        let productType = product[0];
        let price = Number(product[1]);

        if (this.budget < price) {
            throw new Error('Not enough money to buy this product');
        } else {
            this.products.push(productType);
            this.budget -= price;
            return `You have successfully bought ${productType}!`;
        }
    }

    recipes(recipe) {
        let isAvailable = true;

        for (let product of recipe['productsList']) {
            if (!this.products.includes(product)) {
                isAvailable = false;
                break;
            }
        }

        if (isAvailable === true) {
            this.dishes.push(recipe);
            return `${recipe['recipeName']} has been successfully cooked!`;
        } else {
            throw new Error('We do not have this product');
        }
    }

    inviteGuests(name, dish) {
        let isFound = false;

        for (let currentDish of this.dishes) {
            if (currentDish['recipeName'] === dish) {
                isFound = true;
                break;
            }
        }

        if (isFound === false) {
            throw new Error('We do not have this dish');
        }

        if (this.guests.hasOwnProperty(name)) {
            throw new Error('This guest has already been invited');
        }

        this.guests[name] = dish;
        return `You have successfully invited ${name}!`;
    }

    showAttendance() {
        let result = [];

        for (let key of Object.keys(this.guests)) {
            let name = key;
            let dish = this.guests[key];
            let products;
            for (let element of this.dishes) {
                if (element['recipeName'] === dish) {
                    products = element['productsList'];
                    break;
                }
            }
            result.push(`${name} will eat ${dish}, which consists of ${products.join(', ')}`);
        }

        return result.join('\n');
    }

}