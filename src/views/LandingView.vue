<template>
  <div class="landing-page">
    <NavbarComponent />

    <!-- Hero Section -->
    <section class="hero">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>

      <v-container class="hero-content">
        <h1 class="hero-title">Manage Your Tickets Effortlessly</h1>
        <p class="hero-subtitle">
          Streamline your support workflow with our powerful ticket management system.
          Track, organize, and resolve issues faster than ever.
        </p>
        <div class="hero-buttons">
          <v-btn
            size="large"
            color="white"
            class="text-primary mr-4 mb-2"
            @click="$router.push('/signup')"
          >
            Get Started
          </v-btn>
          <v-btn
            size="large"
            variant="outlined"
            color="white"
            class="mb-2"
            @click="$router.push('/login')"
          >
            Login
          </v-btn>
        </div>
      </v-container>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <v-container>
        <h2 class="section-title">Why Choose TicketMaster?</h2>

        <v-row>
          <v-col cols="12" md="4" v-for="feature in features" :key="feature.title">
            <v-card class="feature-card" elevation="2">
              <v-card-text class="text-center pa-6">
                <v-icon :icon="feature.icon" size="60" color="primary" class="mb-4"></v-icon>
                <h3 class="feature-title mb-3">{{ feature.title }}</h3>
                <p class="feature-text">{{ feature.description }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <FooterComponent />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NavbarComponent from '../components/NavbarComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'

const features = ref([
  {
    icon: 'mdi-ticket-confirmation',
    title: 'Easy Ticket Management',
    description: 'Create, view, edit, and delete tickets with an intuitive interface designed for efficiency.'
  },
  {
    icon: 'mdi-speedometer',
    title: 'Real-time Updates',
    description: 'Track ticket status changes in real-time with instant notifications and updates.'
  },
  {
    icon: 'mdi-shield-check',
    title: 'Secure & Reliable',
    description: 'Your data is protected with industry-standard security measures and encryption.'
  }
])
</script>

<style scoped>
.landing-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Hero Section */
.hero {
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 600px;
  display: flex;
  align-items: center;
  color: white;
  overflow: hidden;
}

.hero::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23f5f5f5' fill-opacity='1' d='M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: cover;
}

.circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  z-index: 1;
}

.circle-1 {
  width: 300px;
  height: 300px;
  top: -100px;
  right: 10%;
}

.circle-2 {
  width: 200px;
  height: 200px;
  bottom: 100px;
  left: 5%;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 4rem 1rem;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.95;
}

.hero-buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

/* Features Section */
.features-section {
  padding: 4rem 0;
  background: #f5f5f5;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 3rem;
  color: #333;
}

.feature-card {
  height: 100%;
  transition: transform 0.2s;
}

.feature-card:hover {
  transform: translateY(-8px);
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
}

.feature-text {
  color: #666;
  line-height: 1.6;
}

.text-primary {
  color: #667eea !important;
}

/* Responsive */
@media (max-width: 960px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }
}

@media (max-width: 600px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-content {
    padding: 2rem 1rem;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>