<template>
  <v-app-bar color="white" elevation="2" app>
    <v-container class="d-flex align-center justify-space-between">
      <div class="d-flex align-center" style="cursor: pointer" @click="goHome">
        <v-icon color="primary" class="mr-2">mdi-ticket-confirmation</v-icon>
        <v-toolbar-title class="text-primary font-weight-bold">
          TicketMaster
        </v-toolbar-title>
      </div>

      <div v-if="showAuth" class="d-flex align-center ga-3">
        <span class="text-body-2 d-none d-md-block">{{ userName }}</span>
        <v-btn variant="outlined" color="primary" @click="handleLogout">
          <v-icon left>mdi-logout</v-icon>
          Logout
        </v-btn>
      </div>

      <div v-else class="d-flex ga-2">
        <v-btn @click="$router.push('/login')">Login</v-btn>
        <v-btn variant="flat" color="primary" @click="$router.push('/signup')">
          Sign Up
        </v-btn>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { logout, getCurrentUser } from '../utils/auth'

const props = defineProps({
  showAuth: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()
const user = getCurrentUser()

const userName = computed(() => user?.name || user?.email || '')

const goHome = () => {
  router.push(props.showAuth ? '/dashboard' : '/')
}

const handleLogout = () => {
  logout()
  router.push('/')
}
</script>

<style scoped>
.text-primary {
  color: #667eea !important;
}
</style>