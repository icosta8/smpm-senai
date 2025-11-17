import { createRouter, createWebHistory } from 'vue-router'

// Import das views
import Login from '../views/Login.vue'
import Cadastro from '../views/Cadastro.vue'
import Home from '@/views/Home.vue'
import Dashboard from '@/views/Dashboard.vue'
import Perfil from '@/views/Perfil.vue'
import Maquinas from '@/views/Maquinas.vue'
import Agendamentos from '@/views/Agendamentos.vue'

const routes = [
  // Redireciona raiz para login
  { path: '/', redirect: '/login' },

  // Páginas públicas
  { path: '/login', name: 'Login', component: Login },
  { path: '/cadastro', name: 'Cadastro', component: Cadastro },

  // Layout principal (Home) com rotas filhas
  {
    path: '/home',
    component: Home,
    children: [
      { path: '', name: 'Dashboard', component: Dashboard }, // rota padrão
      { path: 'dashboard', name: 'Dashboard', component: Dashboard },
      { path: 'perfil', name: 'Perfil', component: Perfil },
      { path: 'maquinas', name: 'Maquinas', component: Maquinas },
      { path: 'Agendamentos', name: 'Agendamentos', component: Agendamentos },
    ]
  },

  // Caso não encontre a rota
  { path: '/:pathMatch(.*)*', redirect: '/login' }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
