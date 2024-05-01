import axios from "axios";

const api = axios.create({
  baseURL: "https://user-service-vsp55ymczq-el.a.run.app/api/v1",
});
export default api;
