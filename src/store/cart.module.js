export const cart = {
    state: {
        cartItems: []
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
                    price: item.price,
                    size_id: "3b696cbc-10ef-11ed-a261-0242ac120002",
                    size_name: 'Small',
                    quantity: 1
                });
            }
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
        },
        empty(state) {
            state.cartItems = [];
        }
    },
}