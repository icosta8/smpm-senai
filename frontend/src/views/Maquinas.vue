<template>
  <div class="maquinas-container">
    <h1>Máquinas</h1>

    <button class="btn-cadastrar" @click="abrirModal">
      Cadastrar Máquina
    </button>

    <!-- Lista de Máquinas -->
    <ul v-if="maquinasStore.maquinas.length">
      <li v-for="maquina in maquinasStore.maquinas" :key="maquina._id" class="maquina-item">
        <div class="maquina-info">
          <strong>{{ maquina.nome }}</strong> - {{ maquina.modelo }} - {{ maquina.status }}
        </div>
        <div class="maquina-actions">
          <button class="btn-editar" @click="editarMaquina(maquina)">Editar</button>
          <button class="btn-excluir" @click="excluirMaquina(maquina._id)">Excluir</button>
        </div>
      </li>
    </ul>
    <p v-else>Nenhuma máquina cadastrada.</p>

    <!-- Modal -->
    <div v-if="mostrarModal" class="modal-overlay" @click.self="fecharModal">
      <div class="modal">
        <h2>{{ editarId ? "Editar Máquina" : "Cadastrar Máquina" }}</h2>

        <form @submit.prevent="salvarMaquina">
          <label>
            Nome:
            <input v-model="novaMaquina.nome" required />
          </label>

          <label>
            Modelo:
            <select v-model="novaMaquina.modelo" required>
              <option value="">Selecione um modelo</option>
              <option value="Pneumática">Pneumática</option>
              <option value="Hidráulica">Hidráulica</option>
              <option value="Elétrica">Elétrica</option>
              <option value="CNC">CNC</option>
              <option value="Convencional">Convencional</option>
              <option value="Robótica">Robótica</option>
            </select>
          </label>

          <label>
            Número de Série:
            <input v-model="novaMaquina.numeroSerie" required />
          </label>

          <label>
            Status:
            <select v-model="novaMaquina.status" required>
              <option value="Ativa">Ativa</option>
              <option value="Em manutenção">Em manutenção</option>
              <option value="Inativa">Inativa</option>
            </select>
          </label>

          <div class="modal-actions">
            <button type="button" class="btn-cancelar" @click="fecharModal">Cancelar</button>
            <button type="submit" class="btn-salvar">{{ editarId ? "Atualizar" : "Salvar" }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useMaquinasStore } from "@/stores/maquinasStore";

const mostrarModal = ref(false);
const editarId = ref(null);

const novaMaquina = ref({
  nome: "",
  modelo: "",
  numeroSerie: "",
  status: "Ativa"
});

const maquinasStore = useMaquinasStore();

// Abrir/Fechar Modal
function abrirModal() {
  mostrarModal.value = true;
}
function fecharModal() {
  mostrarModal.value = false;
  editarId.value = null;
  novaMaquina.value = { nome: "", modelo: "", numeroSerie: "", status: "Ativa" };
}

// Salvar ou editar máquina
async function salvarMaquina() {
  try {
    if (editarId.value) {
      // Se estiver editando
      await maquinasStore.atualizar(editarId.value, novaMaquina.value);
      alert("Máquina atualizada com sucesso!");
    } else {
      await maquinasStore.criar(novaMaquina.value);
      alert("Máquina cadastrada com sucesso!");
    }

    fecharModal();
  } catch (error) {
    alert("Erro ao salvar máquina");
    console.error(error);
  }
}

// Editar máquina
function editarMaquina(maquina) {
  novaMaquina.value = { ...maquina };
  editarId.value = maquina._id;
  abrirModal();
}

// Excluir máquina
async function excluirMaquina(id) {
  if (!confirm("Tem certeza que deseja excluir esta máquina?")) return;

  try {
    await maquinasStore.deletar(id);
    alert("Máquina excluída com sucesso!");
  } catch (error) {
    alert("Erro ao excluir máquina");
    console.error(error);
  }
}

// Carregar todas as máquinas ao montar o componente
onMounted(() => {
  maquinasStore.listar();
});
</script>

<style scoped>
.maquinas-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

h1 {
  color: #333;
}

.btn-cadastrar {
  width: 180px;
  padding: 0.7rem 1rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}

.btn-cadastrar:hover {
  background-color: #357ab8;
}

ul {
  list-style: none;
  padding: 0;
}

.maquina-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #ccc;
}

.maquina-actions button {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  margin-left: 0.5rem;
  transition: background 0.2s;
}

.btn-editar {
  background-color: #f0ad4e;
  color: white;
}
.btn-editar:hover {
  background-color: #ec971f;
}

.btn-excluir {
  background-color: #d9534f;
  color: white;
}
.btn-excluir:hover {
  background-color: #c9302c;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal {
  background: white;
  padding: 2rem;
  width: 400px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal label {
  display: flex;
  flex-direction: column;
  font-weight: 600;
  color: #333;
}

.modal input,
.modal select {
  margin-top: 4px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-cancelar,
.btn-salvar {
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.btn-cancelar {
  background-color: #aaa;
  color: white;
}

.btn-cancelar:hover {
  background-color: #888;
}

.btn-salvar {
  background-color: #4a90e2;
  color: white;
}

.btn-salvar:hover {
  background-color: #357ab8;
}
</style>
