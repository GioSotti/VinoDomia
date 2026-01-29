<template>
  <div class="search-container">
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
      <button class="icon-button user-button">
        <img
            src="/icons/utilisateur.png"
            alt="Profile"
            class="user-icon"
        />
      </button>
      <span class ="user-badge"></span>
    </div>
  </div>
</template>

<style scoped>
.notification-icon {
  width: 20px;
  height: 20px;
}

.user-icon{
  width: 20px;
  height: 20px;
}
</style>


<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>

<style scoped>
.search-container {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  background-color: white;
  width: 100%;
}

.search-input {
  flex: 1;
  max-width: 600px;
  position: relative;
}

.search-input :deep(input) {
  background-color: #f5f5f5;
  border: none;
  padding: 8px 12px 8px 40px;
}

.search-icon {
  width: 18px;
  height: 18px;
  color: #9ca3af;
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
}

.action-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
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