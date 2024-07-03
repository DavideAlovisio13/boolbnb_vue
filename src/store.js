import { reactive } from "vue";
export const store = reactive({
  apiBaseUrl: "http://127.0.0.1:8000/Api",
  imgBasePath: "http://127.0.0.1:8000/storage/",
  apartament: [],
  search: [],
  service: [],
  sponsored: [],
  user: []
});

console.log(store.search)