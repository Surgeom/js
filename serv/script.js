const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';




Vue.component('goods-list', {
    props: ['goods'],
    template: `
      <div class="goods-list">
        <goods-item v-for="good in goods" :good="good"></goods-item>
      </div>
    `
});

Vue.component('goods-item', {
    props: ['good'],
    template: `
      <div class="goods-item">
        <h3>{{ good.product_name }}</h3>
        <p>{{ good.price }}</p>
        <button type="button" class="btn btn-primary" @click="addTobasket(good)">Добавить в корзину</button>
      </div>
    `,

    methods: {
        addTobasket(good) {
            this.$root.$emit('add_to_basket', good);
        }
    }
});

Vue.component('basket', {
    data: function () {
        return {
            basket_goods: [],
            quantity: 0,
            total_sum: 0,
        }
    },
    methods: {
        basket_price_sum() {
            return this.basket_goods.reduce((partial_sum, a) => partial_sum + a.price * a.count, 0);
        },
        delete_item(id) {
            var ind = this.basket_goods.findIndex(function (element) {
                return element.id_product === id;
            })
            this.quantity -= this.basket_goods[ind]['count']
            this.basket_goods.splice(ind, 1)

        },
        carttoj(data) {
            this.$root.makePOSTRequest("/addToCart", data)
        }
        ,
        cartdel(data) {
            this.$root.makePOSTRequest("/deleteCart", data)
        }

    },
    mounted() {
        this.$root.$on('add_to_basket', good => {
            if (this.basket_goods.some(o => o.id_product === good.id_product)) {
                this.basket_goods.filter(function (val) {
                    return val.id_product == good.id_product;
                })[0]['count'] += 1

            }
            else {
                good['count'] = 1
                this.basket_goods.push(good)

            }
            this.quantity += 1
            alert(`Вы добавили товар :${good.product_name} в корзину`)

        });
    },
    template: `
    <div id="okno">
          Корзина
          <div class="table-responsive">
          <table class="table table-hover table-bordered">
              <thead >
                  <tr>
                      <th>Название</th>
                      <th>Цена</th>
                      <th>Количество</th>
                      <th>Сумма</th>
                      <th> </th>
                  </tr>
                  <tr v-for="item in basket_goods":data-id="item.id_product">
                       <th>  {{ item.product_name }}</th>
                       <th>  {{ item.price }}</th>
                       <th>  {{ item.count }} </th>
                       <th>  {{ item.price * item.count }}</th>
                       <th>  <button type="button" class="btn btn-danger" v-on:click="delete_item(item.id_product)">Удалить</button>
                       </th>
                    </tr>       
              </thead>
          </table>
      </div>

      <div>Итого: {{quantity}} товаров на {{basket_price_sum()}}  руб.</div>
      <br>
      <button id="order" class="btn btn-info" v-on:click="carttoj(basket_goods)">Оформить заказ</button>
      <button id="order" class="btn btn-info" v-on:click="cartdel()">Удалить заказ заказ</button>
      

         <a href="#" class="close">Закрыть корзину</a>
    </div>`

});
Vue.component('search', {
    template: `
    <form class="d-flex" name="search">
    <input class="form-control me-2 goods-search" type="search" placeholder="Поиск"
        aria-label="Search" v-model="searchLine"  >
    <button class="btn btn-outline-success search-button" type="button"
    v-on:click="onclick">Искать</button>
    </form>
    `,
    data() {
        return {
            searchLine: '',

        }
    },
    methods: {

        onclick() {
            this.$root.ButtonSearchClick(this.searchLine);
        }
    },

});
const app = new Vue({
    el: '#app', data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
        isVisibleCart: true,

    },

    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error)
                })
        },
        makePOSTRequest(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    console.log("+++++++++")
                    console.log(error)
                });
        },

        ButtonSearchClick(str) {
            this.searchLine = (str !== undefined ? str : '');
            let text = this.searchLine.toLowerCase().trim();
            if (text === '') {
                this.filteredProducts = this.goods;
            } else {
                const regexp = new RegExp(text, 'i');
                this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
            }
        }


    },

    mounted() {
        this.getJson(`/catalogData`).then((goods) => {
            this.goods = JSON.parse(JSON.stringify(goods));
            this.filteredGoods = JSON.parse(JSON.stringify(goods));
        });
    },
});
