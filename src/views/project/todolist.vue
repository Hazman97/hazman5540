<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white rounded-lg shadow-md p-8">
      
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">
        MyKad Information Extractor
      </h1>

      <!-- INPUT Section -->
      <div class="mb-4">
        <label for="mykad" class="block text-sm font-medium text-gray-700 mb-2">
          Enter MyKad Number (12 digits)
        </label>
        <input
          id="mykad"
          v-model="myKadNumber"
          type="text"
          placeholder="e.g., 900101101234"
          maxlength="12"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <!-- Error Message Display -->
      <div v-if="error" class="mb-4 text-center text-red-600 font-medium">
        {{ error }}
      </div>

      <!-- PROCESS Triggers (Buttons) -->
      <div class="flex flex-col sm:flex-row sm:justify-between">
        <button
          @click="processMyKad"
          class="w-full sm:w-auto bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-2 sm:mb-0"
        >
          Process Information
        </button>
        <button
          @click="clearInfo"
          class="w-full sm:w-auto bg-gray-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          Clear
        </button>
      </div>

      <!-- OUTPUT Section -->
      <div v-if="results" class="mt-8 border-t border-gray-200 pt-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Results:</h2>
        <ul class="space-y-3">
          <li class="flex justify-between">
            <span class="font-medium text-gray-600">Birth Date (DD):</span>
            <span class="text-gray-900 font-mono">{{ results.day }}</span>
          </li>
          <li class="flex justify-between">
            <span class="font-medium text-gray-600">Birth Month (MM):</span>
            <span class="text-gray-900 font-mono">{{ results.month }}</span>
          </li>
          <li class="flex justify-between">
            <span class="font-medium text-gray-600">Birth Year (YYYY):</span>
            <span class="text-gray-900 font-mono">{{ results.year }}</span>
          </li>
          <li class="flex justify-between">
            <span class="font-medium text-gray-600">Gender:</span>
            <span class="text-gray-900 font-mono">{{ results.gender }}</span>
          </li>
          <!-- THIS IS THE LINE I FIXED (was classli=) -->
          <li class="flex justify-between">
            <span class="font-medium text-gray-600">State Born:</span>
            <span class="text-gray-900 font-mono">{{ results.stateOfBirth }}</span>
          </li>
          <li class="flex justify-between">
            <span class="font-medium text-gray-600">Age:</span>
            <span class="text-gray-900 font-mono">{{ results.age }} years old</span>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// --- STATE ---
// `ref` makes these reactive. .value is used to access them in the script.
const myKadNumber = ref('');
const results = ref<MyKadInfo | null>(null);
const error = ref('');

// --- CONSTANTS & TYPES ---

// This map stores the state codes from the MyKad (digits 7 and 8)
const myKadStateMap: { [key: string]: string } = {
  '01': 'Johor', '21': 'Johor', '22': 'Johor', '23': 'Johor', '24': 'Johor',
  '02': 'Kedah', '25': 'Kedah', '26': 'Kedah', '27': 'Kedah',
  '03': 'Kelantan', '28': 'Kelantan', '29': 'Kelantan',
  '04': 'Melaka', '30': 'Melaka',
  '05': 'Negeri Sembilan', '31': 'Negeri Sembilan', '59': 'Negeri Sembilan',
  '06': 'Pahang', '32': 'Pahang', '33': 'Pahang',
  '07': 'Pulau Pinang', '34': 'Pulau Pinang', '35': 'Pulau Pinang',
  '08': 'Perak', '36': 'Perak', '37': 'Perak', '38': 'Perak', '39': 'Perak',
  '09': 'Perlis', '40': 'Perlis',
  '10': 'Selangor', '41': 'Selangor', '42': 'Selangor', '43': 'Selangor', '44': 'Selangor',
  '11': 'Terengganu', '45': 'Terengganu', '46': 'Terengganu',
  '12': 'Sabah', '47': 'Sabah', '48': 'Sabah', '49': 'Sabah',
  '13': 'Sarawak', '50': 'Sarawak', '51': 'Sarawak', '52': 'Sarawak', '53': 'Sarawak',
  '14': 'W.P. Kuala Lumpur', '54': 'W.P. Kuala Lumpur', '55': 'W.P. Kuala Lumpur', '56': 'W.P. Kuala Lumpur', '57': 'W.P. Kuala Lumpur',
  '15': 'W.P. Labuan', '58': 'W.P. Labuan',
  '16': 'W.P. Putrajaya',
  '82': 'Negeri Tidak Diketahui (Unknown)',
};

// Define the structure for our results object
interface MyKadInfo {
  day: string;
  month: string;
  year: number;
  gender: 'Male' | 'Female';
  stateOfBirth: string;
  age: number;
}

// --- HELPERS ---

/**
 * Helper function to get the state name from the code.
 */
function getStateOfBirth(code: string): string {
  return myKadStateMap[code] || 'Unknown Code';
}

/**
 * Helper function to calculate the full year and age.
 */
function calculateAge(yy: string, mm: string, dd: string): { fullYear: number, age: number } {
  const birthYear = parseInt(yy);
  const currentYear = new Date().getFullYear();
  const currentYearLastTwo = currentYear % 100;

  // Determine if 19xx or 20xx
  const fullYear = birthYear > currentYearLastTwo 
    ? 1900 + birthYear 
    : 2000 + birthYear;

  const today = new Date();
  // Note: Month is 0-indexed in JavaScript (0 = Jan, 1 = Feb, etc.)
  const birthDate = new Date(fullYear, parseInt(mm) - 1, parseInt(dd));

  // Check for invalid date (e.g., 900230 - Feb 30th)
  if (birthDate.getDate() !== parseInt(dd) || 
      birthDate.getMonth() !== (parseInt(mm) - 1) ||
      birthDate.getFullYear() !== fullYear) {
        throw new Error('Invalid date components (e.g., 30th Feb)');
  }

  let age = today.getFullYear() - birthDate.getFullYear();
  
  // Check if the birthday has passed this year
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--; // Subtract 1 if birthday hasn't happened yet
  }

  return { fullYear, age };
}

// --- METHODS ---
// These functions are automatically available to your template
/**
 * Main "PROCESS" function.
 * Triggered when the "Process Information" button is clicked.
 */
function processMyKad() {
  // 1. Clear previous results and errors
  results.value = null;
  error.value = '';

  // 2. Validate Input
  const ic = myKadNumber.value.replace(/-/g, ''); // Remove any dashes
  if (!/^\d{12}$/.test(ic)) {
    error.value = 'Invalid MyKad. Must be exactly 12 digits.';
    return;
  }

  // 3. --- PROCESS ---
  try {
    // Extract data based on MyKad format (YYMMDD-PB-###G)
    const yy = ic.substring(0, 2);
    const mm = ic.substring(2, 4);
    const dd = ic.substring(4, 6);
    const pb = ic.substring(6, 8); // Place of Birth code
    const genderDigit = parseInt(ic.substring(11, 12)); // Last digit

    // Determine State Born
    const stateOfBirth = getStateOfBirth(pb);

    // Determine Gender
    const gender: 'Male' | 'Female' = (genderDigit % 2 === 0) ? 'Female' : 'Male';
    
    // Calculate Age
    const { fullYear, age } = calculateAge(yy, mm, dd);

    // 4. --- OUTPUT ---
    // Store all processed data in the 'results' object
    results.value = {
      day: dd,
      month: mm,
      year: fullYear,
      gender: gender,
      stateOfBirth: stateOfBirth,
      age: age,
    };

  } catch (e: unknown) {
    if (e instanceof Error) {
      error.value = `Failed to process MyKad: ${e.message}`;
    } else {
      error.value = 'Failed to process MyKad. Check if the date is valid.';
    }
    console.error(e);
  }
}

/**
 * Clears all input and output fields.
 */
function clearInfo() {
  myKadNumber.value = '';
  results.value = null;
  error.value = '';
}
</script>

<style>
/* You can keep your global styles here */
body {
  @apply bg-gray-100;
}
</style>