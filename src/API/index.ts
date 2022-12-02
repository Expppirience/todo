import axios from "axios";

export const baseRequests = axios.create({
   baseURL: "https://social-network.samuraijs.com/api/1.1", withCredentials: true, headers: {
      "API-KEY": "d0a85c2e-e773-4b8e-a68c-52fc468ef001"
   }
})