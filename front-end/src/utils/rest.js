import axios from "axios";

const RestWithCredentials = (options) =>
  axios.create({ withCredentials: true, timeout: 5000, ...options });

export default RestWithCredentials();
