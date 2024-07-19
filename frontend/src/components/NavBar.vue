<template>
    <nav class="navbar navbar-expand-sm bg-light navbar-dark">
      <ul class="navbar-nav">
        <li v-for="link in navLinks" :key="link.path" class="nav-item m-1">
          <router-link class="btn btn-light btn-outline-primary" :to="link.path">{{ link.label }}</router-link>
        </li>
      </ul>
    </nav>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { RouterLink } from 'vue-router';
  import axios from 'axios';
  import variables from '../../variables'
  
  interface NavLink {
    label: string;
    path: string;
  }
  
  const navLinks = ref<NavLink[]>([
    { label: 'Home', path: '/' },
    { label: 'All', path: '/all' },
    { label: 'Current', path: '' }
  ]);
  
  const fetchFuelStationNames = async () => {
    try {
      const response = await axios.get(`${variables.API_URL}fuelstations/all`);
      const fuelStationLinks = response.data.map((fs: any) => ({
        label: fs.name,
        path: `/fuelstations/${fs.id}`
      }));
      navLinks.value = [...navLinks.value, ...fuelStationLinks];
    } catch (error) {
      console.error("Error fetching fuel station names:", error);
    }
  };
  
  onMounted(() => {
    fetchFuelStationNames();
  });
  </script>
  
  <style>
  </style>
  