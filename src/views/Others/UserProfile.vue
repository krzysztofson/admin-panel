<template>
  <admin-layout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <div
      class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6"
    >
      <h3 class="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">Profile</h3>

      <!-- User Data Display -->
      <div class="md:grid md:grid-cols-2 md:gap-10">
        <div>
          <div
            v-if="userData"
            class="mb-6 relative rounded-lg border border-gray-200 p-4 dark:border-gray-700"
          >
            <h4 class="mb-3 text-md font-medium text-gray-800 dark:text-white/90">
              User Information
            </h4>
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

          <address-card />
        </div>
        <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <h4 class="mb-3 text-md font-medium text-gray-800 dark:text-white/90">AI summary</h4>
          <p v-if="userData" class="text-base text-gray-500 dark:text-gray-400">
            {{ userData.name }} is a {{ userData.age }}-year-old professional working
            {{ userData.imploymentType.toLowerCase() }} as a {{ userData.role }}, earning a steady
            annual income of ${{ calculateAnnualIncome(userData.income) }}. With consistent
            employment and a clear career trajectory in the
            {{ getIndustryFromRole(userData.role) }} industries,
            {{ getFirstName(userData.name) }} demonstrates both financial reliability and long-term
            earning potential. {{ getHisHer(userData.name) }} role as a {{ userData.role }} reflects
            not only a valuable skill set in a high-demand field but also a stable and
            forward-looking career choice, which contributes positively to
            {{ getHisHer(userData.name) }} overall financial profile.

            <br /><br />Currently maintaining {{ userData.status.toLowerCase() }} employment status,
            {{ getFirstName(userData.name) }} is exploring mortgage solutions with our firm to
            support {{ getHisHer(userData.name) }} goals of homeownership or property investment.
            {{ getHisHer(userData.name) }} income level places {{ getHimHer(userData.name) }} in a
            favorable financial bracket, offering flexibility when it comes to loan structures,
            repayment terms, and borrowing capacity. Additionally,
            {{ getHisHer(userData.name) }} professional background signals a strong ability to
            manage financial responsibilities and sustain regular mortgage payments over time.

            <br /><br />Given {{ getHisHer(userData.name) }} solid income, employment stability, and
            professional experience, {{ getFirstName(userData.name) }} is well-positioned as a
            {{ getRiskLevel(userData.income) }} qualified mortgage candidate.
            {{ getHeShe(userData.name) }} aligns well with the lending criteria for a variety of
            mortgage products and presents a {{ getRiskProfile(userData.income) }} risk profile,
            making {{ getHimHer(userData.name) }} a promising applicant for financing through our
            firm.
          </p>
          <p v-else class="text-base text-gray-500 dark:text-gray-400">
            No user data available. Please select a user from the table to view their AI-generated
            summary.
          </p>
        </div>
      </div>

      <!-- User History Section -->
      <div
        class="mt-6 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6"
      >
        <h3 class="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          User History
        </h3>

        <!-- Add New Event -->
        <div
          class="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50"
        >
          <h4 class="mb-3 text-md font-medium text-gray-800 dark:text-white/90">Add New Event</h4>
          <form @submit.prevent="addNewEvent" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Event Title *
                </label>
                <input
                  v-model="newEvent.title"
                  type="text"
                  required
                  placeholder="Enter event title"
                  class="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-600 dark:bg-gray-800 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Date *
                </label>
                <input
                  v-model="newEvent.date"
                  type="date"
                  required
                  class="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-600 dark:bg-gray-800 dark:text-white/90 dark:focus:border-brand-800"
                />
              </div>
            </div>
            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Description *
              </label>
              <textarea
                v-model="newEvent.description"
                required
                rows="3"
                placeholder="Enter event description"
                class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-600 dark:bg-gray-800 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              ></textarea>
            </div>
            <div class="flex justify-end">
              <button
                type="submit"
                class="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
                Add Event
              </button>
            </div>
          </form>
        </div>

        <!-- Timeline -->
        <div class="relative">
          <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>

          <div v-if="userHistory.length === 0" class="text-center py-8">
            <svg
              class="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">No history events yet</p>
            <p class="text-xs text-gray-400 dark:text-gray-500">Add your first event above</p>
          </div>

          <div
            v-for="(event, index) in sortedHistory"
            :key="index"
            class="relative flex items-start mb-6 last:mb-0"
          >
            <!-- Timeline dot -->
            <div
              class="flex-shrink-0 w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center relative z-10"
            >
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4"
                ></path>
              </svg>
            </div>

            <!-- Event content -->
            <div
              class="ml-4 flex-grow bg-white border border-gray-200 rounded-lg p-4 dark:bg-gray-800/50 dark:border-gray-700"
            >
              <div class="flex items-start justify-between">
                <div class="flex-grow">
                  <h5 class="font-medium text-gray-800 dark:text-white/90">{{ event.title }}</h5>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {{ event.description }}
                  </p>
                  <p class="text-xs text-gray-400 dark:text-gray-500 mt-2">
                    {{ formatDate(event.date) }}
                  </p>
                </div>
                <button
                  @click="removeEvent(index)"
                  class="ml-2 text-gray-400 hover:text-red-500 transition-colors"
                  title="Remove event"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Create Offers Section -->
      <div
        class="mt-6 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6"
      >
        <h3 class="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Create Bank Offers
        </h3>
        <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">
          Generate personalized financial offers for the user from major Polish banks
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          <!-- mBank -->
          <button
            @click="createOffer('mbank')"
            class="group relative flex flex-col items-center justify-center p-6 rounded-xl border-2 border-transparent bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div
              class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3 group-hover:bg-white/30 transition-colors"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                />
              </svg>
            </div>
            <span class="font-semibold text-sm">mBank</span>
            <span class="text-xs text-white/80 mt-1">Digital Banking</span>
          </button>

          <!-- ING Bank -->
          <button
            @click="createOffer('ing')"
            class="group relative flex flex-col items-center justify-center p-6 rounded-xl border-2 border-transparent bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div
              class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3 group-hover:bg-white/30 transition-colors"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                />
              </svg>
            </div>
            <span class="font-semibold text-sm">ING Bank</span>
            <span class="text-xs text-white/80 mt-1">International</span>
          </button>

          <!-- PKO BP -->
          <button
            @click="createOffer('pko-bp')"
            class="group relative flex flex-col items-center justify-center p-6 rounded-xl border-2 border-transparent bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div
              class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3 group-hover:bg-white/30 transition-colors"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
                />
              </svg>
            </div>
            <span class="font-semibold text-sm">PKO BP</span>
            <span class="text-xs text-white/80 mt-1">Bank Polski</span>
          </button>

          <!-- Millennium -->
          <button
            @click="createOffer('millennium')"
            class="group relative flex flex-col items-center justify-center p-6 rounded-xl border-2 border-transparent bg-gradient-to-br from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div
              class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3 group-hover:bg-white/30 transition-colors"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.08 2.76-.38 4.15-.25 1.17-.48 2.25-.96 3.09-.48.84-1.15 1.48-1.96 1.68-1.61.4-3.34.4-4.95 0-.81-.2-1.48-.84-1.96-1.68-.48-.84-.71-1.92-.96-3.09-.3-1.39-.23-2.57-.38-4.15-.15-1.58-.61-2.24-1.74-2.86 1.15-.18 1.74-.59 1.89-2.18.01-.16.02-.33.04-.49.15-1.58.61-2.24 1.74-2.86-.1.05-.18.11-.25.18-.25.25-.43.58-.43.95 0 .78.63 1.41 1.41 1.41.78 0 1.41-.63 1.41-1.41 0-.37-.18-.7-.43-.95-.07-.07-.15-.13-.25-.18 1.13.62 1.59 1.28 1.74 2.86.02.16.03.33.04.49.15 1.59.74 2 1.89 2.18-1.13.62-1.59 1.28-1.74 2.86z"
                />
              </svg>
            </div>
            <span class="font-semibold text-sm">Millennium</span>
            <span class="text-xs text-white/80 mt-1">Bank</span>
          </button>

          <!-- PKO SA -->
          <button
            @click="createOffer('pko-sa')"
            class="group relative flex flex-col items-center justify-center p-6 rounded-xl border-2 border-transparent bg-gradient-to-br from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div
              class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3 group-hover:bg-white/30 transition-colors"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                />
              </svg>
            </div>
            <span class="font-semibold text-sm">PKO SA</span>
            <span class="text-xs text-white/80 mt-1">Savings</span>
          </button>
        </div>

        <!-- Generated Offers Display -->
        <div v-if="generatedOffers.length > 0" class="mt-8">
          <h4 class="mb-4 text-md font-medium text-gray-800 dark:text-white/90">
            Generated Offers
          </h4>
          <div class="space-y-4">
            <div
              v-for="(offer, index) in generatedOffers"
              :key="index"
              class="p-4 rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50"
            >
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-3">
                  <div
                    :class="[
                      'w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold',
                      getBankColorClass(offer.bank),
                    ]"
                  >
                    {{ offer.bank.substring(0, 2).toUpperCase() }}
                  </div>
                  <div>
                    <h5 class="font-medium text-gray-800 dark:text-white/90">
                      {{ offer.productName }}
                    </h5>
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ offer.bankName }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="font-semibold text-gray-800 dark:text-white/90">
                    {{ offer.interestRate }}% APR
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    up to {{ offer.maxAmount }}
                  </p>
                </div>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-300">{{ offer.description }}</p>
              <div class="mt-3 flex gap-2">
                <button
                  class="px-3 py-1 text-xs bg-brand-500 text-white rounded-md hover:bg-brand-600 transition-colors"
                >
                  Apply Now
                </button>
                <button
                  class="px-3 py-1 text-xs border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                >
                  More Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </admin-layout>
</template>

<script setup>
import AdminLayout from '../../components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import PersonalInfoCard from '../../components/profile/PersonalInfoCard.vue'
import AddressCard from '../../components/profile/AddressCard.vue'

const route = useRoute()
const currentPageTitle = ref('User Profile')
const userData = ref(null)

// User history data
const userHistory = ref([])
const newEvent = ref({
  title: '',
  description: '',
  date: '',
})

// Generated offers data
const generatedOffers = ref([])

// Bank data for offer generation
const bankData = {
  mbank: {
    name: 'mBank',
    color: 'bg-red-500',
    products: [
      {
        name: 'mKonto Personal',
        rate: '3.5',
        maxAmount: '50,000 PLN',
        description:
          'Personal account with competitive interest rates and digital banking features',
      },
      {
        name: 'mCredit Personal',
        rate: '4.2',
        maxAmount: '100,000 PLN',
        description: 'Personal loan with flexible repayment options and quick approval process',
      },
      {
        name: 'mMortgage',
        rate: '3.8',
        maxAmount: '1,000,000 PLN',
        description: 'Mortgage loan with attractive rates for home buyers',
      },
    ],
  },
  ing: {
    name: 'ING Bank',
    color: 'bg-orange-500',
    products: [
      {
        name: 'ING Personal Account',
        rate: '3.2',
        maxAmount: '75,000 PLN',
        description: 'International banking with global access and premium services',
      },
      {
        name: 'ING Business Credit',
        rate: '4.5',
        maxAmount: '200,000 PLN',
        description: 'Business financing solutions for growing companies',
      },
      {
        name: 'ING Investment',
        rate: '5.1',
        maxAmount: '500,000 PLN',
        description: 'Investment products with professional portfolio management',
      },
    ],
  },
  'pko-bp': {
    name: 'PKO Bank Polski',
    color: 'bg-blue-600',
    products: [
      {
        name: 'PKO Konto za Zero',
        rate: '3.0',
        maxAmount: '60,000 PLN',
        description: 'Free personal account with extensive ATM network across Poland',
      },
      {
        name: 'PKO Kredyt Gotówkowy',
        rate: '4.0',
        maxAmount: '150,000 PLN',
        description: 'Cash loan with competitive rates and flexible terms',
      },
      {
        name: 'PKO Hipoteka',
        rate: '3.6',
        maxAmount: '2,000,000 PLN',
        description: 'Mortgage solutions with government support programs',
      },
    ],
  },
  millennium: {
    name: 'Bank Millennium',
    color: 'bg-yellow-500',
    products: [
      {
        name: 'Millennium Account',
        rate: '3.3',
        maxAmount: '45,000 PLN',
        description: 'Premium banking services with personalized customer support',
      },
      {
        name: 'Millennium Credit',
        rate: '4.1',
        maxAmount: '120,000 PLN',
        description: 'Personal credit with fast decision and competitive rates',
      },
      {
        name: 'Millennium Mortgage',
        rate: '3.7',
        maxAmount: '800,000 PLN',
        description: 'Home financing with flexible repayment schedules',
      },
    ],
  },
  'pko-sa': {
    name: 'PKO SA',
    color: 'bg-green-600',
    products: [
      {
        name: 'PKO Savings Plus',
        rate: '4.0',
        maxAmount: '100,000 PLN',
        description: 'High-yield savings account with guaranteed returns',
      },
      {
        name: 'PKO Term Deposit',
        rate: '4.5',
        maxAmount: '250,000 PLN',
        description: 'Fixed-term deposits with attractive interest rates',
      },
      {
        name: 'PKO Investment Fund',
        rate: '5.5',
        maxAmount: '1,000,000 PLN',
        description: 'Diversified investment portfolio with professional management',
      },
    ],
  },
}

// Default history data
const defaultHistoryData = [
  {
    title: 'Account Created',
    description: 'User account was successfully created and activated',
    date: '2023-01-15',
  },
  {
    title: 'Profile Updated',
    description: 'User updated their profile information and contact details',
    date: '2023-03-22',
  },
  {
    title: 'Role Changed',
    description: 'User role was updated from Junior to Senior position',
    date: '2023-06-10',
  },
  {
    title: 'Training Completed',
    description: 'Successfully completed advanced training program',
    date: '2023-09-05',
  },
  {
    title: 'Performance Review',
    description: 'Annual performance review completed with excellent rating',
    date: '2023-12-18',
  },
]

// Computed property to sort history by date (newest first)
const sortedHistory = computed(() => {
  return [...userHistory.value].sort((a, b) => new Date(b.date) - new Date(a.date))
})

const addNewEvent = () => {
  if (newEvent.value.title && newEvent.value.description && newEvent.value.date) {
    userHistory.value.push({
      title: newEvent.value.title,
      description: newEvent.value.description,
      date: newEvent.value.date,
    })

    // Reset form
    newEvent.value = {
      title: '',
      description: '',
      date: '',
    }
  }
}

const removeEvent = (index) => {
  const sortedIndex = userHistory.value.findIndex((event) => event === sortedHistory.value[index])
  if (sortedIndex !== -1) {
    userHistory.value.splice(sortedIndex, 1)
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const createOffer = (bankKey) => {
  const bank = bankData[bankKey]
  if (!bank) return

  // Generate random offer from bank's products
  const randomProduct = bank.products[Math.floor(Math.random() * bank.products.length)]

  const offer = {
    bank: bankKey,
    bankName: bank.name,
    productName: randomProduct.name,
    interestRate: randomProduct.rate,
    maxAmount: randomProduct.maxAmount,
    description: randomProduct.description,
    generatedAt: new Date().toLocaleString(),
  }

  // Add offer to the beginning of the array (newest first)
  generatedOffers.value.unshift(offer)

  // Limit to 5 most recent offers
  if (generatedOffers.value.length > 5) {
    generatedOffers.value = generatedOffers.value.slice(0, 5)
  }
}

const getBankColorClass = (bankKey) => {
  const colorMap = {
    mbank: 'bg-red-500',
    ing: 'bg-orange-500',
    'pko-bp': 'bg-blue-600',
    millennium: 'bg-yellow-500',
    'pko-sa': 'bg-green-600',
  }
  return colorMap[bankKey] || 'bg-gray-500'
}

// Helper functions for dynamic AI summary
const getFirstName = (fullName) => {
  return fullName ? fullName.split(' ')[0] : 'User'
}

const getHisHer = (fullName) => {
  // Simple gender detection based on common patterns - in real app you'd have gender data
  const firstName = getFirstName(fullName).toLowerCase()
  const femaleNames = ['lindsey', 'kaiya', 'carla', 'anna', 'maria', 'jessica', 'sarah', 'emma']
  return femaleNames.includes(firstName) ? 'her' : 'his'
}

const getHeShe = (fullName) => {
  const firstName = getFirstName(fullName).toLowerCase()
  const femaleNames = ['lindsey', 'kaiya', 'carla', 'anna', 'maria', 'jessica', 'sarah', 'emma']
  return femaleNames.includes(firstName) ? 'She' : 'He'
}

const getHimHer = (fullName) => {
  const firstName = getFirstName(fullName).toLowerCase()
  const femaleNames = ['lindsey', 'kaiya', 'carla', 'anna', 'maria', 'jessica', 'sarah', 'emma']
  return femaleNames.includes(firstName) ? 'her' : 'him'
}

const calculateAnnualIncome = (income) => {
  if (!income) return '0'

  // Extract number from income string (e.g., "3.9K" -> 3.9)
  const numericValue = parseFloat(income.replace(/[^\d.]/g, ''))

  if (income.includes('K') || income.includes('k')) {
    // Convert K to annual (multiply by 1000, then by 12 for monthly or assume it's already annual)
    // Assuming the K values are monthly, so multiply by 12
    return (numericValue * 1000 * 12).toLocaleString()
  }

  return numericValue.toLocaleString()
}

const getIndustryFromRole = (role) => {
  if (!role) return 'professional'

  const roleLower = role.toLowerCase()
  if (
    roleLower.includes('designer') ||
    roleLower.includes('developer') ||
    roleLower.includes('frontend') ||
    roleLower.includes('backend')
  ) {
    return 'digital and creative'
  } else if (roleLower.includes('manager') || roleLower.includes('director')) {
    return 'management and leadership'
  } else if (roleLower.includes('writer') || roleLower.includes('content')) {
    return 'content and media'
  } else if (roleLower.includes('marketing') || roleLower.includes('sales')) {
    return 'marketing and sales'
  }
  return 'professional services'
}

const getRiskLevel = (income) => {
  if (!income) return 'moderately'

  const numericValue = parseFloat(income.replace(/[^\d.]/g, ''))

  if (numericValue >= 20) return 'highly'
  else if (numericValue >= 10) return 'very'
  else if (numericValue >= 5) return 'moderately'
  return 'adequately'
}

const getRiskProfile = (income) => {
  if (!income) return 'moderate'

  const numericValue = parseFloat(income.replace(/[^\d.]/g, ''))

  if (numericValue >= 20) return 'low'
  else if (numericValue >= 10) return 'low-to-moderate'
  else if (numericValue >= 5) return 'moderate'
  return 'moderate-to-high'
}

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

  // Load default history data
  userHistory.value = [...defaultHistoryData]
})
</script>
