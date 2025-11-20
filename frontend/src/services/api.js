import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api/usuarios"
});

export const apiMaquinas = axios.create({
  baseURL: "http://localhost:3000/api/maquinas"
});