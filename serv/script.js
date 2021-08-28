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
