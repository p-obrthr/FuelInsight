<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <h2 class="text-center mt-5">Login</h2>
          <form @submit.prevent="login">
            <div class="mb-3">
              <label for="email" class="form-label">Email address</label>
              <input type="email" class="form-control" v-model="email" required>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input type="password" class="form-control" v-model="password" required>
            </div>
            <button type="submit" class="btn btn-primary w-100">Login</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import AuthenticationService from '../services/AuthenticationService';
  
  const email = ref('');
  const password = ref('');
  const router = useRouter();
  
  const login = async () => {
    try {
      const response = await AuthenticationService.login({
        email: email.value,
        password: password.value
      });
      console.log(response.data.token);
      router.push({ name: 'home' });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  </script>

  