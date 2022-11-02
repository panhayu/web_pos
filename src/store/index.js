import { createStore } from "vuex";
import { auth } from "./auth.module";
import { cart } from "./cart.module";
import { orderType } from "./orderType.module";

const store = createStore({
  modules: {
    auth,
    cart,
    orderType,
  },
});

export default store;