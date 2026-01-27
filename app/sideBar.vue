<script setup lang="ts">
const links = ref([{
  title: "Tableau de bord",
  href: "#",
  icon: "solar:home-smile-angle-linear"
}, {
  title: "Actions commerciales",
  href: "#",
  icon: "solar:home-smile-angle-linear"
},
  {
    title: "Action liés",
    href: "#",
    icon: "solar:home-smile-angle-linear"
  },
  {
    title: "Commandes ce mois",
    href: "#",
    icon: "solar:home-smile-angle-linear"
  },
  {
    title: "Status",
    href: "#",
    icon: "solar:home-smile-angle-linear"
  },
  {
    title: "Maintenance",
    href: "#",
    icon: "solar:home-smile-angle-linear"
  },
  {
    title: "Comptabilité et gestions",
    href: "#",
    icon: "solar:home-smile-angle-linear"
  }
])
defineProps<{
  focusPage: Number
}>()
</script>

<template>
  <div id="sideBar"
       class="overflow-hidden fixed left-0 top-0 z-1 flex flex-col bg-[#182130] w-3xs h-full pt-10 pl-4 pr-5">
    <div class="flex flex-row items-center gap-5 w-full pb-10">
      <img src="https://placehold.co/40x40" alt="logo VinoDomia"/>
      <h1 class="text-white font-bold text-xl">Vino Domia</h1>
    </div>
    <div class="flex flex-col justify-between w-full" v-for="(link, key) in links" :key="link.href">
      <div class="flex flex-row items-center p-3 rounded-lg cursor-pointer gap-2"
           :class="{ 'bg-[#323f4f]': focusPage === key, 'bg-transparent': focusPage !== key }">
        <Icon :name="link.icon" class="h-6 w-6"
              :class="{ 'text-white': focusPage === key, 'text-[#7c8491]': focusPage !== key }"/>
        <router-link :to="link.href" :class="{ 'text-white': focusPage === key, 'text-[#7c8491]': focusPage !== key }">
          {{ link.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
div {
}
</style>