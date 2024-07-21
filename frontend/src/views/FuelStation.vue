<template>
    <div>
      <h2>{{ data.name }}</h2>
      <h3>last ten avg: {{ data.mean }}</h3>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Price</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data.stationData" :key="item.id">
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
  
  interface StationData {
    id: number;
    name: string;
    mean: number;
    stationData: Array<{ id: number; price: number; created: string }>;
  }

  const data = ref<StationData>({
    id: 0,
    name: '',
    mean: 0,
    stationData: []
  });
  const route = useRoute();
  
  const refreshData = () => {
    const id = route.params.id;
    axios.get(`${variables.API_URL}fuelprices/${id}`)
      .then((response) => {
        // console.log(response.data);
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
  