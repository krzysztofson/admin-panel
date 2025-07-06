<template>
  <div>
    <!-- Add User Button -->
    <div class="mb-4 flex justify-end">
      <button
        @click="isAddUserModal = true"
        class="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 transition-colors"
      >
        <svg
          class="fill-current"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8 2C8.41421 2 8.75 2.33579 8.75 2.75V7.25H13.25C13.6642 7.25 14 7.58579 14 8C14 8.41421 13.6642 8.75 13.25 8.75H8.75V13.25C8.75 13.6642 8.41421 14 8 14C7.58579 14 7.25 13.6642 7.25 13.25V8.75H2.75C2.33579 8.75 2 8.41421 2 8C2 7.58579 2.33579 7.25 2.75 7.25H7.25V2.75C7.25 2.33579 7.58579 2 8 2Z"
            fill=""
          />
        </svg>
        Add New User
      </button>
    </div>

    <!-- Table -->
    <div
      class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
    >
      <div class="max-w-full overflow-x-auto custom-scrollbar">
        <table class="min-w-full">
          <thead>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <th class="px-5 py-3 text-left w-3/11 sm:px-6">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Klient</p>
              </th>
              <th class="px-5 py-3 text-left w-2/11 sm:px-6">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                  Rodzaj umowy
                </p>
              </th>
              <th class="px-5 py-3 text-left w-2/11 sm:px-6">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Wiek</p>
              </th>
              <th class="px-5 py-3 text-left w-2/11 sm:px-6">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Status</p>
              </th>
              <th class="px-5 py-3 text-left w-2/11 sm:px-6">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Zarobki</p>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr
              v-for="(user, index) in users"
              :key="index"
              class="border-t border-gray-100 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              @click="navigateToProfile(user)"
            >
              <td class="px-5 py-4 sm:px-6">
                <div class="flex items-center gap-3">
                  <div>
                    <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {{ user.name }}
                    </span>
                    <span class="block text-gray-500 text-theme-xs dark:text-gray-400">
                      {{ user.role }}
                    </span>
                  </div>
                </div>
              </td>
              <td class="px-5 py-4 sm:px-6">
                <p class="text-gray-500 text-theme-sm dark:text-gray-400">
                  {{ user.imploymentType }}
                </p>
              </td>
              <td class="px-5 py-4 sm:px-6">
                <div class="flex -space-x-2">
                  <span class="block text-gray-500 text-theme-xs dark:text-gray-400">
                    {{ user.age }}
                  </span>
                </div>
              </td>
              <td class="px-5 py-4 sm:px-6">
                <span
                  :class="[
                    'rounded-full px-2 py-0.5 text-theme-xs font-medium',
                    {
                      'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500':
                        user.status === 'Active',
                      'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-400':
                        user.status === 'Pending',
                      'bg-error-50 text-error-700 dark:bg-error-500/15 dark:text-error-500':
                        user.status === 'Cancel',
                    },
                  ]"
                >
                  {{ user.status }}
                </span>
              </td>
              <td class="px-5 py-4 sm:px-6">
                <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ user.income }}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add User Modal -->
    <Modal v-if="isAddUserModal" @close="isAddUserModal = false">
      <template #body>
        <div
          class="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11"
        >
          <!-- close btn -->
          <button
            @click="isAddUserModal = false"
            class="transition-color absolute right-5 top-5 z-999 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:bg-white/[0.05] dark:text-gray-400 dark:hover:bg-white/[0.07] dark:hover:text-gray-300"
          >
            <svg
              class="fill-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.04289 16.5418C5.65237 16.9323 5.65237 17.5655 6.04289 17.956C6.43342 18.3465 7.06658 18.3465 7.45711 17.956L11.9987 13.4144L16.5408 17.9565C16.9313 18.347 17.5645 18.347 17.955 17.9565C18.3455 17.566 18.3455 16.9328 17.955 16.5423L13.4129 12.0002L17.955 7.45808C18.3455 7.06756 18.3455 6.43439 17.955 6.04387C17.5645 5.65335 16.9313 5.65335 16.5408 6.04387L11.9987 10.586L7.45711 6.04439C7.06658 5.65386 6.43342 5.65386 6.04289 6.04439C5.65237 6.43491 5.65237 7.06808 6.04289 7.4586L10.5845 12.0002L6.04289 16.5418Z"
                fill=""
              />
            </svg>
          </button>
          <div class="px-2 pr-14">
            <h4 class="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Add New User
            </h4>
            <p class="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Fill in the details to create a new user profile.
            </p>
          </div>
          <form class="flex flex-col" @submit.prevent="addNewUser">
            <div class="custom-scrollbar h-[458px] overflow-y-auto p-2">
              <div>
                <h5 class="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  User Information
                </h5>

                <div class="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div class="col-span-2 lg:col-span-1">
                    <label
                      class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                      Full Name *
                    </label>
                    <input
                      v-model="newUser.name"
                      type="text"
                      required
                      placeholder="Enter full name"
                      class="h-11 w-full rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    />
                  </div>

                  <div class="col-span-2 lg:col-span-1">
                    <label
                      class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                      Role *
                    </label>
                    <input
                      v-model="newUser.role"
                      type="text"
                      required
                      placeholder="Enter role"
                      class="h-11 w-full rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    />
                  </div>

                  <div class="col-span-2 lg:col-span-1">
                    <label
                      class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                      Employment Type *
                    </label>
                    <select
                      v-model="newUser.imploymentType"
                      required
                      class="h-11 w-full rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                    >
                      <option value="">Select employment type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="B2B">B2B</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>

                  <div class="col-span-2 lg:col-span-1">
                    <label
                      class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                      Age *
                    </label>
                    <input
                      v-model.number="newUser.age"
                      type="number"
                      required
                      min="18"
                      max="100"
                      placeholder="Enter age"
                      class="h-11 w-full rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    />
                  </div>

                  <div class="col-span-2 lg:col-span-1">
                    <label
                      class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                      Status *
                    </label>
                    <select
                      v-model="newUser.status"
                      required
                      class="h-11 w-full rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                    >
                      <option value="">Select status</option>
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Cancel">Cancel</option>
                    </select>
                  </div>

                  <div class="col-span-2 lg:col-span-1">
                    <label
                      class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                      Income *
                    </label>
                    <input
                      v-model="newUser.income"
                      type="text"
                      required
                      placeholder="e.g., 5.2K"
                      class="h-11 w-full rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    />
                  </div>

                  <div class="col-span-2">
                    <label
                      class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                      Phone
                    </label>
                    <input
                      v-model="newUser.phone"
                      type="tel"
                      placeholder="Enter phone number"
                      class="h-11 w-full rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <button
                @click="isAddUserModal = false"
                type="button"
                class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
              >
                Add User
              </button>
            </div>
          </form>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Modal from '../../../components/profile/Modal.vue'

const router = useRouter()
const isAddUserModal = ref(false)

const newUser = ref({
  name: '',
  role: '',
  imploymentType: '',
  age: '',
  status: '',
  income: '',
  phone: '',
})

const navigateToProfile = (user) => {
  router.push({
    name: 'Profile',
    query: {
      userId: user.name.replace(/\s+/g, '-').toLowerCase(), // Create a simple ID from name
      userData: JSON.stringify(user),
    },
  })
}

const addNewUser = () => {
  // Add the new user to the users array
  users.value.push({ ...newUser.value })

  // Reset the form
  newUser.value = {
    name: '',
    role: '',
    imploymentType: '',
    age: '',
    status: '',
    income: '',
    phone: '',
  }

  // Close the modal
  isAddUserModal.value = false

  // Optional: Show success message
  console.log('User added successfully')
}

const users = ref([
  {
    name: 'Lindsey Curtis',
    role: 'Web Designer',
    imploymentType: 'Full-time',
    age: 31,
    status: 'Active',
    income: '3.9K',
    phone: '+48 600 500 400',
  },
  {
    name: 'Kaiya George',
    role: 'Project Manager',
    imploymentType: 'B2B',
    age: 31,
    status: 'Pending',
    income: '24.9K',
    phone: '+48 600 500 400',
  },
  {
    name: 'Zain Geidt',
    role: 'Content Writer',
    imploymentType: 'B2B',
    age: 31,
    status: 'Active',
    income: '12.7K',
    phone: '+48 600 500 400',
  },
  {
    name: 'Abram Schleifer',
    role: 'Digital Marketer',
    imploymentType: 'Full-time',
    age: 31,
    status: 'Cancel',
    income: '2.8K',
    phone: '+48 600 500 400',
  },
  {
    name: 'Carla George',
    role: 'Front-end Developer',
    imploymentType: 'Full-time',
    age: 31,
    status: 'Active',
    income: '4.5K',
    phone: '+48 600 500 400',
  },
  {
    name: 'Lindsey Curtis',
    role: 'Web Designer',
    imploymentType: 'B2B',
    age: 31,
    status: 'Active',
    income: '3.9K',
    phone: '+48 600 500 400',
  },
  {
    name: 'Kaiya George',
    role: 'Project Manager',
    imploymentType: 'Full-time',
    age: 31,
    status: 'Pending',
    income: '24.9K',
    phone: '+48 600 500 400',
  },
  {
    name: 'Zain Geidt',
    role: 'Content Writer',
    imploymentType: 'B2B',
    age: 31,
    status: 'Active',
    income: '12.7K',
    phone: '+48 600 500 400',
  },
  {
    name: 'Abram Schleifer',
    role: 'Digital Marketer',
    imploymentType: 'B2B',
    age: 31,
    status: 'Cancel',
    income: '2.8K',
    phone: '+48 600 500 400',
  },
  {
    name: 'Carla George',
    role: 'Front-end Developer',
    imploymentType: 'Full-time',
    age: 31,
    status: 'Active',
    income: '4.5K',
    phone: '+48 600 500 400',
  },
])
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
