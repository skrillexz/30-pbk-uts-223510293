<template>
    <div class="posts-section">
      <h2>Postingan</h2>
      <div class="user-select">
        <select @change="fetchPosts" v-model="selectedUser">
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
      </div>
  
      <div class="post-list" v-if="posts.length">
        <div v-for="post in posts" :key="post.id" class="post">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </div>
      </div>
  
      <div v-else>
        <p>Loading posts...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  
  const users = ref([]);
  const selectedUser = ref(1);
  const posts = ref([]);
  
  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      users.value = await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  
  const fetchPosts = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.value}`);
      posts.value = await response.json();
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  
  onMounted(() => {
    fetchUsers();
    fetchPosts();
  });
  
  watch(selectedUser, fetchPosts);
  </script>
  
  <style scoped>
  .posts-section {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .posts-section h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .user-select select {
    padding: 8px;
  }
  
  .post-list .post {
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
  }
  
  .post-list .post h3 {
    margin: 0;
  }
  
  .post-list .post p {
    margin: 5px 0 0;
  }
  </style>
  