<template>
  <div class="agendamentos-container">
    <h1>Agendamentos</h1>

    <button class="btn-cadastrar" @click="abrirModal">
      Novo Agendamento
    </button>

    <!-- Lista -->
    <ul v-if="agendamentosStore.agendamentos.length">
      <li
        v-for="ag in agendamentosStore.agendamentos"
        :key="ag._id"
        class="agendamento-item"
      >
        <div class="agendamento-info">
          <!-- ESQUERDA -->
          <div class="info-esquerda">
            <strong>{{ ag.maquina?.nome }}</strong> —
            {{ ag.data }} —
            {{ ag.responsavel }}
          </div>

          <!-- STATUS NO FINAL -->
          <span
            class="status-badge"
            :class="ag.status.toLowerCase().replace(' ', '-')"
          >
            ● {{ ag.status }}
          </span>
        </div>

        <div class="agendamento-actions">
          <button class="btn-editar" @click="editarAgendamento(ag)">Editar</button>
          <button class="btn-excluir" @click="excluirAgendamento(ag._id)">Excluir</button>
        </div>
      </li>
    </ul>

    <p v-else>Nenhum agendamento cadastrado.</p>

    <!-- Modal -->
    <div v-if="mostrarModal" class="modal-overlay" @click.self="fecharModal">
      <div class="modal">
        <h2>{{ editarId ? "Editar Agendamento" : "Novo Agendamento" }}</h2>

        <form @submit.prevent="salvarAgendamento">
          <label>
            Máquina:
            <select v-model="novoAgendamento.maquina" required>
              <option value="">Selecione uma máquina</option>
              <option
                v-for="mq in maquinasStore.maquinas"
                :key="mq._id"
                :value="mq._id"
              >
                {{ mq.nome }} ({{ mq.modelo }})
              </option>
            </select>
          </label>

          <label>
            Data da manutenção:
            <input type="date" v-model="novoAgendamento.data" required />
          </label>

          <label>
            Responsável:
            <input v-model="novoAgendamento.responsavel" required />
          </label>

          <label>
            Status:
            <select v-model="novoAgendamento.status" required>
              <option>Pendente</option>
              <option>Concluído</option>
              <option>Em atraso</option>
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
import { useAgendamentosStore } from "@/stores/agendamentosStore";

const mostrarModal = ref(false);
const editarId = ref(null);

const novoAgendamento = ref({
  maquina: "",
  data: "",
  responsavel: "",
  status: "Pendente",
});

const maquinasStore = useMaquinasStore();
const agendamentosStore = useAgendamentosStore();

/**
 * Se a data do agendamento for menor que hoje (data passada),
 * altera status para "Em atraso".
 * Retorna true se o status foi alterado (para que possamos persistir).
 */
function aplicarStatusAtrasoSeNecessario(ag) {
  if (!ag?.data) return false;

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const dataAg = new Date(ag.data);
  dataAg.setHours(0, 0, 0, 0);

  if (dataAg < hoje && ag.status !== "Em atraso") {
    ag.status = "Em atraso";
    return true;
  }

  return false;
}

/* ---------- carregar e validar ao iniciar ---------- */
onMounted(async () => {
  // carregar máquinas e agendamentos (métodos que você já usa)
  await maquinasStore.listar();
  await agendamentosStore.listar();

  // para cada agendamento, aplica status e persiste se necessário
  for (const ag of agendamentosStore.agendamentos) {
    const mudou = aplicarStatusAtrasoSeNecessario(ag);
    if (mudou && ag._id) {
      // atualiza no backend para manter consistência
      try {
        await agendamentosStore.atualizar(ag._id, {
          maquina: ag.maquina?._id ?? ag.maquina,
          data: ag.data,
          responsavel: ag.responsavel,
          status: ag.status,
        });
      } catch (err) {
        console.error("Erro ao atualizar status de atraso:", err);
      }
    }
  }
});

/* ---------- modal ---------- */
function abrirModal() {
  editarId.value = null;
  novoAgendamento.value = {
    maquina: "",
    data: "",
    responsavel: "",
    status: "Pendente",
  };
  mostrarModal.value = true;
}

function fecharModal() {
  mostrarModal.value = false;
  editarId.value = null;
  novoAgendamento.value = {
    maquina: "",
    data: "",
    responsavel: "",
    status: "Pendente",
  };
}

/* ---------- salvar (criar/atualizar) ---------- */
async function salvarAgendamento() {
  // aplica validação de atraso antes de enviar
  aplicarStatusAtrasoSeNecessario(novoAgendamento.value);

  try {
    if (editarId.value) {
      await agendamentosStore.atualizar(editarId.value, novoAgendamento.value);
    } else {
      await agendamentosStore.criar(novoAgendamento.value);
    }
    // recarrega lista para manter tudo sincronizado
    await agendamentosStore.listar();
    // depois de listar, reaplica a checagem localmente (e persiste se necessário)
    for (const ag of agendamentosStore.agendamentos) {
      const mudou = aplicarStatusAtrasoSeNecessario(ag);
      if (mudou && ag._id) {
        try {
          await agendamentosStore.atualizar(ag._id, {
            maquina: ag.maquina?._id ?? ag.maquina,
            data: ag.data,
            responsavel: ag.responsavel,
            status: ag.status,
          });
        } catch (err) {
          console.error("Erro ao persistir status após salvar:", err);
        }
      }
    }

    fecharModal();
  } catch (error) {
    alert("Erro ao salvar agendamento");
    console.error(error);
  }
}

/* ---------- editar ---------- */
function editarAgendamento(ag) {
  editarId.value = ag._id;
  // se ag.maquina for objeto, pegamos id para o select
  novoAgendamento.value = {
    maquina: ag.maquina?._id ?? ag.maquina,
    data: ag.data,
    responsavel: ag.responsavel,
    status: ag.status,
  };
  mostrarModal.value = true;
}

/* ---------- excluir ---------- */
async function excluirAgendamento(id) {
  if (!confirm("Deseja realmente excluir?")) return;

  try {
    await agendamentosStore.deletar(id);
    // recarregar
    await agendamentosStore.listar();
  } catch (error) {
    alert("Erro ao excluir agendamento");
    console.error(error);
  }
}
</script>

<style scoped>
.agendamentos-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

h1 {
  color: #333;
}

.btn-cadastrar {
  width: 200px;
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

.agendamento-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #ccc;
}

/* Igual Máquinas */
.agendamento-info {
  flex: 1;
  display: flex;
  justify-content: space-between; /* separa esquerda do status */
  align-items: center;
  padding-right: 1rem;
}

.info-esquerda {
  display: flex;
  gap: 6px;
}

/* STATUS igual Máquinas */
.status-badge {
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

/* cores do status */
.status-badge.pendente {
  color: #d9c322; /* amarelo */
}

.status-badge.concluído,
.status-badge.concluido {
  color: #1dbf1d; /* verde */
}

.status-badge.em-atraso {
  color: #d9534f; /* vermelho */
}

/* Botões */
.agendamento-actions button {
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
  width: 420px;
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
