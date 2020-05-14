import axios from "axios";
const $ = axios.create();
const _ = axios.create({
    withCredentials: true,
});

export { $, _ };
