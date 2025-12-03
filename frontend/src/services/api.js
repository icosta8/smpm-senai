import axios from "axios";

export const api = axios.create({
  baseURL: "https://smpm-senai.onrender.com"
});

export const apiMaquinas = axios.create({
  baseURL: "https://smpm-senai.onrender.com"
});