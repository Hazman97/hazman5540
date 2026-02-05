<template>
  <div
    class="min-h-screen bg-slate-50 dark:bg-slate-900 pt-28 pb-12 px-4 sm:px-6"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-10 reveal">
        <span
          class="inline-block py-1 px-3 rounded-full bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 text-xs font-bold tracking-wider mb-4"
          >FAMILY DATABASE</span
        >
        <h1
          class="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4 font-serif"
        >
          Keluarga Besar 🏡
        </h1>
        <p class="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Senarai saiz baju untuk semua ahli keluarga, disusun mengikut keluarga
          (1-13).
        </p>
      </div>

      <!-- Stats Card & Copy Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- Stats Card -->
        <div
          class="bg-white dark:bg-slate-800 rounded-[2rem] p-6 sm:p-8 shadow-2xl shadow-teal-900/5 border border-slate-100 dark:border-slate-700 relative overflow-hidden group hover:shadow-teal-500/10 transition-all duration-500"
        >
          <div
            class="absolute top-0 right-0 w-64 h-64 bg-teal-50 dark:bg-teal-900/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700"
          ></div>
          <div class="relative z-10">
            <div class="flex items-center justify-between gap-6 mb-6">
              <div>
                <h3
                  class="text-slate-500 dark:text-slate-400 font-bold uppercase text-xs tracking-wider mb-2 flex items-center gap-2"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                  Jumlah Ahli
                </h3>
                <div
                  class="text-6xl sm:text-7xl font-black text-slate-800 dark:text-white tracking-tighter"
                >
                  {{ members.length }}
                  <span
                    class="text-lg sm:text-2xl text-slate-400 font-medium ml-1 tracking-normal"
                    >orang</span
                  >
                </div>
              </div>
              <div
                class="w-20 h-20 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 rounded-2xl flex items-center justify-center text-4xl shadow-inner border border-teal-100 dark:border-teal-800/30"
              >
                👨‍👩‍👧‍👦
              </div>
            </div>
            <!-- Visual Bar -->
            <div
              class="w-full bg-slate-100 dark:bg-slate-700/50 rounded-full h-3 overflow-hidden"
            >
              <div
                class="bg-gradient-to-r from-teal-400 via-teal-500 to-emerald-500 h-full rounded-full animate-shimmer bg-[length:200%_100%]"
                style="width: 100%"
              ></div>
            </div>
            <div
              class="mt-3 flex justify-between items-center text-xs text-slate-400 font-medium"
            >
              <span>Semua Keluarga</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        <!-- Preview & Copy Box -->
        <div
          class="bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] p-6 border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-700 transition-colors flex flex-col h-full group"
        >
          <div class="flex items-center justify-between mb-4">
            <h3
              class="text-slate-500 dark:text-slate-400 font-bold uppercase text-xs tracking-wider flex items-center gap-2"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
              Preview & Copy
            </h3>
            <button
              @click="copyList"
              class="px-5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 transform active:scale-95 shadow-lg"
              :class="
                copied
                  ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-white hover:bg-teal-50 dark:hover:bg-slate-600 shadow-slate-200/50 dark:shadow-none'
              "
            >
              <span class="text-lg">{{ copied ? "✨" : "📋" }}</span>
              {{ copied ? "Berjaya Disalin!" : "Salin Semua" }}
            </button>
          </div>
          <div
            class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 whitespace-pre-wrap overflow-y-auto flex-1 max-h-48 md:max-h-full custom-scrollbar shadow-inner"
          >
            {{ formattedText || "Tiada data untuk dipaparkan..." }}
          </div>
        </div>
      </div>

      <!-- Controls Bar -->
      <div class="sticky top-24 z-30 mb-8 space-y-4">
        <div
          class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-4 rounded-3xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <!-- Filters -->
          <div
            class="flex flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar"
          >
            <!-- View Toggle -->
            <div
              class="flex bg-slate-100 dark:bg-slate-700 rounded-xl p-1 mr-2"
            >
              <button
                @click="viewMode = 'grid'"
                class="px-3 py-1.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2"
                :class="
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-600 text-teal-600 dark:text-teal-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                "
              >
                <span>🏢</span> <span class="hidden sm:inline">Keluarga</span>
              </button>
              <button
                @click="viewMode = 'table'"
                class="px-3 py-1.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2"
                :class="
                  viewMode === 'table'
                    ? 'bg-white dark:bg-slate-600 text-teal-600 dark:text-teal-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                "
              >
                <span>📋</span> <span class="hidden sm:inline">Senarai</span>
              </button>
            </div>

            <div class="h-6 w-px bg-slate-200 dark:bg-slate-600 mx-1"></div>

            <!-- Sort -->
            <select v-model="sortBy" class="filter-select w-28 md:w-auto">
              <option value="default">Susunan Asal</option>
              <option value="age-asc">👶 Muda -> Tua</option>
              <option value="age-desc">👴 Tua -> Muda</option>
              <option value="name">🔤 Nama A-Z</option>
            </select>

            <!-- Age Filter -->
            <select v-model="filterAge" class="filter-select w-28 md:w-auto">
              <option value="all">Semua Umur</option>
              <option value="kids">👶 Bawah 12</option>
              <option value="teens">🧑‍🎓 13 - 17</option>
              <option value="adults">👨‍💼 Dewasa (18+)</option>
              <option value="custom">🛠️ Custom</option>
            </select>

            <!-- Custom Age Inputs -->
            <div
              v-if="filterAge === 'custom'"
              class="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 p-1 rounded-xl animate-fade-in-right"
            >
              <input
                v-model="minAge"
                type="number"
                placeholder="Min"
                class="w-12 p-1 text-center rounded-lg text-xs font-bold focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
              />
              <span class="text-slate-400 text-xs">-</span>
              <input
                v-model="maxAge"
                type="number"
                placeholder="Max"
                class="w-12 p-1 text-center rounded-lg text-xs font-bold focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
              />
            </div>

            <!-- Gender Filter -->
            <button
              @click="toggleGenderFilter"
              class="filter-btn"
              :class="
                filterGender === 'all'
                  ? 'bg-slate-100 text-slate-600'
                  : filterGender === 'male'
                    ? 'bg-blue-100 text-blue-600 border-blue-200'
                    : 'bg-pink-100 text-pink-600 border-pink-200'
              "
            >
              {{
                filterGender === "all"
                  ? "Semua"
                  : filterGender === "male"
                    ? "👨 Lelaki"
                    : "🧕 Perempuan"
              }}
            </button>
          </div>

          <!-- Edit Button -->
          <div v-if="globalEditEnabled">
            <button
              @click="toggleEditMode"
              class="px-5 py-2 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 text-sm whitespace-nowrap"
              :class="
                editMode
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30 hover:bg-rose-600'
                  : 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-600'
              "
            >
              <span>{{ editMode ? "Tutup Edit" : "Edit Keluarga" }}</span>
              <span class="text-lg">{{ editMode ? "🔒" : "✏️" }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Add/Edit Form -->
      <transition
        enter-active-class="duration-300 ease-out"
        enter-from-class="transform opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="transform opacity-0 -translate-y-4"
      >
        <div
          v-if="editMode"
          class="mb-12 bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-xl border-2 border-slate-100 dark:border-slate-700 relative overflow-hidden"
        >
          <div
            class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500"
          ></div>
          <h2
            class="text-2xl font-bold text-slate-800 dark:text-white mb-8 flex items-center gap-3"
          >
            <span
              class="bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 p-2.5 rounded-xl text-lg"
              >📝</span
            >
            {{ isEditing ? "Kemaskini Ahli" : "Tambah Ahli Baru" }}
          </h2>

          <form
            @submit.prevent="saveMember"
            class="grid grid-cols-1 md:grid-cols-12 gap-6"
          >
            <!-- Family Order Number -->
            <div class="md:col-span-2 space-y-2">
              <label class="label">No. Keluarga</label>
              <input
                v-model.number="form.familyOrder"
                type="number"
                min="1"
                max="20"
                placeholder="1"
                class="form-input text-center font-bold text-lg"
                required
              />
            </div>

            <!-- Family Name -->
            <div class="md:col-span-4 space-y-2">
              <label class="label">Nama Keluarga</label>
              <div class="relative">
                <input
                  v-model="form.group"
                  list="groupOptions"
                  type="text"
                  placeholder="e.g. Keluarga Kak Long"
                  class="form-input"
                  required
                />
                <datalist id="groupOptions">
                  <option
                    v-for="grp in existingGroups"
                    :key="grp"
                    :value="grp"
                  ></option>
                </datalist>
              </div>
            </div>

            <!-- Name -->
            <div class="md:col-span-6 space-y-2">
              <label class="label">Nama Penuh</label>
              <input
                v-model="form.name"
                type="text"
                placeholder="e.g. Hazman"
                class="form-input"
                required
              />
            </div>

            <!-- Role -->
            <div class="md:col-span-4 space-y-2">
              <label class="label">Peranan</label>
              <select v-model="form.role" class="form-input">
                <option value="grandparent">� Atuk / Nenek (Utama)</option>
                <option value="parent">�👑 Ibu / Bapa (Ketua)</option>
                <option value="child">👶 Anak</option>
                <option value="relative">👤 Saudara Lain</option>
              </select>
            </div>

            <!-- Age -->
            <div class="md:col-span-2 space-y-2">
              <label class="label">Umur</label>
              <input
                v-model.number="form.age"
                type="number"
                class="form-input"
              />
            </div>

            <!-- Size -->
            <div class="md:col-span-2 space-y-2">
              <label class="label">Saiz Baju</label>
              <input
                v-model="form.size"
                type="text"
                placeholder="XL"
                class="form-input font-bold"
                required
              />
            </div>

            <!-- Gender -->
            <div class="md:col-span-2 space-y-2">
              <label class="label">Jantina</label>
              <select v-model="form.gender" class="form-input">
                <option value="male">Lelaki</option>
                <option value="female">Perempuan</option>
              </select>
            </div>

            <!-- Buttons -->
            <div
              class="md:col-span-12 flex justify-end gap-3 mt-4 pt-6 border-t border-slate-100 dark:border-slate-700"
            >
              <button type="button" @click="resetForm" class="btn-secondary">
                Batal
              </button>
              <button type="submit" class="btn-primary flex items-center gap-2">
                <svg
                  v-if="saving"
                  class="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {{ isEditing ? "Simpan" : "Tambah" }}
              </button>
            </div>
          </form>
        </div>
      </transition>

      <!-- Loading State -->
      <div
        v-if="loading"
        class="flex flex-col items-center justify-center py-32"
      >
        <div
          class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-500 mb-6"
        ></div>
        <p class="text-xl text-slate-500 font-medium animate-pulse">
          Sedang memuatkan data keluarga...
        </p>
      </div>

      <!-- MAIN CONTENT AREA -->
      <div v-else>
        <!-- TABLE VIEW -->
        <div
          v-if="viewMode === 'table'"
          class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden reveal"
        >
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr
                  class="bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider"
                >
                  <th
                    class="p-4 font-bold border-b dark:border-slate-600 cursor-pointer hover:bg-slate-100"
                    @click="tableSort = 'familyOrder'"
                  >
                    No.
                  </th>
                  <th
                    class="p-4 font-bold border-b dark:border-slate-600 cursor-pointer hover:bg-slate-100"
                    @click="tableSort = 'name'"
                  >
                    Nama
                  </th>
                  <th class="p-4 font-bold border-b dark:border-slate-600">
                    Keluarga
                  </th>
                  <th
                    class="p-4 font-bold border-b dark:border-slate-600 cursor-pointer hover:bg-slate-100"
                    @click="tableSort = 'age'"
                  >
                    Umur
                  </th>
                  <th class="p-4 font-bold border-b dark:border-slate-600">
                    Jantina
                  </th>
                  <th
                    class="p-4 font-bold border-b dark:border-slate-600 cursor-pointer hover:bg-slate-100"
                    @click="tableSort = 'size'"
                  >
                    Saiz
                  </th>
                  <th
                    v-if="editMode"
                    class="p-4 font-bold border-b dark:border-slate-600"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
                <tr
                  v-for="member in filteredFlatMembers"
                  :key="member.id"
                  class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <td class="p-4 text-slate-500 font-mono">
                    {{ member.familyOrder }}
                  </td>
                  <td class="p-4 font-bold text-slate-800 dark:text-white">
                    {{ member.name }}
                    <span
                      v-if="member.role === 'parent'"
                      class="ml-2 text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full"
                      >Ketua</span
                    >
                  </td>
                  <td class="p-4 text-slate-600 dark:text-slate-300 text-sm">
                    {{ member.group }}
                  </td>
                  <td class="p-4 text-slate-600 dark:text-slate-300">
                    {{ member.age }}
                  </td>
                  <td class="p-4">
                    {{ member.gender === "female" ? "perempuan" : "lelaki" }}
                  </td>
                  <td
                    class="p-4 font-bold text-teal-600 dark:text-teal-400 text-lg"
                  >
                    {{ member.size }}
                  </td>
                  <td v-if="editMode" class="p-4">
                    <div class="flex gap-2">
                      <button
                        @click="editMember(member)"
                        class="text-blue-500 hover:text-blue-700"
                      >
                        ✏️
                      </button>
                      <button
                        @click="deleteMember(member.id)"
                        class="text-red-500 hover:text-red-700"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="filteredFlatMembers.length === 0">
                  <td colspan="7" class="p-8 text-center text-slate-500 italic">
                    No matching members found.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- GRID VIEW (HIERARCHY) -->
        <div v-else class="space-y-16">
          <div
            v-for="group in sortedFilteredGroups"
            :key="group.id"
            class="reveal relative"
          >
            <!-- Smart Card Design: Adapts to "Single" (Unmarried) vs "Family" -->
            <div
              class="rounded-[2.5rem] shadow-sm border relative overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
              :class="[
                group.order === 0
                  ? 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-800 border-amber-200 dark:border-amber-700/50 ring-4 ring-amber-100 dark:ring-amber-900/20'
                  : group.isSingle
                    ? 'bg-gradient-to-r from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/80 p-6 flex flex-col md:flex-row items-center gap-6 border-slate-200 dark:border-slate-700/50'
                    : 'bg-white dark:bg-slate-800/50 p-6 md:p-10 border-slate-100 dark:border-slate-700/50',
              ]"
            >
              <!-- Main Family Banner -->
              <div
                v-if="group.order === 0"
                class="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl z-20 shadow-sm"
              >
                KELUARGA UTAMA
              </div>
              <!-- Watermark (Only for family view) -->
              <div
                v-if="!group.isSingle"
                class="absolute -top-6 -left-6 text-[10rem] md:text-[12rem] font-bold text-slate-50 dark:text-slate-800/50 select-none z-0 leading-none font-serif"
              >
                {{ group.order }}
              </div>

              <div class="relative z-10 w-full">
                <!-- SINGLE LAYOUT -->
                <div
                  v-if="group.isSingle"
                  class="flex flex-col md:flex-row justify-between items-center w-full gap-6"
                >
                  <div class="flex items-center gap-6">
                    <div
                      class="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-2xl font-bold text-slate-500"
                    >
                      {{ group.order }}
                    </div>
                    <div>
                      <h2
                        class="text-2xl font-bold text-slate-800 dark:text-white"
                      >
                        {{ group.name }}
                      </h2>
                      <div class="flex gap-2 mt-1">
                        <span
                          class="inline-block px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-xs font-bold text-slate-500 uppercase"
                          >Single</span
                        >
                      </div>
                    </div>
                  </div>

                  <!-- The Single Member Card -->
                  <div
                    class="flex-1 w-full md:w-auto flex justify-center md:justify-end"
                  >
                    <div
                      v-for="member in group.members"
                      :key="member.id"
                      class="bg-white dark:bg-slate-700 p-4 rounded-xl border border-slate-200 dark:border-slate-600 flex items-center gap-4 min-w-[200px] shadow-sm"
                    >
                      <div class="text-3xl">
                        {{ member.gender === "female" ? "🧕" : "🧔" }}
                      </div>
                      <div>
                        <div class="font-bold text-slate-800 dark:text-white">
                          {{ member.name }}
                        </div>
                        <div class="text-sm text-slate-500">
                          Size:
                          <span class="font-bold text-teal-600">{{
                            member.size
                          }}</span>
                        </div>
                      </div>
                      <div v-if="editMode" class="ml-4 flex gap-2">
                        <button
                          @click="editMember(member)"
                          class="text-blue-500 hover:bg-blue-50 p-1 rounded"
                        >
                          ✏️
                        </button>
                        <button
                          @click="deleteMember(member.id)"
                          class="text-red-500 hover:bg-red-50 p-1 rounded"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- FAMILY LAYOUT -->
                <div v-else>
                  <!-- Header -->
                  <div class="flex items-center gap-4 mb-8 pl-4 md:pl-0">
                    <div
                      class="w-14 h-14 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-teal-500/20"
                    >
                      {{ group.order }}
                    </div>
                    <div>
                      <h2
                        class="text-xl md:text-3xl font-bold text-slate-800 dark:text-white leading-tight"
                      >
                        {{ group.name }}
                      </h2>
                    </div>
                  </div>

                  <!-- Parents Row -->
                  <div
                    v-if="getParents(group.members).length > 0"
                    class="mb-8 pl-2 md:pl-4"
                  >
                    <div class="flex flex-wrap gap-4">
                      <div
                        v-for="member in getParents(group.members)"
                        :key="member.id"
                        class="parent-card group/card"
                      >
                        <div class="flex items-start gap-4">
                          <div
                            class="w-14 h-14 rounded-full flex items-center justify-center text-2xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 shadow-inner"
                          >
                            {{
                              member.role === "grandparent"
                                ? member.gender === "female"
                                  ? "👵"
                                  : "👴"
                                : member.gender === "female"
                                  ? "🧕"
                                  : "👨"
                            }}
                          </div>
                          <div class="flex-1 min-w-0">
                            <div class="flex justify-between items-start">
                              <div>
                                <h3
                                  class="text-base font-bold text-slate-800 dark:text-white truncate"
                                >
                                  {{ member.name }}
                                </h3>
                                <p
                                  class="text-xs mb-1 font-bold uppercase tracking-wider"
                                  :class="
                                    group.order === 0
                                      ? 'text-amber-500'
                                      : 'text-slate-500'
                                  "
                                >
                                  {{ getRoleLabel(member) }}
                                </p>
                              </div>
                            </div>
                            <div
                              class="inline-flex items-center gap-2 px-2 py-0.5 bg-slate-100 dark:bg-slate-700/50 rounded-lg"
                            >
                              <span
                                class="text-[10px] font-bold text-slate-400 uppercase"
                                >Saiz</span
                              >
                              <span
                                class="text-lg font-black text-slate-700 dark:text-slate-200"
                                >{{ member.size }}</span
                              >
                            </div>
                          </div>
                        </div>

                        <div v-if="editMode" class="card-actions">
                          <button
                            @click="editMember(member)"
                            class="action-btn text-blue-500 hover:bg-blue-50"
                          >
                            ✏️
                          </button>
                          <button
                            @click="deleteMember(member.id)"
                            class="action-btn text-red-500 hover:bg-red-50"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Children Grid -->
                  <div
                    v-if="getChildren(group.members).length > 0"
                    class="bg-slate-50/50 dark:bg-slate-800/50 rounded-2xl p-4 md:p-6"
                  >
                    <div
                      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
                    >
                      <div
                        v-for="member in getChildren(group.members)"
                        :key="member.id"
                        class="child-card group/card"
                      >
                        <!-- Avatar -->
                        <div class="mb-2 flex justify-center">
                          <div
                            class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-lg"
                          >
                            {{ member.gender === "female" ? "👧" : "👦" }}
                          </div>
                        </div>
                        <h4
                          class="font-bold text-slate-700 dark:text-slate-200 text-center truncate w-full text-sm mb-0.5"
                        >
                          {{ member.name }}
                        </h4>
                        <p class="text-[10px] text-slate-400 text-center mb-1">
                          {{ member.age ? `${member.age} Thn` : "" }}
                        </p>
                        <div class="text-center">
                          <span
                            class="inline-block px-2 py-0.5 bg-teal-50 dark:bg-teal-900/10 text-teal-600 dark:text-teal-400 font-bold rounded text-base"
                          >
                            {{ member.size }}
                          </span>
                        </div>

                        <div v-if="editMode" class="child-actions">
                          <button
                            @click="editMember(member)"
                            class="p-1 hover:text-blue-500"
                          >
                            ✏️
                          </button>
                          <button
                            @click="deleteMember(member.id)"
                            class="p-1 hover:text-red-500"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { db } from "@/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  getDoc,
  setDoc,
} from "firebase/firestore";

// State
const members = ref([]);
const loading = ref(true);
const editMode = ref(false);
const globalEditEnabled = ref(true);
const isEditing = ref(false);
const editingId = ref(null);
const saving = ref(false);

// View & Filter State
const viewMode = ref("grid"); // 'grid' | 'table'
const filterAge = ref("all");
const filterGender = ref("all");
const minAge = ref("");
const maxAge = ref("");
const sortBy = ref("default"); // 'default' | 'age-asc' | 'age-desc' | 'name'
const tableSort = ref("familyOrder");

const form = ref({
  name: "",
  group: "",
  familyOrder: 1,
  role: "child",
  age: "",
  size: "",
  gender: "male",
});

// Helper: Toggle Gender Filter
const toggleGenderFilter = () => {
  if (filterGender.value === "all") filterGender.value = "male";
  else if (filterGender.value === "male") filterGender.value = "female";
  else filterGender.value = "all";
};

// Filtering Logic
const filterMember = (member) => {
  // Gender
  if (filterGender.value !== "all" && member.gender !== filterGender.value)
    return false;

  // Age
  const age = Number(member.age) || 0;

  if (filterAge.value === "custom") {
    if (minAge.value && age < Number(minAge.value)) return false;
    if (maxAge.value && age > Number(maxAge.value)) return false;
  } else {
    // Preset Filters
    if (filterAge.value === "kids" && age >= 12) return false;
    if (filterAge.value === "teens" && (age < 13 || age > 17)) return false;
    if (filterAge.value === "adults" && age < 18) return false;
  }

  return true;
};

// Computed: Flat List for Table View
const filteredFlatMembers = computed(() => {
  let list = members.value.filter(filterMember);

  // Sort
  list.sort((a, b) => {
    if (sortBy.value === "age-asc")
      return (Number(a.age) || 0) - (Number(b.age) || 0);
    if (sortBy.value === "age-desc")
      return (Number(b.age) || 0) - (Number(a.age) || 0);
    if (sortBy.value === "name") return a.name.localeCompare(b.name);

    // Default Table Sort override
    if (tableSort.value === "familyOrder")
      return (a.familyOrder || 0) - (b.familyOrder || 0);

    return 0;
  });

  return list;
});

// Computed: Groups for Grid View
const sortedFilteredGroups = computed(() => {
  const groups = {};
  const activeMembers = members.value.filter(filterMember);

  activeMembers.forEach((member) => {
    const order = member.familyOrder || 99;
    const name = member.group || "Keluarga Lain";
    const key = `${order}-${name}`;

    if (!groups[key]) {
      groups[key] = {
        id: key,
        order: order,
        name: name,
        members: [],
      };
    }
    groups[key].members.push(member);
  });

  // Convert to array and sort
  let result = Object.values(groups);

  if (sortBy.value === "default") {
    result.sort((a, b) => a.order - b.order);
  } else {
    // If sorting by age/name, we might sort the FAMILIES based on their contents?
    // Or just keep family order but sort members INSIDE?
    // Let's keep family order for sanity in grid view, sort members inside.
    result.sort((a, b) => a.order - b.order);
  }

  // Sort members inside groups based on global sort preference
  result.forEach((group) => {
    group.members.sort((a, b) => {
      if (sortBy.value === "age-asc")
        return (Number(a.age) || 0) - (Number(b.age) || 0);
      if (sortBy.value === "age-desc")
        return (Number(b.age) || 0) - (Number(a.age) || 0);
      if (sortBy.value === "name") return a.name.localeCompare(b.name);

      // Default role-based sort
      const roleOrder = { grandparent: 0, parent: 1, child: 2, relative: 3 };
      if (roleOrder[a.role] !== roleOrder[b.role]) {
        return roleOrder[a.role] - roleOrder[b.role];
      }
      return (Number(a.age) || 0) - (Number(b.age) || 0);
    });

    group.isSingle = group.members.length === 1;
  });

  return result;
});

const existingGroups = computed(() => {
  return [...new Set(members.value.map((m) => m.group).filter(Boolean))].sort();
});

const getParents = (list) =>
  list.filter((m) => m.role === "parent" || m.role === "grandparent");
const getChildren = (list) =>
  list
    .filter((m) => m.role !== "parent" && m.role !== "grandparent")
    .sort((a, b) => (Number(a.age) || 0) - (Number(b.age) || 0));

const getRoleLabel = (member) => {
  if (member.role === "grandparent")
    return member.gender === "male" ? "Atuk" : "Nenek";
  if (member.role === "parent")
    return member.gender === "male" ? "Bapa" : "Ibu";
  return "Anak";
};

const copied = ref(false);

const sizeSummary = computed(() => {
  const summary = {};
  members.value.forEach((m) => {
    if (!m.size) return;
    const s = m.size.toUpperCase();
    summary[s] = (summary[s] || 0) + 1;
  });
  return summary;
});

const formattedText = computed(() => {
  if (sortedFilteredGroups.value.length === 0) return "";

  let text = "*SENARAI KELUARGA BESAR 🏡*\n\n";

  // Iterate through groups
  sortedFilteredGroups.value.forEach((group) => {
    text += `*Keluarga ${group.order}: ${group.name}*\n`;

    // Sort members: Parents first, then by age/role
    const groupMembers = [...group.members].sort((a, b) => {
      const roleOrder = { grandparent: 0, parent: 1, child: 2, relative: 3 };
      if (roleOrder[a.role] !== roleOrder[b.role]) {
        return roleOrder[a.role] - roleOrder[b.role];
      }
      return (Number(a.age) || 0) - (Number(b.age) || 0);
    });

    groupMembers.forEach((m, idx) => {
      let icon = "";
      if (m.role === "grandparent") icon = m.gender === "male" ? "👴" : "👵";
      else if (m.role === "parent") icon = m.gender === "male" ? "👨" : "🧕";
      else icon = m.gender === "male" ? "👦" : "👧";

      text += `${idx + 1}. ${m.name} ${icon} - ${m.size}\n`;
    });
    text += "\n";
  });

  text += "*RUMUSAN SAIZ:*\n";
  Object.keys(sizeSummary.value)
    .sort()
    .forEach((size) => {
      text += `${size}: ${sizeSummary.value[size]}\n`;
    });

  text += `\n*Jumlah Besar: ${members.value.length} orang*`;
  return text;
});

const copyList = async () => {
  if (!formattedText.value) return;

  try {
    await navigator.clipboard.writeText(formattedText.value);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error("Failed to copy", err);
  }
};

const toggleEditMode = () => (editMode.value = !editMode.value);

const resetForm = () => {
  form.value = {
    name: "",
    group: "",
    familyOrder: 1,
    role: "child",
    age: "",
    size: "",
    gender: "male",
  };
  isEditing.value = false;
  editingId.value = null;
};

// Data Fetching
const fetchMembers = async () => {
  try {
    const q = query(
      collection(db, "family_members"),
      orderBy("familyOrder", "asc"),
    );
    const querySnapshot = await getDocs(q);
    members.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching family members: ", error);
  } finally {
    loading.value = false;
  }
};

const saveMember = async () => {
  if (!form.value.name) return;
  saving.value = true;

  try {
    const memberData = {
      ...form.value,
      updatedAt: new Date(),
    };

    if (isEditing.value && editingId.value) {
      await updateDoc(doc(db, "family_members", editingId.value), memberData);

      const index = members.value.findIndex((m) => m.id === editingId.value);
      if (index !== -1) {
        members.value[index] = { ...members.value[index], ...memberData };
      }
    } else {
      memberData.createdAt = new Date();
      const docRef = await addDoc(collection(db, "family_members"), memberData);
      members.value.push({ id: docRef.id, ...memberData });
    }

    resetForm();
    if (editMode.value) toggleEditMode(); // Optional: close edit mode after save? or keep open. Let's keep open.
  } catch (error) {
    console.error("Error saving member: ", error);
    alert("Gagal menyimpan.");
  } finally {
    saving.value = false;
  }
};

const editMember = (member) => {
  form.value = { ...member };
  isEditing.value = true;
  editingId.value = member.id;
  if (!editMode.value) editMode.value = true;

  // scroll to form
  window.scrollTo({ top: 100, behavior: "smooth" });
};

const deleteMember = async (id) => {
  if (!confirm("Adakah anda pasti?")) return;
  try {
    await deleteDoc(doc(db, "family_members", id));
    members.value = members.value.filter((m) => m.id !== id);
  } catch (error) {
    console.error("Error deleting: ", error);
  }
};

onMounted(() => {
  fetchMembers();
});
</script>

<style scoped>
.label {
  @apply block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1;
}
.form-input {
  @apply w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all dark:text-white shadow-sm;
}
.btn-primary {
  @apply px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white rounded-xl font-bold shadow-lg shadow-teal-500/30 transform hover:-translate-y-1 transition-all duration-300 active:scale-95;
}
.btn-secondary {
  @apply px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors;
}
.filter-select {
  @apply appearance-none px-4 py-2 bg-slate-100 dark:bg-slate-700 border-none rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 focus:ring-2 focus:ring-teal-500 outline-none cursor-pointer;
}
.filter-btn {
  @apply px-4 py-2 rounded-xl text-sm font-bold border transition-all;
}

/* Animations */
@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.animate-fade-in-right {
  animation: fadeInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.reveal {
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.animate-shimmer {
  animation: shimmer 3s linear infinite;
}

/* Custom Scrollbar for preview box */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-slate-200 dark:bg-slate-600 rounded-full;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  @apply bg-slate-300 dark:bg-slate-500;
}
</style>
