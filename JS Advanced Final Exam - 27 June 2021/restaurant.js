class Restaurant {

    constructor(budgetMoney) {
        this.budgetMoney = Number(budgetMoney);
        this.menu = {};
        this.stockProducts = {};
        this.history = [];
    }

    loadProducts(products) {
        for (let product of products) {
            let [productName, productQuantity, productTotalPrice] = product.split(' ');
            if (Number(productTotalPrice) <= Number(this.budgetMoney)) {
                if (!this.stockProducts.hasOwnProperty(productName)) {
                    this.stockProducts[productName] = Number(productQuantity);
                    this.budgetMoney -= Number(productTotalPrice);
                } else {
                    this.stockProducts[productName] += Number(productQuantity);
                    this.budgetMoney -= Number(productTotalPrice);
                }
                this.history.push(`Successfully loaded ${productQuantity} ${productName}`);
            } else {
                this.history.push(`There was not enough money to load ${productQuantity} ${productName}`);
            }
        }
        return this.history.join('\n');
    }

    addToMenu(meal, neededProducts, price) {
        if (!this.menu.hasOwnProperty(meal)) {
            this.menu[meal] = { 'products': {}, 'price': Number(price) };
            for (let product of neededProducts) {
                let [productName, productQuantity] = product.split(' ');
                this.menu[meal]['products'][productName] = Number(productQuantity);
            }
            let mealsCount = Object.keys(this.menu).length;
            if (mealsCount === 1) {
                return `Great idea! Now with the ${meal} we have 1 meal in the menu, other ideas?`;
            }
            if (mealsCount === 0 || mealsCount >= 2) {
                return `Great idea! Now with the ${meal} we have ${mealsCount} meals in the menu, other ideas?`;
            }
        } else {
            return `The ${meal} is already in the our menu, try something different.`;
        }
    }

    showTheMenu() {
        let mealsCount = Object.keys(this.menu).length;
        if (mealsCount > 0) {
            let result = [];
            for (let key of Object.keys(this.menu)) {
                result.push(`${key} - $ ${this.menu[key]['price']}`);
            }
            return result.join('\n');
        } else {
            return 'Our menu is not ready yet, please come later...';
        }
    }

    makeTheOrder(meal) {
        let isAvailable = true;
        if (this.menu.hasOwnProperty(meal)) {
            let neededProductsKeys = Object.keys(this.menu[meal]['products']);
            for (let key of neededProductsKeys) {
                if (!this.stockProducts.hasOwnProperty(key) || Number(this.stockProducts[key]) < Number(this.menu[meal]['products'][key])) {
                    isAvailable = false;
                    break;
                } else {
                    this.stockProducts[key] -= Number(this.menu[meal]['products'][key]);
                }
            }
        } else {
            return `There is not ${meal} yet in our menu, do you want to order something else?`;
        }
        if (isAvailable === true) {
            this.budgetMoney += Number(this.menu[meal]['price']);
            return `Your order (${meal}) will be completed in the next 30 minutes and will cost you ${this.menu[meal]['price']}.`;
        } else {
            return `For the time being, we cannot complete your order (${meal}), we are very sorry...`;
        }
    }

}

let kitchen = new Restaurant(1000);
console.log(kitchen.loadProducts(['Banana 10 5', 'Banana 20 10', 'Strawberries 50 30', 'Yogurt 10 10', 'Yogurt 500 1500', 'Honey 5 50']));


