<template>
  <div class="dashboard-page">
    <NavbarComponent :show-auth="true" />

    <v-main>
      <v-container class="py-8">
        <!-- Welcome Section -->
        <v-card
          class="welcome-card pa-6 mb-6"
          color="primary"
          variant="flat"
        >
          <h1 class="text-h3 text-white font-weight-bold mb-2">
            Welcome back, {{ userName }}! 👋
          </h1>
          <p class="text-h6 text-white mb-4" style="opacity: 0.9">
            Here's what's happening with your tickets today
          </p>
          <v-btn
            color="white"
            size="large"
            @click="$router.push('/tickets')"
          >
            Manage Tickets
            <v-icon right>mdi-arrow-right</v-icon>
          </v-btn>
        </v-card>

        <!-- Stats Section -->
        <h2 class="text-h4 font-weight-bold mb-4">Ticket Statistics</h2>

        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="3"
            v-for="stat in statsCards"
            :key="stat.title"
          >
            <v-card class="stat-card text-center pa-4" elevation="2">
              <div
                class="stat-icon-container mx-auto mb-3"
                :style="{ backgroundColor: stat.bgColor }"
              >
                <v-icon :icon="stat.icon" size="50" :color="stat.color"></v-icon>
              </div>
              <h3 class="text-h3 font-weight-bold mb-2" :style="{ color: stat.color }">
                {{ stat.value }}
              </h3>
              <p class="text-h6 text-medium-emphasis">{{ stat.title }}</p>
            </v-card>
          </v-col>
        </v-row>

        <!-- Quick Actions -->
        <h2 class="text-h4 font-weight-bold mt-8 mb-4">Quick Actions</h2>

        <v-row>
          <v-col cols="12" md="6">
            <v-card class="pa-4" elevation="2">
              <h3 class="text-h6 font-weight-bold mb-2">Create New Ticket</h3>
              <p class="text-body-2 text-medium-emphasis mb-4">
                Report a new issue or request support
              </p>
              <v-btn color="primary" block @click="$router.push('/tickets')">
                Create Ticket
              </v-btn>
            </v-card>
          </v-col>

          <v-col cols="12" md="6">
            <v-card class="pa-4" elevation="2">
              <h3 class="text-h6 font-weight-bold mb-2">View All Tickets</h3>
              <p class="text-body-2 text-medium-emphasis mb-4">
                Browse and manage all your tickets
              </p>
              <v-btn variant="outlined" color="primary" block @click="$router.push('/tickets')">
                View Tickets
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <FooterComponent />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import NavbarComponent from '../components/NavbarComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import { getTicketStats } from '../utils/ticketStorage'
import { getCurrentUser } from '../utils/auth'

const user = getCurrentUser()
const userName = computed(() => user?.name || 'User')

const stats = ref({
  total: 0,
  open: 0,
  in_progress: 0,
  closed: 0
})

onMounted(() => {
  const ticketStats = getTicketStats()
  stats.value = ticketStats
})

const statsCards = computed(() => [
  {
    title: 'Total Tickets',
    value: stats.value.total,
    icon: 'mdi-ticket-confirmation',
    color: '#667eea',
    bgColor: '#e8eaf6'
  },
  {
    title: 'Open Tickets',
    value: stats.value.open,
    icon: 'mdi-clock-outline',
    color: '#4caf50',
    bgColor: '#e8f5e9'
  },
  {
    title: 'In Progress',
    value: stats.value.in_progress,
    icon: 'mdi-progress-clock',
    color: '#ff9800',
    bgColor: '#fff3e0'
  },
  {
    title: 'Closed Tickets',
    value: stats.value.closed,
    icon: 'mdi-check-circle',
    color: '#757575',
    bgColor: '#f5f5f5'
  }
])
</script>

<style scoped>
.dashboard-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f5f5;
}

.welcome-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  border-radius: 16px;
}

.stat-card {
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-8px);
}

.stat-icon-container {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>