function garden() {

    class Garden {
        constructor(spaceAvailable) {
            this.spaceAvailable = Number(spaceAvailable);
            this.plants = [];
            this.storage = [];
        }

        addPlant(plantName, spaceRequired) {
            if (Number(spaceRequired) > Number(this.spaceAvailable)) {
                throw new Error('Not enough space in the garden.');
            }

            this.plants.push({
                'plantName': plantName,
                'spaceRequired': spaceRequired,
                'ripe': false,
                'quantity': 0
            });

            this.spaceAvailable -= Number(spaceRequired);

            return `The ${plantName} has been successfully planted in the garden.`;
        }


        ripenPlant(plantName, quantity) {
            let isPresent = false;
            let isRipe = false;
            let num;
            for (let i = 0; i < this.plants.length; i++) {
                num = i;
                if (this.plants[i]['plantName'] === plantName) {
                    isPresent = true;
                    if (this.plants[i]['ripe'] === true) {
                        isRipe = true;
                    }
                    break;
                }
            }

            if (isPresent === false) {
                throw new Error(`There is no ${plantName} in the garden.`);
            }
            if (isRipe === true) {
                throw new Error(`The ${plantName} is already ripe.`);
            }
            if (Number(quantity) <= 0) {
                throw new Error('The quantity cannot be zero or negative.');
            }

            this.plants[num]['ripe'] = true;
            this.plants[num]['quantity'] += Number(quantity);

            if (Number(quantity) === 1) {
                return `${quantity} ${plantName} has successfully ripened.`
            } else {
                return `${quantity} ${plantName}s have successfully ripened.`
            }
        }

        harvestPlant(plantName) {
            let isPresent = false;
            let isRipe = false;
            let num;
            for (let i = 0; i < this.plants.length; i++) {
                num = i;
                if (this.plants[i]['plantName'] === plantName) {
                    isPresent = true;
                    if (this.plants[i]['ripe'] === true) {
                        isRipe = true;
                    }
                    break;
                }
            }

            if (isPresent === false) {
                throw new Error(`There is no ${plantName} in the garden.`);
            }
            if (isRipe === false) {
                throw new Error(`The ${plantName} cannot be harvested before it is ripe.`);
            }

            this.storage.push({
                'plantName': this.plants[num]['plantName'],
                'quantity': this.plants[num]['quantity']
            })

            this.spaceAvailable += this.plants[num]['spaceRequired'];

            let index = this.plants.indexOf(this.plants[num]);

            this.plants.splice(index, 1);

            return `The ${plantName} has been successfully harvested.`
        }

        generateReport() {
            let result = [];

            result.push(`The garden has ${this.spaceAvailable} free space left.`)

            let names = [];

            for (let plant of this.plants) {
                names.push(plant['plantName']);
            }

            result.push(`Plants in the garden: ${names.sort((a, b) => a.localeCompare(b)).join(', ')}`);

            if (this.storage.length === 0) {
                result.push(`Plants in storage: The storage is empty.`);
            } else {
                let storageArr = [];
                for (let plant of this.storage) {
                    storageArr.push(`${plant['plantName']} (${plant['quantity']})`);
                }
                result.push(`Plants in storage: ${storageArr.join(', ')}`);
            }

            return result.join('\n');
        }
    }

    const myGarden = new Garden(250)
    console.log(myGarden.addPlant('apple', 20));
    console.log(myGarden.addPlant('orange', 200));
    console.log(myGarden.addPlant('raspberry', 10));
    console.log(myGarden.ripenPlant('apple', 10));
    console.log(myGarden.ripenPlant('orange', 1));
    console.log(myGarden.harvestPlant('orange'));
    console.log(myGarden.generateReport());

}

garden()