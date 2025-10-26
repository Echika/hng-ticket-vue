<template>
  <div class="auth-page">
    <v-container>
      <v-card max-width="450" class="mx-auto pa-6">
        <v-card-title class="text-h4 text-center text-primary font-weight-bold mb-2">
          Welcome Back
        </v-card-title>
        <v-card-subtitle class="text-center mb-4">
          Login to manage your tickets
        </v-card-subtitle>

        <v-alert type="info" variant="tonal" class="mb-4">
          <div class="text-body-2">
            <strong>Test Credentials:</strong><br />
            Email: test@example.com<br />
            Password: password123
          </div>
        </v-alert>

        <v-form @submit.prevent="handleSubmit">
          <v-text-field
            v-model="formData.email"
            label="Email Address"
            type="email"
            variant="outlined"
            :error-messages="errors.email"
            required
            class="mb-2"
          ></v-text-field>

          <v-text-field
            v-model="formData.password"
            label="Password"
            type="password"
            variant="outlined"
            :error-messages="errors.password"
            required
            class="mb-4"
          ></v-text-field>

          <v-btn
            type="submit"
            color="primary"
            size="large"
            :loading="loading"
            :disabled="loading"
            block
            class="mb-4"
          >
            Login
          </v-btn>

          <div class="text-center">
            <span class="text-body-2">Don't have an account? </span>
            <router-link to="/signup" class="text-primary font-weight-bold text-decoration-none">
              Sign Up
            </router-link>
          </div>
        </v-form>
      </v-card>
    </v-container>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="4000" location="top right">
      {{ snackbar.message }}
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../utils/auth'

const router = useRouter()

const formData = ref({
  email: '',
  password: ''
})

const errors = ref({})
const loading = ref(false)
const snackbar = ref({
  show: false,
  message: '',
  color: 'success'
})

const validate = () => {
  errors.value = {}

  if (!formData.value.email.trim()) {
    errors.value.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
    errors.value.email = 'Please enter a valid email'
  }

  if (!formData.value.password) {
    errors.value.password = 'Password is required'
  } else if (formData.value.password.length < 6) {
    errors.value.password = 'Password must be at least 6 characters'
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validate()) {
    snackbar.value = {
      show: true,
      message: 'Please fix the errors in the form',
      color: 'error'
    }
    return
  }

  loading.value = true

  try {
    await login(formData.value.email, formData.value.password)
    snackbar.value = {
      show: true,
      message: 'Login successful! Redirecting...',
      color: 'success'
    }

    setTimeout(() => {
      router.push('/dashboard')
    }, 1000)
  } catch (error) {
    snackbar.value = {
      show: true,
      message: error.message || 'Login failed. Please try again.',
      color: 'error'
    }
    loading.value = false
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.text-primary {
  color: #667eea !important;
}
</style>