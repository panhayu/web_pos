export const onlineStatus = {
    state: {
        onlineStatus: JSON.parse(localStorage.getItem('onlineStatus')) || true,
    },
    getters: {
        onlineStatus: state => {
            return state.onlineStatus;
        }
    },
    actions: {
        setOnlineStatus(context, onlineStatus) {
            context.commit(onlineStatus);
        }
    },
    mutations: {
        updateOnlineStatus(state, onlineStatus) {
            state.onlineStatus = onlineStatus;
            this.commit('saveOnlineStatus');
        },
        saveOnlineStatus(state) {
            localStorage.setItem('onlineStatus', JSON.stringify(state.onlineStatus));
        }
    }
};
