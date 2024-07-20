<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <h2 class="text-center mt-5">Register</h2>
                <form>
                    <div class="mb-3">
                        <label for="username" class="form-label">Username</label>
                        <input type="text" class="form-control" v-model="username" required>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email address</label>
                        <input type="email" class="form-control" v-model="email" required>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" v-model="password" required>
                    </div>
                    <!-- <div class="mb-3">
                        <label for="confirmPassword" class="form-label">Confirm Password</label>
                        <input type="password" class="form-control" id="confirmPassword" required>
                    </div> -->
                    <button type="submit" class="btn btn-primary w-100" @click="register" >Register</button>
                </form>
            </div>
        </div>
    </div>
  </template>
  
  <script setup lang="ts"> 
  import { ref } from 'vue';
  import AuthenticationService from '../services/AuthenticationService';

  const email = ref('');
const password = ref('');
const username = ref('')
const register = async () => {
  try {
    const response = await AuthenticationService.register({
      username: username.value,
      email: email.value,
      password: password.value
    });
    console.log(response.data);
  } catch (error) {
    console.error('Registration failed:', error);
  }
};
  </script>
  
  <style>
  </style>
  