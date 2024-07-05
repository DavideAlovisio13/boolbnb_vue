import { reactive } from "vue";
export const store = reactive({
  apiBaseUrl: "http://127.0.0.1:8000/Api",
  imgBasePath: "http://127.0.0.1:8000/storage/",
  apartments: [],
  search: [],
  service: [],
  sponsored: [],
  user: [],
});
