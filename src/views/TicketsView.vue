<template>
  <div class="tickets-page">
    <NavbarComponent :show-auth="true" />

    <v-main>
      <v-container class="py-8">
        <!-- Header -->
        <div class="d-flex justify-space-between align-center mb-6 flex-wrap">
          <div>
            <h1 class="text-h3 font-weight-bold mb-2">My Tickets</h1>
            <p class="text-body-1 text-medium-emphasis">
              Manage all your support tickets in one place
            </p>
          </div>
          <v-btn
            color="primary"
            size="large"
            @click="openDialog()"
            class="mt-4 mt-md-0"
          >
            <v-icon left>mdi-plus</v-icon>
            Create Ticket
          </v-btn>
        </div>

        <!-- Empty State -->
        <v-card v-if="tickets.length === 0" class="pa-8 text-center" elevation="0">
          <v-icon icon="mdi-ticket-outline" size="80" color="grey-lighten-1" class="mb-4"></v-icon>
          <h3 class="text-h6 text-medium-emphasis mb-2">No tickets yet</h3>
          <p class="text-body-2 text-medium-emphasis mb-4">
            Create your first ticket to get started
          </p>
          <v-btn color="primary" @click="openDialog()">
            <v-icon left>mdi-plus</v-icon>
            Create Ticket
          </v-btn>
        </v-card>

        <!-- Tickets Grid -->
        <v-row v-else>
          <v-col
            cols="12"
            sm="6"
            md="4"
            v-for="ticket in tickets"
            :key="ticket.id"
          >
            <v-card elevation="2" class="ticket-card">
              <v-card-text>
                <div class="d-flex justify-space-between align-start mb-3">
                  <h3 class="text-h6 font-weight-bold">{{ ticket.title }}</h3>
                  <div>
                    <v-btn
                      icon
                      size="small"
                      variant="text"
                      @click="openDialog(ticket)"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      size="small"
                      variant="text"
                      color="error"
                      @click="openDeleteDialog(ticket)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </div>

                <p class="text-body-2 text-medium-emphasis mb-3">
                  {{ ticket.description || 'No description provided' }}
                </p>

                <div class="d-flex gap-2 mb-3 flex-wrap">
                  <v-chip
                    :color="getStatusColor(ticket.status)"
                    size="small"
                    label
                  >
                    {{ formatStatus(ticket.status) }}
                  </v-chip>
                  <v-chip
                    v-if="ticket.priority"
                    :color="getPriorityColor(ticket.priority)"
                    size="small"
                    variant="outlined"
                    label
                  >
                    {{ ticket.priority.toUpperCase() }} Priority
                  </v-chip>
                </div>

                <p class="text-caption text-medium-emphasis">
                  Created: {{ formatDate(ticket.createdAt) }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Floating Action Button (Mobile) -->
    <v-fab
      icon="mdi-plus"
      color="primary"
      location="bottom end"
      size="large"
      class="d-md-none"
      @click="openDialog()"
    ></v-fab>

    <!-- Create/Edit Dialog -->
    <v-dialog v-model="dialog" max-width="600" persistent>
      <v-card>
        <v-card-title class="text-h5 pa-4">
          {{ editingTicket ? 'Edit Ticket' : 'Create New Ticket' }}
        </v-card-title>

        <v-card-text class="pa-4">
          <v-form @submit.prevent="handleSubmit">
            <v-text-field
              v-model="formData.title"
              label="Title"
              variant="outlined"
              :error-messages="errors.title"
              hint="Required"
              persistent-hint
              class="mb-2"
              required
            ></v-text-field>

            <v-textarea
              v-model="formData.description"
              label="Description"
              variant="outlined"
              rows="4"
              hint="Optional"
              persistent-hint
              class="mb-2"
            ></v-textarea>

            <v-select
              v-model="formData.status"
              label="Status"
              variant="outlined"
              :items="statusOptions"
              :error-messages="errors.status"
              hint="Required: open, in_progress, or closed"
              persistent-hint
              class="mb-2"
              required
            ></v-select>

            <v-select
              v-model="formData.priority"
              label="Priority"
              variant="outlined"
              :items="priorityOptions"
              hint="Optional"
              persistent-hint
            ></v-select>
          </v-form>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn @click="closeDialog">Cancel</v-btn>
          <v-btn color="primary" @click="handleSubmit">
            {{ editingTicket ? 'Update' : 'Create' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h5 pa-4">Delete Ticket?</v-card-title>
        <v-card-text class="pa-4">
          Are you sure you want to delete "{{ ticketToDelete?.title }}"? This action
          cannot be undone.
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn @click="closeDeleteDialog">Cancel</v-btn>
          <v-btn color="error" @click="confirmDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar Notification -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="4000" location="top right">
      {{ snackbar.message }}
    </v-snackbar>

    <FooterComponent />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NavbarComponent from '../components/NavbarComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import {
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket
} from '../utils/ticketStorage'

const tickets = ref([])
const dialog = ref(false)
const deleteDialog = ref(false)
const editingTicket = ref(null)
const ticketToDelete = ref(null)

const formData = ref({
  title: '',
  description: '',
  status: 'open',
  priority: 'medium'
})

const errors = ref({})
const snackbar = ref({
  show: false,
  message: '',
  color: 'success'
})

const statusOptions = [
  { title: 'Open', value: 'open' },
  { title: 'In Progress', value: 'in_progress' },
  { title: 'Closed', value: 'closed' }
]

const priorityOptions = [
  { title: 'Low', value: 'low' },
  { title: 'Medium', value: 'medium' },
  { title: 'High', value: 'high' }
]

onMounted(() => {
  loadTickets()
})

const loadTickets = () => {
  tickets.value = getTickets()
}

const openDialog = (ticket = null) => {
  if (ticket) {
    editingTicket.value = ticket
    formData.value = {
      title: ticket.title,
      description: ticket.description || '',
      status: ticket.status,
      priority: ticket.priority || 'medium'
    }
  } else {
    editingTicket.value = null
    formData.value = {
      title: '',
      description: '',
      status: 'open',
      priority: 'medium'
    }
  }
  errors.value = {}
  dialog.value = true
}

const closeDialog = () => {
  dialog.value = false
  editingTicket.value = null
  formData.value = {
    title: '',
    description: '',
    status: 'open',
    priority: 'medium'
  }
  errors.value = {}
}

const validate = () => {
  errors.value = {}

  if (!formData.value.title.trim()) {
    errors.value.title = 'Title is required'
  }

  if (!formData.value.status) {
    errors.value.status = 'Status is required'
  }

  if (!['open', 'in_progress', 'closed'].includes(formData.value.status)) {
    errors.value.status = 'Invalid status value'
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = () => {
  if (!validate()) {
    snackbar.value = {
      show: true,
      message: 'Please fix the errors in the form',
      color: 'error'
    }
    return
  }

  try {
    if (editingTicket.value) {
      updateTicket(editingTicket.value.id, formData.value)
      snackbar.value = {
        show: true,
        message: 'Ticket updated successfully!',
        color: 'success'
      }
    } else {
      createTicket(formData.value)
      snackbar.value = {
        show: true,
        message: 'Ticket created successfully!',
        color: 'success'
      }
    }

    loadTickets()
    closeDialog()
  } catch (error) {
    snackbar.value = {
      show: true,
      message: 'Failed to save ticket. Please try again.',
      color: 'error'
    }
  }
}

const openDeleteDialog = (ticket) => {
  ticketToDelete.value = ticket
  deleteDialog.value = true
}

const closeDeleteDialog = () => {
  deleteDialog.value = false
  ticketToDelete.value = null
}

const confirmDelete = () => {
  try {
    deleteTicket(ticketToDelete.value.id)
    snackbar.value = {
      show: true,
      message: 'Ticket deleted successfully!',
      color: 'success'
    }
    loadTickets()
    closeDeleteDialog()
  } catch (error) {
    snackbar.value = {
      show: true,
      message: 'Failed to delete ticket. Please try again.',
      color: 'error'
    }
  }
}

const getStatusColor = (status) => {
  switch (status) {
    case 'open':
      return 'success'
    case 'in_progress':
      return 'warning'
    case 'closed':
      return 'grey'
    default:
      return 'grey'
  }
}

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high':
      return 'error'
    case 'medium':
      return 'warning'
    case 'low':
      return 'info'
    default:
      return 'grey'
  }
}

const formatStatus = (status) => {
  return status.replace('_', ' ').toUpperCase()
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<style scoped>
.tickets-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f5f5;
}

.ticket-card {
  transition: transform 0.2s;
  height: 100%;
}

.ticket-card:hover {
  transform: translateY(-4px);
}

.gap-2 {
  gap: 0.5rem;
}
</style>