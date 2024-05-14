<template>
  <div class="app">
    <header>
      <h1>tambah kegiatan</h1>
      <button @click="toggleFilter">{{ showCompletedTasks ? 'Tampilkan Belum Selesai' : 'Tampilkan Sudah Selesai' }}</button>
    </header>

    <main>
      <div class="add-task">
        <input v-model="newTask" type="text" placeholder="Tambahkan kegiatan baru" @keyup.enter="addTask">
        <button @click="addTask">Tambah</button>
      </div>

      <div class="tasks">
        <div v-for="(task, index) in filteredTasks" :key="index" :class="{ 'completed': task.completed }">
          <span>{{ task.name }}</span>
          <button @click="toggleTask(index)">{{ task.completed ? 'Belum Selesai' : 'Selesai' }}</button>
          <button @click="cancelTask(index)">Batal</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const tasks = ref([]);
const newTask = ref('');
const showCompletedTasks = ref(true); // Menunjukkan apakah harus menampilkan tugas yang sudah selesai atau belum

const addTask = () => {
  if (newTask.value.trim() !== '') {
    tasks.value.push({ name: newTask.value, completed: false });
    newTask.value = '';
  }
};

const toggleTask = (index) => {
  tasks.value[index].completed = !tasks.value[index].completed;
};

const cancelTask = (index) => {
  tasks.value.splice(index, 1);
};

const incompleteTasks = computed(() => tasks.value.filter(task => !task.completed));

const toggleFilter = () => {
  showCompletedTasks.value = !showCompletedTasks.value;
};

const filteredTasks = computed(() => {
  return showCompletedTasks.value ? tasks.value : incompleteTasks.value;
});
</script>

<style scoped>
.app {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
}

header {
  text-align: center;
  margin-bottom: 20px;
}

h1 {
  color: #333;
}

.add-task {
  margin-bottom: 20px;
}

.add-task input {
  padding: 8px;
  width: 70%;
  margin-right: 10px;
}

.add-task button {
  padding: 8px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

.tasks {
  border: 1px solid #ccc;
  padding: 10px;
}

.tasks > div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.tasks > div.completed {
  text-decoration: line-through;
}

.tasks button {
  padding: 6px 10px;
  cursor: pointer;
}

.tasks button:nth-child(2) {
  background-color: #28a745;
  color: #fff;
}

.tasks button:nth-child(3) {
  background-color: #dc3545;
  color: #fff;
}
</style>
