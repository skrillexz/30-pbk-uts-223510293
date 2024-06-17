<template>
  <q-page class="photos-section">
    <q-banner class="q-mb-md">
      <q-icon name="photo" />
      <div>Foto pada Album</div>
    </q-banner>
    <q-btn label="Kembali ke Album" @click="goBack" class="q-mb-md" />
    <div v-if="photos.length" class="photos-grid">
      <div
        v-for="photo in photos"
        :key="photo.id"
        class="photo-item"
        @click="showPhoto(photo)"
      >
        <q-img 
          :src="photo.thumbnailUrl" 
          class="photo-thumbnail" 
          cursor="pointer"
        />
        <q-item v-if="photo.title">
          <q-item-section>
            <q-item-label>{{ photo.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>
    <q-spinner v-else color="primary" size="50px" />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const photos = ref([])

const fetchPhotos = async () => {
  try {
    const response = await fetch(`http://localhost:3000/photos?albumId=${route.params.id}`)
    photos.value = await response.json()
  } catch (error) {
    console.error('Error fetching photos:', error)
  }
}

const showPhoto = (photo) => {
  if (photo.externalUrl) {
    window.open(photo.externalUrl, '_blank') // Buka URL eksternal jika tersedia
  } else {
    window.open(photo.url, '_blank') // Buka gambar asli di tab baru
  }
}

const goBack = () => {
  router.push('/albums')
}

onMounted(() => {
  fetchPhotos()
})
</script>

<style scoped>
.photos-section {
  padding: 20px;
}

.photos-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.photo-item {
  width: calc(25% - 10px);
}

.photo-thumbnail {
  width: 100%;
  height: auto;
}
</style>
