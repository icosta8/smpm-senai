<template>
  <div class="dashboard">
    <h1>Dashboard</h1>

    <div class="card">
      <canvas id="agendamentosChart"></canvas>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useAgendamentosStore } from "@/stores/agendamentosStore";
import Chart from "chart.js/auto";

const agendamentosStore = useAgendamentosStore();
let chart = null;

async function carregarDashboard() {
  // Carrega agendamentos do backend
  await agendamentosStore.listar();

  // Contagem por status
  const pendentes = agendamentosStore.agendamentos.filter(
    a => a.status === "Pendente"
  ).length;

  const concluidos = agendamentosStore.agendamentos.filter(
    a => a.status === "Concluído"
  ).length;

  const atrasados = agendamentosStore.agendamentos.filter(
    a => a.status === "Em atraso"
  ).length;

  // Renderiza gráfico
  const ctx = document.getElementById("agendamentosChart").getContext("2d");

  if (chart) chart.destroy(); // evita duplicar gráfico ao recarregar

  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Pendente", "Concluído", "Em atraso"],
      datasets: [
        {
          data: [pendentes, concluidos, atrasados],
          backgroundColor: ["#f1c40f", "#2ecc71", "#e74c3c"]
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom"
        }
      }
    }
  });
}

onMounted(() => {
  carregarDashboard();
});
</script>

<style scoped>
.dashboard {
  padding: 2rem;
}

.card {
  margin-top: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
  max-width: 500px;
}
</style>
