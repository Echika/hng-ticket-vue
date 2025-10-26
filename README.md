# TicketMaster - Vue.js Ticket Management App

A modern, full-featured ticket management web application built with Vue 3, Vite, and Vuetify for HNG Internship Stage 2.

## 🚀 Live Demo

**Live URL:** https://stellular-blini-420722.netlify.app/

## 📋 Overview

TicketMaster is a comprehensive ticket management system that allows users to create, view, edit, and delete support tickets with an intuitive and beautiful interface. This is the **Vue.js implementation** of the multi-framework ticket management project, featuring the exact same functionality and design as the React version.

## ✨ Features

### Core Functionality
- ✅ **Landing Page** - Hero section with wavy SVG background, decorative circles, and feature cards
- ✅ **Authentication** - Secure login and signup with form validation
- ✅ **Dashboard** - Real-time ticket statistics and quick actions
- ✅ **Ticket Management** - Full CRUD operations (Create, Read, Update, Delete)
- ✅ **Protected Routes** - Session-based authentication using localStorage
- ✅ **Responsive Design** - Works perfectly on mobile, tablet, and desktop

### Design Elements (As Per Requirements)
- ✅ **Max Width 1440px** - Centered layout on large screens
- ✅ **Wavy Hero Background** - SVG wave at bottom of hero section
- ✅ **Decorative Circles** - Multiple circular elements across the site
- ✅ **Box-shaped Sections** - Card-style components with shadows and rounded corners
- ✅ **Status Color Coding**:
  - Open → Green
  - In Progress → Amber/Orange
  - Closed → Gray

### Validation & Error Handling
- ✅ **Form Validation** - Real-time validation with inline error messages
- ✅ **Toast Notifications** - Success and error feedback for all actions
- ✅ **Required Fields** - Title and status are mandatory
- ✅ **Status Validation** - Only accepts "open", "in_progress", "closed"
- ✅ **Session Management** - Unauthorized users redirected to login page

## 🛠️ Tech Stack

- **Frontend Framework:** Vue 3 (Composition API with `<script setup>`)
- **Build Tool:** Vite 5
- **UI Library:** Vuetify 3 (Material Design)
- **Routing:** Vue Router 4
- **State Management:** Vue Reactivity System (ref, reactive)
- **Storage:** localStorage (for auth and tickets)
- **Icons:** Material Design Icons (@mdi/font)
- **Styling:** Vuetify components + Scoped CSS

## 📂 Project Structure

```
hng-ticket-vue/
├── public/
├── src/
│   ├── components/
│   │   ├── FooterComponent.vue
│   │   └── NavbarComponent.vue
│   ├── views/
│   │   ├── DashboardView.vue
│   │   ├── LandingView.vue
│   │   ├── LoginView.vue
│   │   ├── SignupView.vue
│   │   └── TicketsView.vue
│   ├── utils/
│   │   ├── auth.js
│   │   └── ticketStorage.js
│   ├── router/
│   │   └── index.js
│   ├── plugins/
│   │   └── vuetify.js
│   ├── App.vue
│   └── main.js
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   cd hng-ticket-vue
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The build files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🧪 Testing the Application

### Test Credentials

**Login:**
- Email: `test@example.com`
- Password: `password123`

**Or create a new account:**
- Any valid email and password (min 6 characters)

### Testing Full CRUD

1. **Create Ticket**
   - Click "Create Ticket" button
   - Fill in title (required), description, status, and priority
   - Click "Create"
   - ✅ Success notification appears

2. **Read Tickets**
   - View all tickets on the Tickets page
   - See ticket cards with status badges and priority indicators

3. **Update Ticket**
   - Click the pencil icon on any ticket card
   - Modify any field
   - Click "Update"
   - ✅ Changes reflected immediately

4. **Delete Ticket**
   - Click the trash icon on any ticket card
   - Confirm deletion in the dialog
   - ✅ Ticket removed from list

### Testing Validation

1. **Empty Title**
   - Try creating a ticket without a title
   - ❌ Error: "Title is required"

2. **Invalid Status**
   - Status field only accepts: "open", "in_progress", "closed"
   - ❌ Invalid values rejected

3. **Invalid Email (Login/Signup)**
   - Enter "notanemail"
   - ❌ Error: "Please enter a valid email"

4. **Short Password**
   - Enter password less than 6 characters
   - ❌ Error: "Password must be at least 6 characters"

5. **Password Mismatch (Signup)**
   - Enter different passwords in password and confirm fields
   - ❌ Error: "Passwords do not match"

### Testing Protected Routes

1. **Without Login**
   - Try accessing `/dashboard` or `/tickets` directly
   - ✅ Automatically redirected to `/login`

2. **After Login**
   - Login successfully
   - ✅ Access to dashboard and tickets granted

3. **Logout**
   - Click logout button
   - ✅ Session cleared, redirected to landing page

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- **Mobile**: < 600px
- **Tablet**: 600px - 960px
- **Desktop**: > 960px

Tested on:
- iPhone (Portrait & Landscape)
- iPad (Portrait & Landscape)
- Desktop (1440px and above)

## ♿ Accessibility Features

- ✅ Semantic HTML elements
- ✅ Proper component structure with Vue 3
- ✅ ARIA labels on interactive elements (via Vuetify)
- ✅ Keyboard navigation support
- ✅ Focus states on all buttons and inputs
- ✅ Sufficient color contrast (WCAG AA compliant)
- ✅ Form labels properly associated with inputs
- ✅ Screen reader friendly notifications

## 🔒 Security & Authentication

### Session Management
- Session stored in `localStorage` with key: `ticketapp_session`
- Contains user data and mock JWT token
- Cleared on logout

### Protected Routes
- Dashboard and Tickets pages require authentication
- Unauthorized users redirected to login via `router.beforeEach` guard
- Session validated on each protected route access

### Mock Authentication
This is a frontend-only implementation using simulated API calls:
- Login validates against test credentials
- Signup creates new user data
- No real backend or API integration

## 📊 Data Management

### Tickets Storage
- Stored in `localStorage` with key: `ticketapp_tickets`
- Each ticket has:
  - `id` (unique timestamp)
  - `title` (required)
  - `description` (optional)
  - `status` (required: "open" | "in_progress" | "closed")
  - `priority` (optional: "low" | "medium" | "high")
  - `createdAt` (ISO timestamp)
  - `updatedAt` (ISO timestamp)

### Sample Data
On first load, 3 sample tickets are created for demonstration purposes.

## 🎨 Design System

### Colors (Vuetify Theme)
- **Primary:** #667eea (Purple)
- **Secondary:** #764ba2 (Darker Purple)
- **Success:** #4caf50 (Green)
- **Warning:** #ff9800 (Amber)
- **Error:** #f44336 (Red)
- **Background:** #f5f5f5 (Light Gray)

### Typography
- **Font Family:** Roboto (Vuetify default)
- **Headings:** 600-700 weight
- **Body:** 400 weight

### Components
- **Border Radius:** 12px (cards), 8px (buttons) - Vuetify defaults
- **Shadows:** Material Design elevation system
- **Transitions:** Vuetify built-in transitions

## 🔄 Vue 3 Features Used

- **Composition API** - `<script setup>` syntax
- **Reactivity System** - `ref()`, `reactive()`, `computed()`
- **Lifecycle Hooks** - `onMounted()`
- **Vue Router 4** - Navigation and route guards
- **Vuetify 3** - Material Design components
- **Component Communication** - Props and events

## 🚧 Known Limitations

- No real backend integration (uses localStorage)
- No user authentication persistence across devices
- No real-time updates (refresh required after external changes)
- Limited to browser storage capacity
- Data cleared if localStorage is cleared
- No file upload support
- No email notifications

## 📝 Differences from React Version

While functionality is identical, here are the key technical differences:

| Feature | Vue Version | React Version |
|---------|-------------|---------------|
| **Framework** | Vue 3 | React 18 |
| **Syntax** | `<script setup>` | JSX |
| **State** | `ref()`, `reactive()` | `useState()` |
| **Effects** | `onMounted()` | `useEffect()` |
| **UI Library** | Vuetify 3 | Material UI |
| **Routing** | Vue Router 4 | React Router 6 |
| **File Extension** | `.vue` | `.jsx` |

## 🎯 Component Overview

### Layout Components
- **NavbarComponent.vue** - Top navigation with authentication state
- **FooterComponent.vue** - Footer with copyright information

### Page Components
- **LandingView.vue** - Hero section with features
- **LoginView.vue** - Login form with validation
- **SignupView.vue** - Registration form with validation
- **DashboardView.vue** - Statistics and quick actions
- **TicketsView.vue** - Full CRUD ticket management

### Utilities
- **auth.js** - Authentication functions (shared with React)
- **ticketStorage.js** - Ticket CRUD operations (shared with React)

## 📖 Vue-Specific Concepts Used

### Single File Components (SFC)
```vue
<template>
  <!-- HTML template -->
</template>

<script setup>
  // JavaScript logic
</script>

<style scoped>
  /* Component-specific styles */
</style>
```

### Composition API
```javascript
import { ref, computed, onMounted } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)

onMounted(() => {
  console.log('Component mounted!')
})
```

### Vue Router Navigation
```javascript
import { useRouter } from 'vue-router'

const router = useRouter()
router.push('/dashboard')
```

## 🌐 Deployment

This project is deployed on Netlify.

### Deploy Your Own:

**Option 1: Drag & Drop (Fastest)**
1. Run `npm run build`
2. Go to [netlify.com/drop](https://netlify.com/drop)
3. Drag the `dist` folder
4. Done! ✅

**Option 2: Connect Git**
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import from Git"
4. Select repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Deploy!

## 🔗 Important Links

- **HNG Internship**: [https://hng.tech/internship](https://hng.tech/internship)
- **Vue 3 Documentation**: [https://vuejs.org](https://vuejs.org)
- **Vuetify Documentation**: [https://vuetifyjs.com](https://vuetifyjs.com)
- **Vite Documentation**: [https://vitejs.dev](https://vitejs.dev)

## 👤 Author

**Echika Raphael**
- GitHub: [@Echika](https://github.com/Echika)
- Twitter: [@echika_raphael](https://twitter.com/@echika_raphael)
- LinkedIn: [Echika Raphael](https://linkedin.com/in/echika-raphael-774668290)

## 📝 License

This project is part of the HNG Internship program.

## 🙏 Acknowledgments

- HNG Internship Team for providing this learning opportunity
- Vue.js core team for the amazing framework
- Vuetify team for beautiful Material Design components
- All reviewers and mentors
- The amazing Vue.js community

## 🎓 Learning Resources

If you're new to Vue.js like I was, here are helpful resources:
- [Vue 3 Official Tutorial](https://vuejs.org/tutorial/)
- [Vue Composition API Guide](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vuetify Getting Started](https://vuetifyjs.com/en/getting-started/installation/)
- [Vue Router Guide](https://router.vuejs.org/guide/)

---

**Built with ❤️ and determination for HNG Internship Stage 2**

*Vue.js Version - Submission Date: [Your submission date]*

---

## 🎯 Quick Start Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint and fix files
npm run lint
```

---

**Note:** This Vue.js implementation provides identical functionality to the React version, demonstrating proficiency in multiple frontend frameworks while maintaining consistent design and user experience across implementations.