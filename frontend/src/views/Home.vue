<template>
  <div class="home-container">
    <aside class="sidebar">
      <h2 class="sidebar-logo">SMPM-Senai</h2>
      <nav>
        <ul>
          <li><router-link to="/home/perfil" active-class="active">Perfil</router-link></li>
          <li><router-link to="/home/maquinas" active-class="active">Máquinas</router-link></li>
          <li><router-link to="/home/agendamentos" active-class="active">Agendamentos</router-link></li>
          <li><router-link to="/home/dashboard" active-class="active">Dashboard</router-link></li>
        </ul>
      </nav>
    </aside>

    <div class="main-content">
      <header class="topbar">
        <div class="user-info">
          <span>Olá, Usuário</span>
          <button @click="logout">Logout</button>
        </div>
      </header>

      <section class="content">
        <router-view></router-view>
      </section>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.home-container {
  display: flex;
  min-height: 100vh;
  width: 100vw;
  font-family: "Poppins", sans-serif;
}

.sidebar {
  width: 220px;
  background-color: #4a90e2;
  color: white;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
}

.sidebar-logo {
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 2rem;
}

.sidebar nav ul {
  list-style: none;
  padding: 0;
}

.sidebar nav li {
  margin: 1rem 0;
}

.sidebar nav a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  display: block;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: background 0.2s;
}

.sidebar nav a:hover,
.sidebar nav a.active {
  background-color: rgba(255, 255, 255, 0.2);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f5f7fb;
}

.topbar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.topbar .user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.topbar button {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #4a90e2;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.topbar button:hover {
  background-color: #357ab8;
}

.content {
  flex: 1;
  padding: 2rem;
}
</style>
