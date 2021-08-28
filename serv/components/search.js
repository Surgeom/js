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