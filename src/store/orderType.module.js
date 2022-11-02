export const orderType = {
    state: {
        orderType: JSON.parse(localStorage.getItem('orderType')) || 'dine-in',
    },
    getters: {
        orderType: state => {
            return state.orderType;
        }
    },
    actions: {
        setOrderType(context, orderType) {
            context.commit(orderType);
        }
    },
    mutations: {
        updateOrderType(state, orderType) {
            state.orderType = orderType;
            this.commit('saveOrderType');
        },
        saveOrderType(state) {
            localStorage.setItem('orderType', JSON.stringify(state.orderType));
        }
    }
};

