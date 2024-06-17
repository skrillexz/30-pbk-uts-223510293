<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <router-link to="/" class="q-mr-xs">Home</router-link>
          <router-link to="/todos" class="q-mr-xs">Todos</router-link>
          <router-link to="/posts" class="q-mr-xs">Posts</router-link>
          <router-link to="/albums" class="q-mr-xs">Albums</router-link>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { defineComponent } from 'vue'

// Optionally, you can import Quasar plugins or components here
// import { Quasar, Notify } from 'quasar'
// import { useQuasar } from 'quasar'

const app = defineComponent({
  name: 'App'
})

// const $q = useQuasar()
// $q.notify({ message: 'Quasar is ready!' })
</script>

<style>
/* Anda dapat menyesuaikan gaya di sini */
</style>
