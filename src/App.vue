<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import userService from './services/user.service'
import { useToast } from "vue-toastification";
const defaultLayout = 'default'
export default {
  data() {
    return {
      localOrderData: JSON.parse(localStorage.getItem('orders')) || [],
    }
  },
  setup() {
    const toast = useToast();
    return { toast }
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || defaultLayout) + '-layout'
    },
    isOnline() {
      return this.$store.getters.onlineStatus;
    },
    // check if localOrderData is empty return false else return true
    isLocalOrderDataNotEmpty() {
      return this.localOrderData.length === 0 ? false : true;
    },
  },
  watch: {
    $route(to) {
      document.title = to.meta.title || "Canteen Web POS";
    },
    isOnline() {
      this.getLocalOrderData();
      if (this.isOnline && this.isLocalOrderDataNotEmpty) {
        this.syncLocalOrderData();
      }
    },
  },
  methods: {
    getLocalOrderData() {
      this.localOrderData = JSON.parse(localStorage.getItem("orders")) || [];
    },
    // sync localOrderData to server
    syncLocalOrderData() {
      this.localOrderData.forEach((order) => {
        this.$Progress.start();
        let formData = new FormData();
        formData.append('note', order.note);
        formData.append('payment_id', order.payment_id);
        formData.append('quantity', order.quantity);
        formData.append('total_price', order.total_price);
        formData.append('order_channel_id', order.order_channel_id);
        if (order.name && order.phone && order.address) {
          formData.append('customer[name]', order.name);
          formData.append('customer[phone]', order.phone);
          formData.append('customer[address]', order.address);
        }
        if (order.dining_table_id) {
          formData.append('dining_table_id', order.dining_table_id);
        }
        formData.append("order_status_id", "3b696cbc-10ef-14ed-a261-0242ac120002")
        order.items.forEach((item, index) => {
          formData.append(`items[${index}][item_id]`, item.id);
          formData.append(`items[${index}][item_name]`, item.name);
          formData.append(`items[${index}][size_id]`, item.size_id);
          formData.append(`items[${index}][size_name]`, item.size_name);
          formData.append(`items[${index}][quantity]`, item.quantity);
          formData.append(`items[${index}][price]`, item.price);
        })
        userService.storeOrder(formData).then((response) => {
          this.$Progress.finish();
        }).catch((error) => {
          this.$Progress.fail();
          console.log(error);
        })
      });
      localStorage.removeItem("orders");
      this.toast.success("Order synced successfully");
    },
  },
  created() {
    this.$Progress.start();
  },
}
</script>