<template>
  <div class="auth-page">
    <v-container>
      <v-card max-width="450" class="mx-auto pa-6">
        <v-card-title class="text-h4 text-center text-primary font-weight-bold mb-2">
          Create Account
        </v-card-title>
        <v-card-subtitle class="text-center mb-4">
          Join TicketMaster today
        </v-card-subtitle>

        <v-form @submit.prevent="handleSubmit">
          <v-text-field
            v-model="formData.name"
            label="Full Name"
            variant="outlined"
            :error-messages="errors.name"
            required
            class="mb-2"
          ></v-text-field>

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
            class="mb-2"
          ></v-text-field>

          <v-text-field
            v-model="formData.confirmPassword"
            label="Confirm Password"
            type="password"
            variant="outlined"
            :error-messages="errors.confirmPassword"
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
            Sign Up
          </v-btn>

          <div class="text-center">
            <span class="text-body-2">Already have an account? </span>
            <router-link to="/login" class="text-primary font-weight-bold text-decoration-none">
              Login
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
import { signup } from '../utils/auth'

const router = useRouter()

const formData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
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

  if (!formData.value.name.trim()) {
    errors.value.name = 'Name is required'
  }

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

  if (!formData.value.confirmPassword) {
    errors.value.confirmPassword = 'Please confirm your password'
  } else if (formData.value.password !== formData.value.confirmPassword) {
    errors.value.confirmPassword = 'Passwords do not match'
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
    await signup(formData.value.name, formData.value.email, formData.value.password)
    snackbar.value = {
      show: true,
      message: 'Account created successfully! Redirecting...',
      color: 'success'
    }

    setTimeout(() => {
      router.push('/dashboard')
    }, 1000)
  } catch (error) {
    snackbar.value = {
      show: true,
      message: error.message || 'Signup failed. Please try again.',
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