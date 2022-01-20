class DataSource {
    constructor() {
        this.apiResponse = this.getDataSourceApiCall();
    }

    getDataSourceApiCall() {
        return new Promise((resolve, reject) => {
            var API_URL = 'https://static.ngnrs.io/test/prices';
            var xhr = new XMLHttpRequest();
            xhr.open('GET', API_URL, true);
            xhr.onload = function () {
                if (this.status == 200) {
                    resolve(xhr.response);
                }
            };
            xhr.onerror = function () {
                reject('Api call failed: ', this.statusText);
            };
            xhr.send();
        });
    }

    getPrices() {
        return new Promise((resolve, reject) => {
            this.apiResponse.then((response) => {
                var resJSON = JSON.parse(response);
                var priceResult = resJSON.data.prices;

                priceResult.map(function (item) {
                    item.mid = function () {
                        return (item.buy + item.sell) / 2;
                    }
                    item.quote = function () {
                        return item.pair.slice(-3);
                    };
                    return priceResult;
                });

                resolve(priceResult);
            }).catch((error) => {
                reject('Mapping failed', error);
            });
        });
    }
}


// RUNNING TEST
const ds = new DataSource();
ds.getPrices()
    .then(prices => {
        prices.forEach(price => {
            console.log(`Mid price for ${price.pair} is ${price.mid()} ${price.quote()}.`);
        });
    }).catch(error => {
        console.err(error);
    });