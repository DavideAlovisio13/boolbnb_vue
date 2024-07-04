import axios from "axios";
import { reactive } from "vue";
export const store = reactive({
  apiBaseUrl: "http://127.0.0.1:8000/api/",
  apartamentQuery: "apartament/",
  sponsoredQuery: "apartament/sponsored/",
  apartament: [],
  search: [],
  sponsored: [],
  methods: {
    async apiGetApart() {
      const { data } = await axios.get(`${this.apiBaseUrl}${this.apartamentQuery}`);
      this.apartament = data.results;
      console.log(this.apartament);
    },
    async apiGetSponsored() {
      const { data } = await axios.get(`${this.apiBaseUrl}${this.sponsoredQuery}`);
      this.sponsored = data.results;
      console.log(this.sponsored);
    },
  }
});
