function solve() {

    class CarDealership {

        constructor(name) {
            this.name = name;
            this.availableCars = [];
            this.soldCars = [];
            this.totalIncome = 0;
        }

        addCar(model, horsepower, price, mileage) {
            if (model === '' ||
                !Number.isInteger(horsepower) ||
                horsepower < 0 ||
                price < 0 ||
                mileage < 0) {
                throw new Error('Invalid input!');
            }

            this.availableCars.push({
                model: model,
                horsepower: Number(horsepower),
                price: Number(price),
                mileage: Number(mileage)
            });

            return `New car added: ${model} - ${horsepower} HP - ${mileage.toFixed(2)} km - ${price.toFixed(2)}$`;
        }

        sellCar(model, desiredMileage) {
            let num;
            let isFound = false;

            for (let i = 0; i < this.availableCars.length; i++) {
                if (this.availableCars[i]['model'] === model) {
                    isFound = true;
                    num = i;
                    break;
                }
            }

            if (isFound === false) {
                throw new Error(`${model} was not found!`);
            }

            let carMileage = this.availableCars[num]['mileage'];
            let price;

            if (carMileage <= desiredMileage) {
                price = this.availableCars[num]['price'];
            } else if (carMileage - desiredMileage <= 40000) {
                price = this.availableCars[num]['price'] * 0.95;
            } else if (carMileage - desiredMileage > 40000) {
                price = this.availableCars[num]['price'] * 0.90;
            }

            let carModel = this.availableCars[num]['model'];
            let carHorsepower = this.availableCars[num]['horsepower'];

            let soldCar = {
                model: carModel,
                horsepower: carHorsepower,
                soldPrice: price
            }

            this.soldCars.push(soldCar);

            this.totalIncome += price;

            this.availableCars.splice(num, 1);

            return `${carModel} was sold for ${price.toFixed(2)}$`;
        }

        currentCar() {
            if (this.availableCars.length === 0) {
                return "There are no available cars";
            } else {
                let result = ['-Available cars:'];

                for (let car of this.availableCars) {
                    result.push(`---${car['model']} - ${car['horsepower']} HP - ${car['mileage'].toFixed(2)} km - ${car['price'].toFixed(2)}$`);
                }

                return result.join('\n');
            }
        }

        salesReport(criteria) {
            if (criteria === 'horsepower' || criteria === 'model') {

                let sortedCars;

                if (criteria === 'horsepower') {
                    sortedCars = this.soldCars.sort((a, b) => b['horsepower'] - a['horsepower']);
                } else if (criteria === 'model') {
                    sortedCars = this.soldCars.sort((a, b) => a['model'].localeCompare(b['model']));
                }

                let result = [`-${this.name} has a total income of ${this.totalIncome.toFixed(2)}$`, `-${this.soldCars.length} cars sold:`];

                for (let car of this.soldCars) {
                    result.push(`---${car['model']} - ${car['horsepower']} HP - ${car['soldPrice'].toFixed(2)}$`);
                }

                return result.join('\n');
            } else {
                throw new Error("Invalid criteria!");
            }
        }

    }

    let dealership = new CarDealership('SoftAuto');
    dealership.addCar('Toyota Corolla', 100, 3500, 190000);
    dealership.addCar('Mercedes C63', 300, 29000, 187000);
    dealership.addCar('Audi A3', 120, 4900, 240000);
    dealership.sellCar('Toyota Corolla', 230000);
    dealership.sellCar('Mercedes C63', 110000);
    console.log(dealership.salesReport('horsepower'));







}

solve()