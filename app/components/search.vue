<script setup lang="ts">
import {ref} from 'vue'
import {isAuthenticatedToken} from "~~/utils/authToken";

const value = ref('')
const isAuthenticated = ref(false);

const props = defineProps<{
  isBurgerMenu: boolean
}>()

const emit = defineEmits<{ (e: 'update:isBurgerMenu', v: boolean): void }>()

function toggleBurger() {
  emit('update:isBurgerMenu', !props.isBurgerMenu)
}

onMounted(() => {
  isAuthenticated.value = isAuthenticatedToken()
});

const logout = async () => {
  localStorage.removeItem("authToken");
  window.location.reload();
};

</script>

<template>
  <div class="search-container">
    <BaseButton size="icon-md" rounded="md" @click="toggleBurger">
      <Icon name="material-symbols:menu-rounded" class="size-4"/>
    </BaseButton>
    <BaseInput
        v-model="value"
        rounded="md"
        placeholder="Rechercher"
        class="search-input"
    >
    </BaseInput>

    <div class="action-buttons">
      <button class="icon-button notification-button">
        <img
            src="/icons/notification.png"
            alt="Notifications"
            class="notification-icon"
        />
        <span class="notification-badge"></span>
      </button>
      <BasePopover>
        <button class="icon-button user-button">
          <img
              src="/icons/utilisateur.png"
              alt="Profile"
              class="user-icon"
          />
        </button>
        <template #content>
          <div class="p-4 gap-5 flex flex-col">
            <div v-if="isAuthenticated">
              <p class="text-2xl text-gray-700 font-black text-center pb-2">User</p>
              <BaseButton size="md" variant="default"
                          class="w-full mt-2 justify-between bg-gray-100 rounded-md items-center">
                <Icon name="solar:settings-bold" class="mr-2 size-5"/>
                Paramètres
              </BaseButton>
              <BaseButton size="md" variant="default" @click="logout"
                          class="w-full mt-2 justify-between bg-gray-100 rounded-md items-center">
                <Icon name="solar:logout-2-bold" class="mr-2 size-5"/>
                Se déconnecter
              </BaseButton>
            </div>
            <div v-else>
              <BaseButton size="md" variant="default" @click="navigateTo('/login')"
                          class="w-full mt-2 justify-between bg-gray-100 rounded-md items-center">
                <Icon name="solar:login-2-bold" class="mr-2 size-5"/>
                Se Connecter
              </BaseButton>
              <BaseButton size="md" variant="default"
                          class="w-full mt-2 justify-between bg-gray-100 rounded-md items-center">
                <Icon name="solar:user-plus-bold" class="mr-2 size-5"/>
                S'inscrire
              </BaseButton>
            </div>
            <div class="bg-gray-300 w-full h-px"></div>
            <div class="flex flex-row items-center justify-around">
              <h2 class="text-md">Changer de Theme : </h2>
              <BaseThemeSystem/>
            </div>
          </div>
        </template>
      </BasePopover>
      <span class="user-badge"></span>
    </div>
  </div>
</template>

<style scoped>
.notification-icon {
  width: 20px;
  height: 20px;
}

.user-icon {
  width: 20px;
  height: 20px;
}

.search-container {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  background-color: white;
  border-bottom: 3px solid rgba(0, 0, 0, 0.1);
}

.search-input {
  flex: 1;
  max-width: 600px;
}

.search-input :deep(input) {
  background-color: #f5f5f5;
  border: none;
  padding: 8px 12px 8px 40px;
}

.action-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}

.icon-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  position: relative;
  transition: background-color 0.2s;
}

.icon-button:hover {
  background-color: #f5f5f5;
}

.notification-button {
  width: 36px;
  height: 36px;
}

.notification-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
}

.notification-badge svg {
  width: 20px;
  height: 20px;
  color: #6b7280;
}


.user-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
}

.user-badge svg {
  width: 20px;
  height: 20px;
  color: #6b7280;
}
</style>