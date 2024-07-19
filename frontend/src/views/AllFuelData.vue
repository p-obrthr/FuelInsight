<template>
    <div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="fs in fuelData" :key="fs.id">
            <td>{{ fs.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import variables from '../../variables';
  
  const fuelData = ref([]);
  
  const refreshData = () => {
    axios.get(variables.API_URL + 'fuelprices/all')
      .then((response) => {
        fuelData.value = response.data;
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
  
  onMounted(() => {
    refreshData();
  });
  </script>
  
  <style>
  </style>
  