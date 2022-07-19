function solve() {

    class VegetableStore {
        constructor(owner, location) {
            this.owner = owner;
            this.location = location;
            this.availableProducts = [];
            this.helper = [];
        }

        loadingVegetables(vegetables) {
            let productsSet = new Set();

            for (let product of vegetables) {
                let [type, quantity, price] = product.split(' ');

                if (this.helper.includes(type)) {
                    for (let i = 0; i < this.availableProducts.length; i++) {
                        if (this.availableProducts[i]['type'] === type) {
                            this.availableProducts[i]['quantity'] += Number(quantity);
                            if (this.availableProducts[i]['price'] < price) {
                                this.availableProducts[i]['price'] = price;
                            }
                        }
                    }
                } else {
                    this.availableProducts.push({
                        type: type,
                        quantity: Number(quantity),
                        price: Number(price)
                    });
                    this.helper.push(type);
                }

                productsSet.add(type);
            }

            return `Successfully added ${Array.from(productsSet).join(', ')}`;
        }

        buyingVegetables(selectedProducts) {
            let totalPrice = 0;
            for (let product of selectedProducts) {
                let [type, quantity] = product.split(' ');

                if (!this.helper.includes(type)) {
                    throw new Error(`${type} is not available in the store, your current bill is $${totalPrice.toFixed(2)}.`);
                }

                for (let i = 0; i < this.availableProducts.length; i++) {
                    if (this.availableProducts[i]['type'] === type) {
                        if (this.availableProducts[i]['quantity'] < Number(quantity)) {
                            throw new Error(`The quantity ${quantity} for the vegetable ${type} is not available in the store, your current bill is $${totalPrice.toFixed(2)}.`);
                        }
                        totalPrice += Number(this.availableProducts[i]['price']) * Number(quantity);
                        this.availableProducts[i]['quantity'] -= Number(quantity);
                    }
                }
            }

            return `Great choice! You must pay the following amount $${totalPrice.toFixed(2)}.`;
        }

        rottingVegetable(type, quantity) {
            if (!this.helper.includes(type)) {
                throw new Error(`${type} is not available in the store.`);
            }

            for (let i = 0; i < this.availableProducts.length; i++) {
                if (this.availableProducts[i]['type'] === type) {
                    if (this.availableProducts[i]['quantity'] < quantity) {
                        this.availableProducts[i]['quantity'] = 0;
                        return `The entire quantity of the ${type} has been removed.`;
                    } else {
                        this.availableProducts[i]['quantity'] -= quantity;
                        return `Some quantity of the ${type} has been removed.`;
                    }
                }
            }
        }

        revision() {
            let result = ['Available vegetables:'];

            let sortedVegetables = this.availableProducts.sort((a, b) => a['price'] - b['price']);

            for (let product of sortedVegetables) {
                result.push(`${product['type']}-${product['quantity']}-$${product['price']}`);
            }

            result.push(`The owner of the store is ${this.owner}, and the location is ${this.location}.`);

            return result.join('\n');
        }

    }

    let vegStore = new VegetableStore("Jerrie Munro", "1463 Pette Kyosheta, Sofia");
    console.log(vegStore.loadingVegetables(["Okra 2.5 3.5", "Beans 10 2.8", "Celery 5.5 2.2", "Celery 0.5 2.5"]));
    console.log(vegStore.buyingVegetables(["Okra 1"]));
    console.log(vegStore.buyingVegetables(["Beans 8", "Okra 1.5"]));
    console.log(vegStore.buyingVegetables(["Banana 1", "Beans 2"]));


}

solve()