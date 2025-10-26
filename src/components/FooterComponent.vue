<template>
  <v-footer color="#2c3e50" class="text-white py-6 mt-auto">
    <v-container>
      <div class="text-center">
        <p class="text-body-1 mb-2">
          © {{ currentYear }} TicketMaster. Built for HNG Internship Stage 2.
        </p>
        <p class="text-body-2" style="opacity: 0.8">
          Made with ❤️ by Echika Raphael
        </p>
      </div>
    </v-container>
  </v-footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>