import axios from "axios";

export const api = axios.create({
  baseURL: "https://smpm-senai.onrender.com/api/usuarios"
});

export const apiMaquinas = axios.create({
  baseURL: "https://smpm-senai.onrender.com/api/maquinas"
});

export const apiAgendamentos = axios.create({
  baseURL: "https://smpm-senai.onrender.com/api/agendamentos"
});
