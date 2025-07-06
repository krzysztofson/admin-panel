<template>
  <admin-layout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <div
      class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6"
    >
      <h3 class="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">Profile</h3>

      <!-- User Data Display -->
      <div
        v-if="userData"
        class="mb-6 relative rounded-lg border border-gray-200 p-4 dark:border-gray-700"
      >
        <h4 class="mb-3 text-md font-medium text-gray-800 dark:text-white/90">User Information</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Name</p>
            <p class="font-medium text-gray-800 dark:text-white/90">{{ userData.name }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Role</p>
            <p class="font-medium text-gray-800 dark:text-white/90">{{ userData.role }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Imployment type</p>
            <p class="font-medium text-gray-800 dark:text-white/90">
              {{ userData.imploymentType }}
            </p>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Age</p>
            <p class="font-medium text-gray-800 dark:text-white/90">{{ userData.age }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Status</p>
            <span
              :class="[
                'inline-block rounded-full px-2 py-0.5 text-xs font-medium',
                {
                  'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500':
                    userData.status === 'Active',
                  'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-400':
                    userData.status === 'Pending',
                  'bg-error-50 text-error-700 dark:bg-error-500/15 dark:text-error-500':
                    userData.status === 'Cancel',
                },
              ]"
            >
              {{ userData.status }}
            </span>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Income</p>
            <p class="font-medium text-gray-800 dark:text-white/90">${{ userData.income }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Phone</p>
            <p class="font-medium text-gray-800 dark:text-white/90">{{ userData.phone }}</p>
          </div>
        </div>

        <button class="edit-button absolute top-4 right-4">
          <svg
            class="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
              fill=""
            />
          </svg>
          Edit
        </button>
      </div>

      <personal-info-card />
      <address-card />
    </div>
  </admin-layout>
</template>

<script setup>
import AdminLayout from '../../components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import PersonalInfoCard from '../../components/profile/PersonalInfoCard.vue'
import AddressCard from '../../components/profile/AddressCard.vue'

const route = useRoute()
const currentPageTitle = ref('User Profile')
const userData = ref(null)

onMounted(() => {
  // Get user data from query parameters
  if (route.query.userData) {
    try {
      userData.value = JSON.parse(route.query.userData)
      currentPageTitle.value = `${userData.value.name} - Profile`
    } catch (error) {
      console.error('Error parsing user data:', error)
    }
  }
})
</script>
