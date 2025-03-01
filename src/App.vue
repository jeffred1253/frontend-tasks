<script setup>
import TasksTable from './components/TasksTable.vue'
import Dashboard from './components/Dashboard.vue'
import AuthenticationView from './views/AuthenticationView.vue'
</script>

<template>
  <nav>
    <router-link to="/">Tableau de bord</router-link>
    <router-link to="/myTasks">Mes tâches</router-link>
    <router-link to="/login">Connexion</router-link>
    <router-link to="/register">S'inscrire</router-link>
  </nav>

  <router-view></router-view>
  <Dashboard/>
</template>

<style scoped>

</style>
