<script setup lang="ts">
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

const value = ref('')

const breakpoints = {
  320: { itemsToShow: 1 },
  768: { itemsToShow: 2 },
  1024: { itemsToShow: 3 },
  1280: { itemsToShow: 4 }
}

const columns = ref([
  {
    title: 'À faire',
    tasks: [
      {
        id: 1,
        title: 'Client entretien restants actions commerciales',
        dueDate: '16 Sept 2023',
        status: 'Assigné',
        statusClass: 'bg-blue-100 text-blue-800',
        avatar: '/avatar1.png'
      },
      {
        id: 2,
        title: 'Commande sauvegarder ins 30 jours start/arréter',
        dueDate: '18 Sept 2023',
        status: 'Assigné',
        statusClass: 'bg-blue-100 text-blue-800',
        avatar: '/avatar2.png'
      }
    ]
  },
  {
    title: 'En cours',
    tasks: [
      {
        id: 3,
        title: 'Commandes warehouse ins sa panel client',
        dueDate: '14 Sept 2023',
        status: 'Assigné',
        statusClass: 'bg-blue-100 text-blue-800',
        avatar: '/avatar3.png'
      },
      {
        id: 4,
        title: 'Client des ports les commerciales sur le enfants',
        dueDate: '16 Sept 2023',
        status: 'Assigné',
        statusClass: 'bg-blue-100 text-blue-800',
        avatar: '/avatar4.png'
      }
    ]
  },
  {
    title: 'Terminé',
    tasks: [
      {
        id: 5,
        title: 'Commandes devour warehouse automatique de',
        dueDate: '14 Sept 2023',
        status: 'Assigné',
        statusClass: 'bg-blue-100 text-blue-800',
        avatar: '/avatar5.png'
      }
    ]
  }
])

</script>


<template>
  <AppOverlay>
    <div class="p-10">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-bold text-600 bg-#1E293B">Actions Commerciales</h1>
        <BaseButton size="md" style="margin-right: 100px; background-color: #1E293B; color: white">
          + Nouvelle Action
        </BaseButton>
      </div>
      <div class="flex items-center justify-between p-10">
        <BaseInput
            v-model="value"
            rounded="md"
            placeholder="Rechercher"
            style="width: 400px; margin: 20px"
        />
      </div>

      <div>
        <Carousel :items-to-show="3" :wrap-around="false" :breakpoints="breakpoints">
          <Slide v-for="(column, index) in columns" :key="index">
            <div class="px-3">
              <BaseCard class="p-4 min-h-[500px]" style="background-color: lightgray;">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg font-semibold">{{ column.title }}</h3>
                  <button class="text-gray-400 hover:text-gray-600">•••</button>
                </div>
                <div class="space-y-3">
                  <BaseCard
                      v-for="task in column.tasks"
                      :key="task.id"
                      class="p-4 bg-white border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <p class="text-sm font-medium mb-2">{{ task.title }}</p>
                    <div class="flex items-center text-xs text-gray-500 mb-3">
                      <span class="mr-2">{{ task.dueDate }}</span>
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="text-xs px-2 py-1 rounded" :class="task.statusClass">
                        {{ task.status }}
                      </span>
                      <img src="/icons/utilisateur.png" class="w-6 h-6 rounded-full" alt="avatar" />
                    </div>
                  </BaseCard>
                </div>
                <button class="w-full text-center text-gray-400 hover:text-gray-600 mt-4">
                  +
                </button>
              </BaseCard>
            </div>
          </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
    </div>
  </AppOverlay>
</template>

<style scoped>
body{
  background-color: #F8FAFC;
}
.carousel-item {
  width: 90%;
  height: 300px;
  background-color: lightgrey;
  border-radius: 10px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.carousel__track) {
  align-items: flex-start !important;
  justify-content: flex-start !important;
}

:deep(.carousel__slide) {
  align-self: flex-start !important;
}

:deep(.carousel__viewport) {
  overflow: visible;
}

:deep(.carousel__track) {
  transform: translateX(0) !important;
}

</style>


