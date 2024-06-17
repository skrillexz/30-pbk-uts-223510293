<template>
    <q-page class="albums-section">
      <q-banner class="q-mb-md">
        <q-icon name="collections" />
        <div>Album Foto</div>
      </q-banner>
      <div v-if="albums.length" class="albums-grid">
        <div
          v-for="album in albums"
          :key="album.id"
          class="album-item"
          @click="goToAlbum(album.id)"
        >
          <q-card class="my-card q-pa-sm q-mb-md">
            <!-- Menampilkan thumbnail untuk setiap album -->
            <q-img
              :src="album.thumbnailUrl"
              :alt="album.title"
              class="album-thumbnail"
            />
            <q-card-section>
              <q-item>
                <q-item-section>
                  <q-item-label>{{ album.title }}</q-item-label>
                  <q-item-label class="text-grey">{{ album.count }} foto</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <q-spinner v-else color="primary" size="50px" />
    </q-page>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const albums = ref([])
  
  const fetchAlbums = async () => {
    try {
      const response = await fetch('http://localhost:3000/albums?_embed=photos') // Mengambil data albums beserta photos yang terkait
      let data = await response.json()
  
      // Menambahkan thumbnailUrl dan count untuk setiap album
      data.forEach(album => {
        album.thumbnailUrl = getAlbumThumbnailUrl(album.id)
        album.count = album.photos.length // Menghitung jumlah foto di dalam album
      })
  
      albums.value = data
    } catch (error) {
      console.error('Error fetching albums:', error)
    }
  }
  
  const goToAlbum = (id) => {
    router.push(`/albums/${id}`)
  }
  
  const getAlbumThumbnailUrl = (albumId) => {
    // Contoh pengambilan URL thumbnail berdasarkan albumId
    switch (albumId) {
      case 1:
        return 'https://i.pinimg.com/736x/d1/cb/fb/d1cbfbdb548e276d3dfe06fa0831d086.jpg';
      case 2:
        return 'https://i.pinimg.com/564x/14/31/85/14318533b1e244cbb61465d3aa6b509a.jpg';
      case 3:
        return 'https://i.pinimg.com/736x/fc/66/41/fc6641f8dc4f3f703b623c412468841c.jpg';
      case 4:
        return 'https://i.pinimg.com/564x/e6/b0/a9/e6b0a92de5980195731454e334ce48b2.jpg';
      case 5:
        return 'https://i.pinimg.com/736x/36/2f/ee/362fee3f74d5a422ec24f1ab2459094a.jpg';
      default:
        return ''; // Handle default case if needed
    }
  }
  
  onMounted(() => {
    fetchAlbums()
  })
  </script>
  
  <style scoped>
  .albums-section {
    padding: 20px;
  }
  
  .albums-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .album-item {
    width: calc(25% - 10px);
    cursor: pointer;
  }
  
  .album-thumbnail {
    width: 100%;
    height: auto;
  }
  
  .my-card {
    max-width: 200px; /* Optional: Atur lebar maksimum kartu sesuai kebutuhan */
  }
  
  .text-grey {
    color: #888; /* Optional: Warna teks abu-abu untuk count */
  }
  </style>
  