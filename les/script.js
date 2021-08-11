const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


function makeGETRequest(url) {
    return new Promise((resolve, reject) => {
        var xhr;

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        if (true) {
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    resolve(xhr.responseText);
                }
            }
        } else {
            reject("Ошибка")
        }
        xhr.open('GET', url, true);
        xhr.send();
    })
}


class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}
function sum(arr) {
    return arr.reduce(function (a, b) {
        return a + b;
    }, 0);
}
class GoodsList {
    constructor() {
        this.goods = [];
        this.filteredGoods = [];
    }
    fetchGoods(cb) {
        makeGETRequest(`${API_URL}/catalogData.json`).then((goods) => {
            this.goods = JSON.parse(goods);
            console.log(this.goods)
            this.filteredGoods = JSON.parse(goods);
            console.log(this.filteredGoods)
            cb();
        })
    }
    render() {
        let listHtml = '';
        this.filteredGoods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
    items_sum() {
        return sum(this.goods.map(function (a) { return a.price; }))
    }
    filterGoods(value) {
        const regexp = new RegExp(value, 'i');
        this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
        this.render();
    }

}


class Basket {
    constructor() {
        this.items = []
    }

    additem(item) {
        this.items.additem(item)
    }
    removeitem(item) {
        this.items.splice(this.items.indexOf(item), 1)
    }
    basketlist() {
        return this.items
    }
}

class BasketItem {
    pass
}



const list = new GoodsList();
list.fetchGoods(() => {
    list.render();
});

searchButton.addEventListener('click', (e) => {
    const value = document.search.bsearch.value;
    list.filterGoods(value);
});