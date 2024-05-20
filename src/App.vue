<template>
  <div>
    <header>
      <nav>
        <ul>
          <li><a @click="showTodos" href="#">Todos</a></li>
          <li><a @click="showPosts" href="#">Posts</a></li>
        </ul>
      </nav>
    </header>

    <div id="content">
      <Todos v-if="showing === 'todos'" />
      <Posts v-else-if="showing === 'posts'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Todos from './components/Todos.vue';
import Posts from './components/Posts.vue';

const showing = ref('todos');

const showTodos = () => {
  showing.value = 'todos';
};

const showPosts = () => {
  showing.value = 'posts';
};
</script>

<style scoped>
header {
  text-align: center;
}

nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

nav ul li {
  display: inline;
  margin-right: 10px;
}
</style>
