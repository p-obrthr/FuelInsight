<template>
    <div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Price</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data" :key="item.id">
            <td>{{ item.price }}</td>
            <td>{{ item.created }}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>
  
<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import axios from 'axios';
  import { useRoute } from 'vue-router';
  import variables from '../../variables';
  
  const data = ref([]);
  const route = useRoute();
  
  const refreshData = () => {
    const id = route.params.id;
    axios.get(`${variables.API_URL}fuelprices/${id}`)
      .then((response) => {
        data.value = response.data;
      });
  };
  
  onMounted(() => {
    refreshData();
  });
  
  watch(() => route.params.id, () => {
    refreshData();
  });
</script>  
<style>
</style>
  