export const cart = {
    state: {
        cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    },
    getters: {
        itemCount: state => {
            return state.cartItems.length;
        },
        cart: state => {
            return state.cartItems;
        },
    },
    actions: {
        addItem(context, item) {
            context.commit(item);
        },
        delItem(context, params) {
            context.commit(params);
        },
        empty(context) {
            context.commit()
        }
    },
    mutations: {
        addToCart(state, item) {
            let found = state.cartItems.find(cartItem => cartItem.id === item.id);
            if (found) {
                found.quantity++;
            } else {
                state.cartItems.push({
                    id: item.id,
                    name: item.name,
                    image: item.image,
                    price: item.sizes[0].price,
                    size_id: item.sizes[0].id,
                    size_name: item.sizes[0].name,
                    quantity: 1
                });
            }
            this.commit('saveCart');
        },
        removeFromCart(state, params) {
            let found = state.cartItems.find(cartItem => cartItem.id === params.id);
            if (found) {
                if (found.quantity > 1) {
                    found.quantity--;
                } else {
                    state.cartItems = state.cartItems.filter(cartItem => cartItem.id !== params.id);
                }
            }
            this.commit('saveCart');
        },
        empty(state) {
            state.cartItems = [];
            this.commit('saveCart');
        },
        saveCart(state) {
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
    },
}