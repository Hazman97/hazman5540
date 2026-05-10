<template>
  <div class="flex min-h-screen bg-slate-50 font-sans">
    <!-- Sidebar -->
    <aside
      class="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-screen"
    >
      <div class="flex items-center gap-3 p-6 border-b border-slate-200">
        <span class="text-3xl">💰</span>
        <span class="text-xl font-bold text-teal-600">E-Claim</span>
      </div>

      <!-- Role Switcher -->
      <div class="p-5 border-b border-slate-200">
        <label
          class="block text-xs uppercase tracking-wide text-slate-500 font-semibold mb-2"
          >Demo Role</label
        >
        <select
          v-model="currentRole"
          class="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
        >
          <option value="staff">👤 Staff</option>
          <option value="hod">👔 HOD</option>
          <option value="finance">💵 Finance</option>
          <option value="hr">👥 HR</option>
        </select>
      </div>

      <nav class="flex-1 p-4 space-y-1">
        <button
          v-for="item in navItems"
          :key="item.id"
          @click="activeView = item.id"
          :class="[
            'flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
            activeView === item.id
              ? 'bg-teal-50 text-teal-700'
              : 'text-slate-600 hover:bg-slate-50',
          ]"
        >
          <span class="text-lg">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
          <span
            v-if="item.badge"
            class="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold"
            >{{ item.badge }}</span
          >
        </button>
      </nav>

      <div class="p-5 border-t border-slate-200 flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-semibold text-sm"
        >
          {{ currentUser.initials }}
        </div>
        <div class="flex flex-col">
          <span class="text-sm font-semibold text-slate-800">{{
            currentUser.name
          }}</span>
          <span class="text-xs text-slate-500">{{ currentUser.role }}</span>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 ml-64 p-8">
      <header class="flex justify-between items-start mb-8">
        <div>
          <h1 class="text-3xl font-bold text-slate-800">
            {{ currentViewTitle }}
          </h1>
          <p class="text-slate-500 mt-1">{{ currentViewSubtitle }}</p>
        </div>
        <button
          v-if="activeView !== 'submit'"
          @click="activeView = 'submit'"
          class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold text-sm shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/30 hover:-translate-y-0.5 transition-all duration-200"
        >
          <span>+</span> New Claim
        </button>
      </header>

      <!-- Dashboard -->
      <div v-if="activeView === 'dashboard'" class="space-y-6">
        <div class="grid grid-cols-4 gap-5">
          <div
            class="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm"
          >
            <div
              class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl"
            >
              📊
            </div>
            <div>
              <span class="block text-2xl font-bold text-slate-800">{{
                userClaims.length
              }}</span
              ><span class="text-sm text-slate-500">Total Claims</span>
            </div>
          </div>
          <div
            class="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm"
          >
            <div
              class="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-2xl"
            >
              ⏳
            </div>
            <div>
              <span class="block text-2xl font-bold text-amber-600">{{
                pendingCount
              }}</span
              ><span class="text-sm text-slate-500">Pending</span>
            </div>
          </div>
          <div
            class="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm"
          >
            <div
              class="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-2xl"
            >
              ✅
            </div>
            <div>
              <span class="block text-2xl font-bold text-green-600">{{
                approvedCount
              }}</span
              ><span class="text-sm text-slate-500">Approved</span>
            </div>
          </div>
          <div
            class="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm"
          >
            <div
              class="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-2xl"
            >
              ❌
            </div>
            <div>
              <span class="block text-2xl font-bold text-red-600">{{
                rejectedCount
              }}</span
              ><span class="text-sm text-slate-500">Rejected</span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-6">
          <div
            class="col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
          >
            <h3 class="text-lg font-semibold text-slate-800 mb-5">
              Recent Claims
            </h3>
            <div class="space-y-3">
              <div
                v-for="claim in userClaims.slice(0, 5)"
                :key="claim.id"
                @click="viewClaimDetails(claim)"
                class="flex items-center gap-4 p-4 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <span class="text-xl">{{
                  getCategoryIcon(claim.category)
                }}</span>
                <div class="flex-1">
                  <span class="block font-medium text-slate-800">{{
                    claim.category
                  }}</span>
                  <span class="text-xs text-slate-400">{{ claim.date }}</span>
                </div>
                <span class="font-semibold text-teal-600"
                  >RM {{ claim.amount.toFixed(2) }}</span
                >
                <span :class="getStatusBadgeClass(claim.status)">{{
                  claim.status
                }}</span>
              </div>
            </div>
          </div>

          <div
            class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
          >
            <h3 class="text-lg font-semibold text-slate-800 mb-5">
              Quick Actions
            </h3>
            <div class="grid grid-cols-2 gap-3">
              <button
                @click="activeView = 'submit'"
                class="flex flex-col items-center gap-2 p-5 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:bg-teal-50 hover:border-teal-200 hover:text-teal-700 transition-all"
              >
                <span class="text-2xl">📝</span
                ><span class="text-sm font-medium">Submit</span>
              </button>
              <button
                @click="activeView = 'claims'"
                class="flex flex-col items-center gap-2 p-5 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:bg-teal-50 hover:border-teal-200 hover:text-teal-700 transition-all"
              >
                <span class="text-2xl">📋</span
                ><span class="text-sm font-medium">View All</span>
              </button>
              <button
                v-if="canApprove"
                @click="activeView = 'approvals'"
                class="flex flex-col items-center gap-2 p-5 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:bg-teal-50 hover:border-teal-200 hover:text-teal-700 transition-all"
              >
                <span class="text-2xl">✔️</span
                ><span class="text-sm font-medium">Approvals</span>
              </button>
              <button
                @click="activeView = 'reports'"
                class="flex flex-col items-center gap-2 p-5 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:bg-teal-50 hover:border-teal-200 hover:text-teal-700 transition-all"
              >
                <span class="text-2xl">📊</span
                ><span class="text-sm font-medium">Reports</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Submit Claim -->
      <div v-if="activeView === 'submit'">
        <div
          class="max-w-2xl bg-white rounded-2xl border border-slate-200 p-8 shadow-sm"
        >
          <h3 class="text-lg font-semibold text-slate-800 mb-6">
            Submit New Claim
          </h3>
          <form @submit.prevent="submitClaim" class="space-y-5">
            <div class="grid grid-cols-2 gap-5">
              <div>
                <label class="block text-sm font-medium text-slate-600 mb-2"
                  >Category</label
                >
                <select
                  v-model="newClaim.category"
                  required
                  class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Select category...</option>
                  <option value="Travel">✈️ Travel</option>
                  <option value="Fuel">⛽ Fuel</option>
                  <option value="Office Supplies">📎 Office Supplies</option>
                  <option value="Medical">🏥 Medical</option>
                  <option value="Training">📚 Training</option>
                  <option value="Entertainment">🎉 Entertainment</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-600 mb-2"
                  >Amount (RM)</label
                >
                <input
                  type="number"
                  v-model.number="newClaim.amount"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                  class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-5">
              <div>
                <label class="block text-sm font-medium text-slate-600 mb-2"
                  >Date</label
                >
                <input
                  type="date"
                  v-model="newClaim.date"
                  required
                  class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-600 mb-2"
                  >Receipt Number</label
                >
                <input
                  type="text"
                  v-model="newClaim.receipt"
                  placeholder="REC-001234"
                  class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-600 mb-2"
                >Description</label
              >
              <textarea
                v-model="newClaim.description"
                rows="3"
                placeholder="Describe your expense..."
                required
                class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-600 mb-2"
                >Attach Receipt</label
              >
              <div
                class="relative border-2 border-dashed border-slate-200 rounded-xl p-8 text-center text-slate-400 hover:border-teal-400 hover:text-teal-500 transition-colors cursor-pointer"
              >
                <input
                  type="file"
                  class="absolute inset-0 opacity-0 cursor-pointer"
                />
                <span class="text-2xl block mb-2">📎</span>
                <span class="text-sm">Drop file or click to upload</span>
              </div>
            </div>
            <div class="flex justify-end gap-3 pt-5 border-t border-slate-100">
              <button
                type="button"
                @click="activeView = 'dashboard'"
                class="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold text-sm shadow-lg shadow-teal-500/25 hover:shadow-xl transition-all"
              >
                Submit Claim
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- My Claims -->
      <div v-if="activeView === 'claims'">
        <div
          class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div
            class="flex justify-between items-center p-6 border-b border-slate-100"
          >
            <h3 class="text-lg font-semibold text-slate-800">My Claims</h3>
            <select
              v-model="claimFilter"
              class="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <table class="w-full">
            <thead class="bg-slate-50 text-left">
              <tr>
                <th
                  class="px-6 py-4 text-xs uppercase tracking-wide text-slate-500 font-semibold"
                >
                  ID
                </th>
                <th
                  class="px-6 py-4 text-xs uppercase tracking-wide text-slate-500 font-semibold"
                >
                  Category
                </th>
                <th
                  class="px-6 py-4 text-xs uppercase tracking-wide text-slate-500 font-semibold"
                >
                  Amount
                </th>
                <th
                  class="px-6 py-4 text-xs uppercase tracking-wide text-slate-500 font-semibold"
                >
                  Date
                </th>
                <th
                  class="px-6 py-4 text-xs uppercase tracking-wide text-slate-500 font-semibold"
                >
                  Status
                </th>
                <th class="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="claim in filteredClaims"
                :key="claim.id"
                class="border-t border-slate-100 hover:bg-slate-50"
              >
                <td class="px-6 py-4 font-mono text-sm text-teal-600">
                  {{ claim.id }}
                </td>
                <td class="px-6 py-4 text-sm">
                  {{ getCategoryIcon(claim.category) }} {{ claim.category }}
                </td>
                <td class="px-6 py-4 text-sm font-semibold text-teal-600">
                  RM {{ claim.amount.toFixed(2) }}
                </td>
                <td class="px-6 py-4 text-sm text-slate-500">
                  {{ claim.date }}
                </td>
                <td class="px-6 py-4">
                  <span :class="getStatusBadgeClass(claim.status)">{{
                    claim.status
                  }}</span>
                </td>
                <td class="px-6 py-4">
                  <button
                    @click="viewClaimDetails(claim)"
                    class="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    👁️
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Approvals -->
      <div v-if="activeView === 'approvals'">
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div
            class="flex justify-between items-center p-6 border-b border-slate-100"
          >
            <h3 class="text-lg font-semibold text-slate-800">
              Pending Approvals
            </h3>
            <span
              class="bg-teal-500 text-white text-sm px-3 py-1 rounded-full font-semibold"
              >{{ pendingApprovals.length }}</span
            >
          </div>
          <div
            v-if="!pendingApprovals.length"
            class="p-16 text-center text-slate-400"
          >
            <span class="text-5xl block mb-4">✅</span>
            <p class="text-lg">No pending approvals</p>
          </div>
          <div v-else class="p-6 space-y-4">
            <div
              v-for="claim in pendingApprovals"
              :key="claim.id"
              class="bg-slate-50 rounded-xl p-5 border border-slate-100"
            >
              <div class="flex justify-between items-center mb-4">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm"
                  >
                    {{ claim.submitter.charAt(0) }}
                  </div>
                  <div>
                    <span class="block font-semibold text-slate-800">{{
                      claim.submitter
                    }}</span
                    ><span class="text-sm text-slate-500">{{
                      claim.department
                    }}</span>
                  </div>
                </div>
                <span class="text-2xl font-bold text-teal-600"
                  >RM {{ claim.amount.toFixed(2) }}</span
                >
              </div>
              <div class="flex gap-6 text-sm text-slate-500 mb-3">
                <span
                  >{{ getCategoryIcon(claim.category) }}
                  {{ claim.category }}</span
                >
                <span>📅 {{ claim.date }}</span>
              </div>
              <p class="text-slate-600 mb-4">{{ claim.description }}</p>
              <div
                class="flex justify-end gap-3 pt-4 border-t border-slate-200"
              >
                <button
                  @click="rejectClaim(claim.id)"
                  class="px-5 py-2.5 bg-red-50 text-red-600 rounded-xl font-semibold text-sm hover:bg-red-100 transition-colors"
                >
                  ❌ Reject
                </button>
                <button
                  @click="approveClaim(claim.id)"
                  class="px-5 py-2.5 bg-green-50 text-green-600 rounded-xl font-semibold text-sm hover:bg-green-100 transition-colors"
                >
                  ✅ Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Reports -->
      <div v-if="activeView === 'reports'" class="space-y-6">
        <div class="grid grid-cols-2 gap-5">
          <div
            class="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm"
          >
            <div
              class="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-2xl"
            >
              💰
            </div>
            <div>
              <span class="block text-2xl font-bold text-slate-800"
                >RM {{ totalClaimAmount.toFixed(2) }}</span
              ><span class="text-sm text-slate-500">Total Claims Value</span>
            </div>
          </div>
          <div
            class="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm"
          >
            <div
              class="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-2xl"
            >
              📈
            </div>
            <div>
              <span class="block text-2xl font-bold text-slate-800"
                >RM {{ avgClaimAmount.toFixed(2) }}</span
              ><span class="text-sm text-slate-500">Average Claim</span>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-slate-800 mb-6">
            Claims by Category
          </h3>
          <div class="space-y-4">
            <div
              v-for="(count, cat) in claimsByCategory"
              :key="cat"
              class="flex items-center gap-4"
            >
              <span class="w-36 text-sm text-slate-600"
                >{{ getCategoryIcon(cat) }} {{ cat }}</span
              >
              <div class="flex-1 h-6 bg-slate-100 rounded-lg overflow-hidden">
                <div
                  class="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-lg transition-all duration-500"
                  :style="{ width: (count / allClaims.length) * 100 + '%' }"
                ></div>
              </div>
              <span class="w-8 text-right font-semibold text-slate-800">{{
                count
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50"
      @click.self="showModal = false"
    >
      <div
        class="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
      >
        <div
          class="flex justify-between items-center p-5 border-b border-slate-100"
        >
          <h3 class="text-lg font-semibold text-slate-800">Claim Details</h3>
          <button
            @click="showModal = false"
            class="text-slate-400 hover:text-slate-600 text-xl"
          >
            ✕
          </button>
        </div>
        <div class="p-6 space-y-4" v-if="selectedClaim">
          <div class="flex justify-between py-3 border-b border-slate-100">
            <span class="text-slate-500">ID</span
            ><span class="font-mono text-teal-600">{{ selectedClaim.id }}</span>
          </div>
          <div class="flex justify-between py-3 border-b border-slate-100">
            <span class="text-slate-500">Category</span
            ><span
              >{{ getCategoryIcon(selectedClaim.category) }}
              {{ selectedClaim.category }}</span
            >
          </div>
          <div class="flex justify-between py-3 border-b border-slate-100">
            <span class="text-slate-500">Amount</span
            ><span class="font-semibold text-teal-600"
              >RM {{ selectedClaim.amount.toFixed(2) }}</span
            >
          </div>
          <div class="flex justify-between py-3 border-b border-slate-100">
            <span class="text-slate-500">Date</span
            ><span>{{ selectedClaim.date }}</span>
          </div>
          <div class="flex justify-between py-3 border-b border-slate-100">
            <span class="text-slate-500">Status</span
            ><span :class="getStatusBadgeClass(selectedClaim.status)">{{
              selectedClaim.status
            }}</span>
          </div>
          <div class="py-3">
            <span class="text-slate-500 block mb-2">Description</span>
            <p class="text-slate-700">{{ selectedClaim.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <Transition name="toast">
      <div
        v-if="toast.show"
        :class="[
          'fixed bottom-8 right-8 px-6 py-4 rounded-xl font-medium shadow-lg z-50',
          toast.type === 'success'
            ? 'bg-green-50 text-green-700'
            : 'bg-red-50 text-red-700',
        ]"
      >
        {{ toast.message }}
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  name: "EClaimView",
  data() {
    return {
      currentRole: "staff",
      activeView: "dashboard",
      claimFilter: "all",
      showModal: false,
      selectedClaim: null,
      toast: { show: false, message: "", type: "success" },
      newClaim: {
        category: "",
        amount: null,
        date: new Date().toISOString().split("T")[0],
        description: "",
        receipt: "",
      },
      allClaims: [
        {
          id: "CLM-001",
          category: "Travel",
          amount: 450,
          date: "2024-12-15",
          status: "Approved",
          description: "Flight to KL for client meeting",
          submitter: "Ahmad Razak",
          department: "Sales",
          hodApproved: true,
        },
        {
          id: "CLM-002",
          category: "Medical",
          amount: 280,
          date: "2024-12-14",
          status: "Pending HR",
          description: "Annual health screening",
          submitter: "Sarah Lee",
          department: "Marketing",
          hodApproved: true,
        },
        {
          id: "CLM-003",
          category: "Fuel",
          amount: 150,
          date: "2024-12-13",
          status: "Pending HOD",
          description: "Site visit to Johor",
          submitter: "John Tan",
          department: "Operations",
          hodApproved: false,
        },
        {
          id: "CLM-004",
          category: "Training",
          amount: 1200,
          date: "2024-12-12",
          status: "Pending HR",
          description: "AWS certification course",
          submitter: "Lisa Wong",
          department: "IT",
          hodApproved: true,
        },
        {
          id: "CLM-005",
          category: "Office Supplies",
          amount: 85,
          date: "2024-12-11",
          status: "Pending Finance",
          description: "Stationery for department",
          submitter: "Ahmad Razak",
          department: "Sales",
          hodApproved: true,
        },
        {
          id: "CLM-006",
          category: "Entertainment",
          amount: 320,
          date: "2024-12-10",
          status: "Rejected",
          description: "Client dinner meeting",
          submitter: "Sarah Lee",
          department: "Marketing",
          hodApproved: true,
        },
        {
          id: "CLM-007",
          category: "Travel",
          amount: 890,
          date: "2024-12-09",
          status: "Approved",
          description: "Conference in Singapore",
          submitter: "John Tan",
          department: "Operations",
          hodApproved: true,
        },
        {
          id: "CLM-008",
          category: "Medical",
          amount: 150,
          date: "2024-12-08",
          status: "Pending HOD",
          description: "Dental checkup",
          submitter: "Lisa Wong",
          department: "IT",
          hodApproved: false,
        },
      ],
    };
  },
  computed: {
    currentUser() {
      const users = {
        staff: { name: "Ahmad Razak", role: "Sales Executive", initials: "AR" },
        hod: { name: "Mohd Faizal", role: "Head of Sales", initials: "MF" },
        finance: {
          name: "Tan Wei Ming",
          role: "Finance Manager",
          initials: "TW",
        },
        hr: { name: "Nurul Aisyah", role: "HR Manager", initials: "NA" },
      };
      return users[this.currentRole];
    },
    navItems() {
      const items = [
        { id: "dashboard", icon: "🏠", label: "Dashboard" },
        { id: "submit", icon: "📝", label: "Submit Claim" },
        { id: "claims", icon: "📋", label: "My Claims" },
        { id: "reports", icon: "📊", label: "Reports" },
      ];
      if (this.canApprove)
        items.splice(3, 0, {
          id: "approvals",
          icon: "✔️",
          label: "Approvals",
          badge: this.pendingApprovals.length,
        });
      return items;
    },
    canApprove() {
      return ["hod", "finance", "hr"].includes(this.currentRole);
    },
    userClaims() {
      return this.currentRole === "staff"
        ? this.allClaims.filter((c) => c.submitter === "Ahmad Razak")
        : this.allClaims;
    },
    filteredClaims() {
      return this.claimFilter === "all"
        ? this.userClaims
        : this.userClaims.filter((c) =>
            c.status.toLowerCase().includes(this.claimFilter)
          );
    },
    pendingApprovals() {
      if (this.currentRole === "hod")
        return this.allClaims.filter((c) => c.status === "Pending HOD");
      if (this.currentRole === "finance")
        return this.allClaims.filter((c) => c.status === "Pending Finance");
      if (this.currentRole === "hr")
        return this.allClaims.filter((c) => c.status === "Pending HR");
      return [];
    },
    pendingCount() {
      return this.userClaims.filter((c) => c.status.includes("Pending")).length;
    },
    approvedCount() {
      return this.userClaims.filter((c) => c.status === "Approved").length;
    },
    rejectedCount() {
      return this.userClaims.filter((c) => c.status === "Rejected").length;
    },
    totalClaimAmount() {
      return this.allClaims.reduce((s, c) => s + c.amount, 0);
    },
    avgClaimAmount() {
      return this.totalClaimAmount / this.allClaims.length;
    },
    claimsByCategory() {
      return this.allClaims.reduce((a, c) => {
        a[c.category] = (a[c.category] || 0) + 1;
        return a;
      }, {});
    },
    currentViewTitle() {
      return {
        dashboard: "Dashboard",
        submit: "Submit Claim",
        claims: "My Claims",
        approvals: "Pending Approvals",
        reports: "Reports",
      }[this.activeView];
    },
    currentViewSubtitle() {
      return {
        dashboard: "Overview of your claims",
        submit: "Create a new expense claim",
        claims: "Track your submitted claims",
        approvals: "Review submitted claims",
        reports: "Analytics and statistics",
      }[this.activeView];
    },
  },
  methods: {
    getCategoryIcon(c) {
      return (
        {
          Travel: "✈️",
          Fuel: "⛽",
          "Office Supplies": "📎",
          Medical: "🏥",
          Training: "📚",
          Entertainment: "🎉",
        }[c] || "📄"
      );
    },
    getStatusBadgeClass(s) {
      if (s.includes("Pending"))
        return "inline-block px-3 py-1 text-xs font-medium rounded-full bg-amber-50 text-amber-700";
      if (s === "Approved")
        return "inline-block px-3 py-1 text-xs font-medium rounded-full bg-green-50 text-green-700";
      return "inline-block px-3 py-1 text-xs font-medium rounded-full bg-red-50 text-red-700";
    },
    getApproverType(c) {
      return ["Medical", "Training"].includes(c) ? "HR" : "Finance";
    },
    submitClaim() {
      this.allClaims.unshift({
        id: "CLM-" + String(this.allClaims.length + 1).padStart(3, "0"),
        ...this.newClaim,
        status: "Pending HOD",
        submitter: this.currentUser.name,
        department: "Sales",
        hodApproved: false,
      });
      this.showToast("Claim submitted successfully!", "success");
      this.newClaim = {
        category: "",
        amount: null,
        date: new Date().toISOString().split("T")[0],
        description: "",
        receipt: "",
      };
      this.activeView = "claims";
    },
    approveClaim(id) {
      const c = this.allClaims.find((x) => x.id === id);
      if (this.currentRole === "hod") {
        c.status =
          this.getApproverType(c.category) === "HR"
            ? "Pending HR"
            : "Pending Finance";
        c.hodApproved = true;
      } else c.status = "Approved";
      this.showToast("Claim approved!", "success");
    },
    rejectClaim(id) {
      this.allClaims.find((x) => x.id === id).status = "Rejected";
      this.showToast("Claim rejected", "error");
    },
    viewClaimDetails(c) {
      this.selectedClaim = c;
      this.showModal = true;
    },
    showToast(msg, type) {
      this.toast = { show: true, message: msg, type };
      setTimeout(() => (this.toast.show = false), 3000);
    },
  },
};
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
