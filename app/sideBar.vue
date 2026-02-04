<script setup lang="ts">
import {computed} from 'vue'

const links = ref([{
  title: "Actions",
  href: "#",
  icon: "solar:home-smile-angle-linear",
  children: [
    {
      title: "Commandes",
      href: "#",
      icon: "solar:home-smile-angle-linear"
    },
    {
      title: "Clients",
      href: "/clients",
      icon: "solar:home-smile-angle-linear"
    },
    {
      title: "Fournisseurs",
      href: "#",
      icon: "solar:home-smile-angle-linear"
    },
    {
      title: "Produits",
      href: "#",
      icon: "solar:home-smile-angle-linear"
    }
  ]
},
  {
    title: "Stock",
    href: "#",
    icon: "solar:home-smile-angle-linear",
    children: [
      {
        title: "Transvasement",
        href: "#",
        icon: "solar:home-smile-angle-linear"
      },
      {
        title: "Sortie de Stock",
        href: "#",
        icon: "solar:home-smile-angle-linear"
      }
    ]
  },
  {
    title: "Comptabilité et Gestion",
    href: "#",
    icon: "solar:home-smile-angle-linear"
  },
  {
    title: "Maintenance",
    href: "#",
    icon: "solar:home-smile-angle-linear"
  },
])
const props = defineProps<{
  focusPage: number,
  isBurgerMenu: Boolean
}>()

const focusPageModification = ref(props.focusPage);

const children = computed(() => {
  return (links.value[focusPageModification.value]?.children) ?? [];
});

const title = computed(() => {
  return (links.value[focusPageModification.value]?.title) ?? "";
});

const emit = defineEmits<{ (e: 'update:isBurgerMenu', v: boolean): void }>()

function toggleBurger() {
  emit('update:isBurgerMenu', !props.isBurgerMenu)
}

const changeFocusPage = (index: number) => {
  focusPageModification.value = index;
  if (props.isBurgerMenu) {
    toggleBurger();
  }
  console.log(children.value);
}

const isSameBurgerPage = computed(() => {
  return props.focusPage === focusPageModification.value;
});

</script>

<template>
  <div class="flex flex-row">
    <div id="sideBar"
         class="overflow-y-auto z-20 flex flex-col bg-[#182130] min-h-screen pt-10 pl-4 pr-5 shrink-0 border border-r-gray-600 items-center gap-10">
        <img src="https://placehold.co/40x40" alt="logo VinoDomia" class="w-fit h-fit"/>

      <nav class="flex flex-col w-full gap-1">
        <div v-for="(link, key) in links" :key="key"
             class="flex flex-row items-center p-3 rounded-lg cursor-pointer gap-2"
             :class="{ 'bg-[#323f4f]': focusPage === key, 'bg-red-600' : focusPage !== key && focusPageModification === key,'bg-transparent': focusPage !== key}">
          <BaseButton @click="changeFocusPage(key)" size="md">
            <Icon :name="link.icon" class="size-6"/>
          </BaseButton>
        </div>
      </nav>
    </div>
    <div id="sideBarBurgerMenu"
         class="overflow-y-auto z-10 flex flex-col bg-[#182130] w-64 min-h-screen pt-10 pl-4 pr-5 shrink-0 transition ease-in-out duration-300"
         :class="{ 'translate-0 relative': !isBurgerMenu, '-translate-x-64 absolute': isBurgerMenu }">
      <div class="flex flex-row items-center gap-5 w-full pb-10">
        <h1 class="text-white font-bold text-xl">{{ title }}</h1>
      </div>
      <nav class="flex flex-col w-full gap-1">
        <div v-for="(link, key) in children" :key="key"
             class="flex flex-row items-center p-3 rounded-lg cursor-pointer gap-2"
             :class="{ 'bg-[#323f4f]': isSameBurgerPage && focusPage === key, 'bg-transparent': !isSameBurgerPage || focusPage !== key }">
          <Icon :name="link.icon" class="h-6 w-6"
                :class="{ 'text-white': isSameBurgerPage && focusPage === key, 'text-[#7c8491]': !isSameBurgerPage || focusPage !== key }"/>
          <NuxtLink :to="link.href"
                    :class="{ 'text-white': isSameBurgerPage && focusPage === key, 'text-[#7c8491]': !isSameBurgerPage || focusPage !== key }">
            {{ link.title }}
          </NuxtLink>
        </div>
      </nav>
    </div>
  </div>
</template>
