<template>
  <div>
    <h1>Perfil</h1>
    <p><strong>Usuário:</strong> {{ nomeUsuario }}</p>
    <p><strong>E-mail:</strong> {{ emailUsuario }}</p>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/userStore';
import { computed, onMounted } from 'vue';

const userStore = useUserStore();

const nomeUsuario = computed(() => userStore.usuarioLogado?.nome || "Usuário");
const emailUsuario = computed(() => userStore.usuarioLogado?.email || "Não informado");

// Garante que recarregar a página ainda funcione
onMounted(() => {
  const usuario = localStorage.getItem("usuario");
  if (usuario) {
    userStore.usuarioLogado = JSON.parse(usuario);
  }
});
</script>

<style scoped>
h1 {
  color: #333;
}
</style>
