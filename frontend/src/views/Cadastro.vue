<template>
  <div class="auth-container">
    <div class="auth-card">
      <h1>Cadastro</h1>

      <input type="text" placeholder="Nome completo" v-model="form.nome" />
      <input type="email" placeholder="E-mail" v-model="form.email" />
      <input type="password" placeholder="Senha" v-model="form.senha" />

      <p class="auth-link">
        Já tem conta?
        <router-link to="/login">Entrar</router-link>
      </p>

      <button @click="cadastrar">Cadastrar</button>
    </div>
  </div>
</template>

<style scoped src="@/assets/auth.css"></style>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();

const form = ref({
  nome: "",
  email: "",
  senha: ""
});

const cadastrar = async () => {
  try {
    await userStore.cadastrarUsuario(form.value);

    alert("Usuário cadastrado com sucesso!");

    form.value = {
      nome: "",
      email: "",
      senha: ""
    };

    router.push('/login')
    
  } catch (error) {
    alert("Erro ao cadastrar usuário");
  }
};
</script>
