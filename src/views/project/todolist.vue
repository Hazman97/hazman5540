<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
    <div class="w-full max-w-2xl">
      
      <!-- Main Card -->
      <div class="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        
        <!-- Header with Gradient -->
        <div class="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-white overflow-hidden">
          <!-- Decorative circles -->
          <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div class="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
          
          <div class="relative flex items-center gap-4">
            <!-- Icon -->
            <div class="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
              <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"/>
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold mb-1">MyKad Information Extractor</h1>
              <p class="text-white/90 text-sm">Extract personal information from Malaysian IC number</p>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="p-8">
          
          <!-- Input Section -->
          <div class="mb-6">
            <label for="mykad" class="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
              </svg>
              Enter MyKad Number (12 digits)
            </label>
            <div class="relative">
              <input
                id="mykad"
                v-model="myKadNumber"
                type="text"
                placeholder="e.g., 900101101234"
                maxlength="12"
                @keyup.enter="processMyKad"
                class="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 bg-white/50 backdrop-blur-sm font-mono"
              />
              <div class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">
                {{ myKadNumber.length }}/12
              </div>
            </div>
          </div>

          <!-- Error Message Display -->
          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-2">
            <div v-if="error" class="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start gap-3">
              <svg class="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <p class="text-red-700 font-medium">{{ error }}</p>
            </div>
          </Transition>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-3 mb-8">
            <button
              @click="processMyKad"
              class="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-6 rounded-xl hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition-all duration-200">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
              </svg>
              Process Information
            </button>
            <button
              @click="clearInfo"
              class="sm:w-auto flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-bold py-4 px-6 rounded-xl hover:bg-gray-200 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-300/50 transition-all duration-200">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
              Clear
            </button>
          </div>

          <!-- Results Section -->
          <Transition
            enter-active-class="transition-all duration-500 ease-out"
            enter-from-class="opacity-0 translate-y-8"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-300 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-8">
            <div v-if="results" class="border-t-2 border-gray-100 pt-8">
              
              <!-- Results Header -->
              <div class="flex items-center gap-3 mb-6">
                <div class="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h2 class="text-2xl font-bold text-gray-800">Extracted Information</h2>
              </div>

              <!-- Results Grid -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <!-- Birth Date -->
                <div class="group p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-200">
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <div class="flex items-center gap-2 mb-2">
                        <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        <span class="text-sm font-semibold text-blue-700">Birth Date</span>
                      </div>
                      <p class="text-2xl font-bold text-gray-900">{{ results.day }}/{{ results.month }}/{{ results.year }}</p>
                    </div>
                  </div>
                </div>

                <!-- Gender -->
                <div class="group p-5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 hover:shadow-lg transition-all duration-200">
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <div class="flex items-center gap-2 mb-2">
                        <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                        <span class="text-sm font-semibold text-purple-700">Gender</span>
                      </div>
                      <p class="text-2xl font-bold text-gray-900">{{ results.gender }}</p>
                    </div>
                    <div :class="results.gender === 'Male' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'" 
                         class="p-2 rounded-lg">
                      <svg v-if="results.gender === 'Male'" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2a7 7 0 00-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 001 1h6a1 1 0 001-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 00-7-7z"/>
                      </svg>
                      <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2a7 7 0 00-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 001 1h6a1 1 0 001-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 00-7-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- Age -->
                <div class="group p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 hover:shadow-lg transition-all duration-200">
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <div class="flex items-center gap-2 mb-2">
                        <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span class="text-sm font-semibold text-green-700">Current Age</span>
                      </div>
                      <p class="text-2xl font-bold text-gray-900">{{ results.age }} years old</p>
                    </div>
                  </div>
                </div>

                <!-- State of Birth -->
                <div class="group p-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100 hover:shadow-lg transition-all duration-200">
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <div class="flex items-center gap-2 mb-2">
                        <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        <span class="text-sm font-semibold text-amber-700">State of Birth</span>
                      </div>
                      <p class="text-xl font-bold text-gray-900">{{ results.stateOfBirth }}</p>
                    </div>
                  </div>
                </div>

              </div>

              <!-- Additional Info Banner -->
              <div class="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <div>
                    <p class="text-sm font-semibold text-indigo-900 mb-1">Information Extracted Successfully</p>
                    <p class="text-xs text-indigo-700">All data has been processed from the MyKad number format (YYMMDD-PB-###G)</p>
                  </div>
                </div>
              </div>

            </div>
          </Transition>

        </div>
      </div>

      <!-- Footer Info -->
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">
          <svg class="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
          Your data is processed locally and never stored
        </p>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// --- STATE ---
const myKadNumber = ref('');
const results = ref<MyKadInfo | null>(null);
const error = ref('');

// --- CONSTANTS & TYPES ---
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

interface MyKadInfo {
  day: string;
  month: string;
  year: number;
  gender: 'Male' | 'Female';
  stateOfBirth: string;
  age: number;
}

// --- HELPERS ---
function getStateOfBirth(code: string): string {
  return myKadStateMap[code] || 'Unknown Code';
}

function calculateAge(yy: string, mm: string, dd: string): { fullYear: number, age: number } {
  const birthYear = parseInt(yy);
  const currentYear = new Date().getFullYear();
  const currentYearLastTwo = currentYear % 100;

  const fullYear = birthYear > currentYearLastTwo 
    ? 1900 + birthYear 
    : 2000 + birthYear;

  const today = new Date();
  const birthDate = new Date(fullYear, parseInt(mm) - 1, parseInt(dd));

  if (birthDate.getDate() !== parseInt(dd) || 
      birthDate.getMonth() !== (parseInt(mm) - 1) ||
      birthDate.getFullYear() !== fullYear) {
        throw new Error('Invalid date components (e.g., 30th Feb)');
  }

  let age = today.getFullYear() - birthDate.getFullYear();
  
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return { fullYear, age };
}

// --- METHODS ---
function processMyKad() {
  results.value = null;
  error.value = '';

  const ic = myKadNumber.value.replace(/-/g, '');
  if (!/^\d{12}$/.test(ic)) {
    error.value = 'Invalid MyKad. Must be exactly 12 digits.';
    return;
  }

  try {
    const yy = ic.substring(0, 2);
    const mm = ic.substring(2, 4);
    const dd = ic.substring(4, 6);
    const pb = ic.substring(6, 8);
    const genderDigit = parseInt(ic.substring(11, 12));

    const stateOfBirth = getStateOfBirth(pb);
    const gender: 'Male' | 'Female' = (genderDigit % 2 === 0) ? 'Female' : 'Male';
    const { fullYear, age } = calculateAge(yy, mm, dd);

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

function clearInfo() {
  myKadNumber.value = '';
  results.value = null;
  error.value = '';
}
</script>