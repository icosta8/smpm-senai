<template>
  <div class="auth-container">
    <div class="auth-card">
      <h1>Login</h1>

      <input type="email" placeholder="E-mail" v-model="form.email" />
      <input type="password" placeholder="Senha" v-model="form.senha" />

      <p class="auth-link">
        Não tem conta?
        <router-link to="/cadastro">Cadastre-se</router-link>
      </p>

      <button @click="fazerLogin">Entrar</button>
    </div>
  </div>
</template>

<style scoped src="@/assets/auth.css"></style>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const router = useRouter();
const userStore = useUserStore();

const form = ref({
  email: "",
  senha: ""
});

const fazerLogin = async () => {
  if (!form.value.email || !form.value.senha) {
    alert("Preencha todos os campos!");
    return;
  }

  const ok = await userStore.login(form.value.email, form.value.senha);

  if (ok) {
    router.push("/home");
  } else {
    alert("E-mail ou senha incorretos!");
  }
};
</script>