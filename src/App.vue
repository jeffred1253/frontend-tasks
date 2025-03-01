<script setup>
  
</script>

<template>
  <div class="flex flex-col md:flex-row h-screen">
    <nav class="w-full md:w-64 bg-gray-800 text-white p-4 space-y-4 md:h-screen">
      <h2 class="text-lg font-semibold mb-4">Menu</h2>
      <router-link to="/" class="block px-4 py-2 rounded-md hover:bg-gray-700">Tableau de bord</router-link>
      <router-link to="/myTasks" class="block px-4 py-2 rounded-md hover:bg-gray-700">Mes tâches</router-link>
      <router-link to="/login" class="block px-4 py-2 rounded-md hover:bg-gray-700">Connexion</router-link>
      <router-link to="/register" class="block px-4 py-2 rounded-md hover:bg-gray-700">S'inscrire</router-link>
    </nav>
    
    <div class="flex-1 p-6 overflow-auto">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>

</style>
