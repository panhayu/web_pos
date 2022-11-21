import { createStore } from "vuex";
import { auth } from "./auth.module";
import { cart } from "./cart.module";
import { orderType } from "./orderType.module";
import { onlineStatus } from "./onlineStatus.module";

const store = createStore({
  modules: {
    auth,
    cart,
    orderType,
    onlineStatus,
  },
});

export default store;