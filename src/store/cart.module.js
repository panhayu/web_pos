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
                    item_id: item.id,
                    item_name: item.name,
                    item_image: item.image,
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
                    state.cartItems.splice(params.index, 1);
                }
            }
        },
        empty(state) {
            state.cartItems = [];
        }
    },
}