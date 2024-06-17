import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAlbumStore = defineStore('albums', () => {
  const albums = ref([])

  // Simulasi data photos
  const photos = [
    { albumId: 1, id: 1 },
    { albumId: 1, id: 2 },
    { albumId: 1, id: 3 },
    { albumId: 2, id: 4 },
    { albumId: 2, id: 5 },
    { albumId: 3, id: 6 },
  ]

  // Fetch data albums from API
  const fetchAlbums = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('http://localhost:3000/albums')
      albums.value = await response.json()

      // Calculate count of photos for each album
      albums.value.forEach(album => {
        const photoCount = photos.filter(photo => photo.albumId === album.id).length
        album.count = photoCount
      })
    } catch (error) {
      console.error('Error fetching albums:', error)
    }
  }

  // Increment count (example function)
  function incrementCount(albumId) {
    const album = albums.value.find(album => album.id === albumId)
    if (album) {
      album.count++
    }
  }

  return { albums, fetchAlbums, incrementCount }
})
