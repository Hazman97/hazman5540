<template>
    <div>
      <h1
        style="
          background-color: #032539;
          color: #fef9ef;
          text-align: center;
          padding: 1rem;
          font-size: 1.5em;
          z-index: 1;
        "
      >
        Organization Chart
      </h1>
      <div class="space-x-3 p-1 relative space-y-1">
        <button
          class="border rounded-lg p-1.5 border-gray-500 text-gray-800 hover:text-slate-900 hover:bg-slate-200"
          @click="fitChart"
        >
          Fit to the screen
        </button>
  
        <button
          class="border rounded-lg p-1.5 border-gray-500border border-gray-500 text-gray-800 hover:text-slate-900 hover:bg-slate-200"
          @click="cycleLayout"
        >
          Change Layout
        </button>
  
        <button
          class="border rounded-lg p-1.5 border-gray-500border border-gray-500 text-gray-800 hover:text-slate-900 hover:bg-slate-200"
          @click="fullscreen"
        >
          Full Screen
        </button>
        <button
          class="border rounded-lg p-1.5 border-gray-500border border-gray-500 text-gray-800 hover:text-slate-900 hover:bg-slate-200"
          @click="expandAllNodes"
        >
          Expand All
        </button>
        <button
          class="border rounded-lg p-1.5 border-gray-500border border-gray-500 text-gray-800 hover:text-slate-900 hover:bg-slate-200"
          @click="collapseAllNodes"
        >
          Collapse All
        </button>
        <!-- Export buttons -->
        <button
          class="border rounded-lg p-1.5 border-gray-500 text-gray-800 hover:text-slate-900 hover:bg-slate-200"
          @click="exportCurrentImage"
        >
          Export Current
        </button>
  
        <button
          class="border rounded-lg p-1.5 border-gray-500 text-gray-800 hover:text-slate-900 hover:bg-slate-200"
          @click="exportFullImage"
        >
          Export Full
        </button>
  
        <button
          class="border rounded-lg p-1.5 border-gray-500 text-gray-800 hover:text-slate-900 hover:bg-slate-200"
          @click="exportSvg"
        >
          Export SVG
        </button>
  
        <button
          class="border rounded-lg p-1.5 border-gray-500 text-gray-800 hover:text-slate-900 hover:bg-slate-200"
          @click="exportPdf"
        >
          Export PDF
        </button>
        <button
          @click="showAddNodeModal"
          class="bg-[#032539] hover:bg-[#032539c7] text-[#FBF3F2] border rounded-lg p-1.5"
        >
          Add Node
        </button>
        <div class="flex pt-1 search:right-2 search:top-2 search:absolute">
          <input
            class="p-2 rounded"
            type="text"
            placeholder="Search..."
            v-model="searchQuery"
            @input="filterChart"
          />
        </div>
      </div>
      <div
        v-if="isAddNodeModalOpen"
        class="modal fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center"
        @click.self="closeAddNodeModal"
      >
        <div
          class="modal-content bg-white rounded-lg p-8"
          style="max-height: calc(100vh - 20px); overflow-y: auto"
        >
          <span
            @click="closeAddNodeModal"
            class="close absolute top-0 right-0 mt-4 mr-4 text-gray-600 cursor-pointer"
            >&times;</span
          >
          <h2 class="text-xl font-bold mb-4">Add Node</h2>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
          <div class="mb-4">
              <label for="nodeName" class="block text-gray-700 font-bold mb-2"
                >Picture:</label
              >
              <div>
                <input
                  type="file"
                  class="filepond"
                  ref="filepond3"
                  accept="image/*"
                />
              </div>
            </div>
            <div class="mb-4">
              <label for="nodeId" class="block text-gray-700 font-bold mb-2"
                >Node ID:</label
              >
              <input
                type="text"
                id="nodeId"
                v-model="newNode.id"
                class="border rounded-md px-4 py-2 w-full"
              />
            </div>
            <div class="mb-4">
              <label for="nodeParentId" class="block text-gray-700 font-bold mb-2"
                >Department:</label
              >
              <select
                name="nodedepartment"
                class="border rounded-md px-4 py-2 w-full"
                v-model="newNode.department"
                id=""
              >
                <option
                  v-for="department in departments"
                  :key="department.code"
                  :value="department.code"
                >
                  {{ department.name }}
                </option>
              </select>
            </div>
  
            <div class="mb-4">
              <label for="nodeName" class="block text-gray-700 font-bold mb-2"
                >Reporting To:</label
              >
              <!-- Search input -->
  
              <input
                id="autocompleteInput"
                placeholder="Select name"
                class="px-5 py-3 w-full border border-gray-300 rounded-md"
                v-model="newNode.parentId"
                @keyup="onKeyUp"
              />
              <div
                id="dropdown"
                class="w-80 h-60 border border-gray-300 rounded-md bg-white absolute overflow-y-auto"
                v-show="showDropdown"
              >
                <div
                  v-for="item in filteredParentidNewNode"
                  :key="item.name"
                  @click="selectOption(item.id)"
                  class="px-5 py-3 border-b border-gray-200 text-stone-600 cursor-pointer hover:bg-slate-100 transition-colors overflow-y-auto"
                >
                {{ item.department }} -  {{ item.id }} - {{ item.name }}
                </div>
              </div>
            </div>
            
            <div class="mb-4">
              <label for="nodeName" class="block text-gray-700 font-bold mb-2"
                >Node Name:</label
              >
              <input
                type="text"
                id="nodeName"
                v-model="newNode.name"
                class="border rounded-md px-4 py-2 w-full"
              />
            </div>
            <div class="mb-4">
              <label for="positionCode" class="block text-gray-700 font-bold mb-2"
                >Position Code:</label
              >
              <input
                type="text"
                id="positionCode"
                v-model="newNode.positionCode"
                class="border rounded-md px-4 py-2 w-full"
              />
            </div>
            <div class="mb-4">
              <label
                for="positionTitle"
                class="block text-gray-700 font-bold mb-2"
                >Position Title:</label
              >
              <input
                type="text"
                id="positionTitle"
                v-model="newNode.positionTitle"
                class="border rounded-md px-4 py-2 w-full"
              />
            </div>
            <div class="mb-4">
              <label for="emailAddress" class="block text-gray-700 font-bold mb-2"
                >Email Address:</label
              >
              <input
                type="email"
                id="emailAddress"
                v-model="newNode.emailAddress"
                class="border rounded-md px-4 py-2 w-full"
              />
            </div>
            <div class="mb-4">
              <label for="phoneNumber" class="block text-gray-700 font-bold mb-2"
                >Phone Number:</label
              >
              <input
                type="text"
                id="phoneNumber"
                v-model="newNode.phoneNumber"
                class="border rounded-md px-4 py-2 w-full"
              />
            </div>
            <div class="mb-4">
              <label for="homeAddress" class="block text-gray-700 font-bold mb-2"
                >Home Address:</label
              >
              <input
                type="text"
                id="homeAddress"
                v-model="newNode.homeAddress"
                class="border rounded-md px-4 py-2 w-full"
              />
            </div>
            <!--<div class="mb-4">
        <label for="spouse" class="block text-gray-700 font-bold mb-2"
          >Spouse:</label
        >
        <input
          type="text"
          id="spouse"
          v-model="newNode.spouse"
          class="border rounded-md px-4 py-2 w-full"
        />
      </div>-->
          </div>
  
          <button
            @click="addNodeAndSave"
            class="bg-[#FA991C] hover:bg-[#FA991C] text-white font-bold py-2 px-4 rounded"
          >
            Add Node
          </button>
        </div>
      </div>
      <!-- Your template -->
      <!-- Your template -->
      <div
        v-if="isClickModal"
        class="modal fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center"
        @click.self="closeClickModal"
      >
        <div
          class="modal-content bg-white rounded-lg p-8"
          style="max-height: calc(100vh - 20px); overflow-y: auto"
        >
          <!-- Modal header -->
          <!-- Your existing modal header content -->
  
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <!-- Modal content -->
            <div class="w-full">
              <img
                :src="this.clickedNodeData.imageUrl"
                alt=""
                class="w-28 ml-10"
              />
              <div v-show="showupdatepicture">
                <input
                  type="file"
                  class="filepond"
                  ref="filepond"
                  accept="image/*"
                />
              </div>
              <div v-show="hide">
                <input
                  type="file"
                  class="filepond2"
                  ref="filepond2"
                  accept="image/*"
                />
              </div>
            <div v-show="showupdatepicture"  class="flex justify-end"> </div>
            </div>
  
            <div class="mb-4">
              <label for="nodeId" class="block text-gray-700 font-bold mb-2"
                >Node ID:</label
              >
              <input
                type="text"
                id="nodeId"
                v-model="clickedNodeData.id"
                :disabled="!isEditMode"
                class="border rounded-md px-4 py-2 w-full"
              />
            </div>
            <div class="mb-4">
              <label for="nodeName" class="block text-gray-700 font-bold mb-2"
                >Node Name:</label
              >
              <input
                type="text"
                id="nodeName"
                v-model="clickedNodeData.name"
                :disabled="!isEditMode"
                class="border rounded-md px-4 py-2 w-full"
              />
            </div>
            <div class="mb-4">
              <label for="nodeParentId" class="block text-gray-700 font-bold mb-2"
                >Department:</label
              >
              <select
                name="nodedepartment"
                class="border rounded-md px-4 py-2 w-full"
                :disabled="!isEditMode"
                v-model="clickedNodeData.department"
                id=""
              >
                <option
                  v-for="department in departments"
                  :key="department.code"
                  :value="department.code"
                >
                  {{ department.name }}
                </option>
              </select>
            </div>
            <div class="mb-4">
              <label for="nodeName" class="block text-gray-700 font-bold mb-2"
                >Parent Id:</label
              >
              <!-- Search input -->
  
              <input
                :disabled="!isEditMode"
                id="autocompleteInput"
                placeholder="Select name"
                class="px-5 py-3 w-full border border-gray-300 rounded-md"
                v-model="clickedNodeData.parentId"
                @keyup="onKeyUp"
              />
              <div
                id="dropdown"
                class="w-80 h-60 border border-gray-300 rounded-md bg-white absolute overflow-y-auto"
                v-show="showDropdown"
                
              >
                <div
                v-for="item in filteredParentid"
                :key="item.name"
                @click="selectParentId(item.id)"
                class="px-5 py-3 border-b border-gray-200 text-stone-600 cursor-pointer hover:bg-slate-100 transition-colors overflow-y-auto"
                >
                {{ item.id }} - {{ item.name }}
                </div>
              </div>
            </div>
  
            <div class="mb-4">
              <label for="nodeParentId" class="block text-gray-700 font-bold mb-2"
                >Email:</label
              >
              <input
                type="text"
                id="email"
                v-model="clickedNodeData.email"
                :disabled="!isEditMode"
                class="border rounded-md px-4 py-2 w-full"
              />
            </div>
            <div class="mb-4">
              <label for="nodeParentId" class="block text-gray-700 font-bold mb-2"
                >phone number:</label
              >
              <input
                type="text"
                id="phonenumber"
                v-model="clickedNodeData.phone"
                :disabled="!isEditMode"
                class="border rounded-md px-4 py-2 w-full"
              />
            </div>
            <div class="mb-4">
              <label for="nodeParentId" class="block text-gray-700 font-bold mb-2"
                >Position:</label
              >
              <input
                type="text"
                id="positioname"
                v-model="clickedNodeData.positionName"
                :disabled="!isEditMode"
                class="border rounded-md px-4 py-2 w-full overflow-x-auto"
              />
            </div>
            <div class="mb-4">
              <label for="nodeParentId" class="block text-gray-700 font-bold mb-2"
                >position code:</label
              >
              <input
                type="text"
                id="positioncode"
                v-model="clickedNodeData.positioncode"
                :disabled="!isEditMode"
                class="border rounded-md px-4 py-2 w-full"
              />
            </div>
            <div class="mb-4">
              <label for="nodeParentId" class="block text-gray-700 font-bold mb-2"
                >address:</label
              >
              <input
                type="text"
                id="address"
                v-model="clickedNodeData.address"
                :disabled="!isEditMode"
                class="border rounded-md px-4 py-2 w-full"
              />
            </div>
            <!-- Add/Edit node button -->
          </div>
          <div class="flex justify-end">
            <button
              @click="toggleEditMode"
              class="bg-[#FA991C] hover:bg-[#FA991C] text-white font-bold py-2 px-4 rounded"
            >
              {{ isEditMode ? "Save" : "Edit" }}
              <!-- Change button text based on edit mode -->
            </button>
  
            <!-- Delete node button -->
            <button
              @click="confirmDelete(clickedNodeData.id)"
              class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
  
      <div ref="chartContainer"></div>
    </div>
  </template>
  
  <script>
  import { create, registerPlugin } from "filepond";
  
  import FilePondPluginFileEncode from "filepond-plugin-file-encode";
  import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
  import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
  import FilePondPluginImagePreview from "filepond-plugin-image-preview";
  import FilePondPluginImageCrop from "filepond-plugin-image-crop";
  import FilePondPluginImageResize from "filepond-plugin-image-resize";
  import FilePondPluginImageTransform from "filepond-plugin-image-transform";
  
  import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
  import "filepond/dist/filepond.min.css";
  import axios from "axios";
  import { OrgChart } from "d3-org-chart";
  import FormData from "form-data";
  
  // import employeesData from '../views/data'
  import html2canvas from "html2canvas";
  // import { POSITION } from "html2canvas/dist/types/css/property-descriptors/position";
  import jsPDF from "jspdf";
  
  registerPlugin(
    FilePondPluginFileEncode,
    FilePondPluginFileValidateType,
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginImageCrop,
    FilePondPluginImageResize,
    FilePondPluginImageTransform
  );
  
  export default {
    name: "TestComponent",
    data() {
      return {
        departments: [
          { name: "HR", code: "HR" },
          { name: "ICT", code: "ICT" },
  
          { name: "Finance", code: "Finance" },
          { name: "Marketing", code: "Marketing" },
          { name: "Sales", code: "Sales" },
          { name: "D'TOR OFFICE", code: "D'TOR OFFICE"}
        ],
        hide: false,
        files2: [],
        files: [],
        keyword: "",
        isAddNodeModalOpen: false,
        newNode: {
          id: "",
          name: "",
          parentId: "",
          reporting_to: "",
          position_code: "",
          position_title: "",
          email_address: "",
          phone_number: "",
          home_address: "",
          //spouse: "",
          department: "",
          // Add more properties as needed
        },
        clickedNodeData: {
          id: "",
          name: "",
          parentId: "",
        },
        data: [],
        chartReference: null,
        layoutIndex: 0,
        layoutPositions: ["top", "right", "left", "bottom"],
        isFullscreen: false,
        highlightedNodeId: null,
        searchQuery: "",
        isChartMinimized: false,
        chart: null,
        isClickModal: false,
        isEditMode: false,
        showDropdown: false,
        showupdatepicture: false,
        selectedepartment: "",
      };
    },
    computed: {
      filteredData() {
        return this.data.filter((item) =>
          item.name.toUpperCase().includes(this.newNode.parentId.toUpperCase())
        );
      },
      filteredParentidNewNode() {
        if (!this.newNode.parentId) {
          return this.data;
        }
       return this.data.filter((person) => {
    const keywordMatch = this.newNode.parentId
      ? (person.name && person.name.toLowerCase().includes(this.newNode.parentId.toLowerCase())) ||
        (person.department && person.department.toLowerCase().includes(this.newNode.parentId.toLowerCase())) ||
        (person.id && person.id.toLowerCase().includes(this.newNode.parentId.toLowerCase()))
      : true;
  
    return keywordMatch;
  });
      },
      filteredParentid() {
        if (!this.clickedNodeData.parentId) {
          return this.data;
        }
        return this.data.filter((person) => {
          const keywordMatch = this.clickedNodeData.parentId
      ? (person.name && person.name.toLowerCase().includes(this.clickedNodeData.parentId.toLowerCase())) ||
        (person.department && person.department.toLowerCase().includes(this.clickedNodeData.parentId.toLowerCase())) ||
        (person.id && person.id.toLowerCase().includes(this.clickedNodeData.parentId.toLowerCase()))
      : true;
          return keywordMatch ;
        });
      },
    },
    mounted() {},
    watch: {
      isClickModal(newVal) {
        if (newVal) {
          // Modal is shown, initialize FilePond
          this.$nextTick(() => {
            this.initializeFilePond();
            this.initializeFilePond2();
          });
        }
      },
      isAddNodeModalOpen(newVal) {
        if (newVal) {
          // Modal is shown, initialize FilePond
          this.$nextTick(() => {
            this.initializeFilePond3();
  
          });
        }
      },
    },
    created() {
      this.fetchData();
      //  this.$nextTick(() => {
      //     this.initializeFilePond();
      //   });
    },
    methods: {
      confirmDelete(id) {
        // Display a confirmation dialog
        if (window.confirm("Are you sure you want to delete this user?")) {
          // If the user clicks "OK", proceed with the deletion
          this.deleteNode(id);
        } else {
          // If the user clicks "Cancel", do nothing
          // You can add additional handling here if needed
        }
      },
      initializeFilePond3() {
        console.log("check filepond", this.$refs.filepond3);
        if (this.$refs.filepond3) {
          const pond = create(this.$refs.filepond3, {
            labelIdle: `Drag & Drop to update your picture`,
          });
          console.log("check filepond", this.clickedNodeData.imageUrl);
  
          pond.on("addfile", (error, file) => {
            if (!error) {
              console.log("Added file name:", file.file.name); // Access file name
              this.files2 = [file.file]; // Replace files array with the new file
            }
          });
  
          pond.on("removefile", () => {
            this.files2 = []; // Clear files array when file is removed
          });
        } else {
          console.error("FilePond element not found.");
        }
      },
      initializeFilePond() {
        console.log("check filepond", this.$refs.filepond);
        if (this.$refs.filepond) {
          const pond = create(this.$refs.filepond, {
            labelIdle: `Drag & Drop to update your picture`,
          });
          console.log("check filepond", this.clickedNodeData.imageUrl);
  
          pond.on("addfile", (error, file) => {
            if (!error) {
              console.log("Added file name:", file.file.name); // Access file name
              this.files2 = [file.file]; // Replace files array with the new file
            }
          });
  
          pond.on("removefile", () => {
            this.files2 = []; // Clear files array when file is removed
          });
        } else {
          console.error("FilePond element not found.");
        }
      },
      initializeFilePond2() {
        if (this.$refs.filepond2) {
          const pond2 = create(this.$refs.filepond2, {
            labelIdle: `Drag & Drop your picture or <span class="filepond--label-action">Browse</span>`,
            stylePanelLayout: "compact circle",
            imagePreviewHeight: 150,
            imageCropAspectRatio: "1:1",
            imageResizeTargetWidth: 150,
            imageResizeTargetHeight: 150,
            styleLoadIndicatorPosition: "center bottom",
            styleButtonRemoveItemPosition: "center bottom",
            files: [
              {
                source: this.clickedNodeData.imageUrl,
                //   options: {
                // type: 'local'
                // }
              },
            ],
          });
  
          pond2.on("addfile", (error, file) => {
            if (!error) {
              console.log("Added file name:", file.file.name); // Access file name
              this.files = [file.file]; // Replace files array with the new file
            } // Event handler for the second FilePond instance
          });
  
          pond2.on("removefile", () => {
            // Event handler for file removal in the second FilePond instance
          });
        } else {
          console.error("FilePond element 2 not found.");
        }
      },
      // saveToFilePond() {
      //   if (this.files.length === 0) {
      //     console.error("No files selected.");
      //     return;
      //   }
  
      //   const formData = new FormData();
      //   formData.append("profile_picture", this.files[0]);
      //   formData.append("emp_id", this.clickedNodeData.id);
      //   formData.append("name", this.clickedNodeData.name);
      //   formData.append("reporting_to", this.clickedNodeData.parentId);
      //   formData.append("position_code", this.clickedNodeData.positionCode);
  
      //   formData.append("email_address", this.clickedNodeData.email);
      //   formData.append("phone_number", this.clickedNodeData.phone);
      //   formData.append("home_address", this.clickedNodeData.address);
      //   formData.append("department", this.clickedNodeData.department);
  
      //   axios
      //     .put("http://172.28.28.91:97/api/Admin/UpdateEmployee", formData, {
      //       headers: {
      //         "Content-Type": "multipart/form-data",
      //       },
      //     })
      //     .then((response) => {
      //       console.log("File uploaded successfully:", response.data);
      //       // Handle response from server
      //     })
      //     .catch((error) => {
      //       console.error("Error uploading file:", error);
      //       // Handle error
      //     });
      // },
  
      onKeyUp() {
        this.showDropdown = true;
      },
      selectOption(selectedOption) {
        this.newNode.parentId = selectedOption;
        this.showDropdown = false;
      },
      selectParentId(selectedOption) {
        this.clickedNodeData.parentId = selectedOption;
        this.showDropdown = false;
      },
  
      toggleEditMode() {
        if (this.isEditMode) {
          this.saveNode(); // Call saveNode method if in edit mode
        } else {
          this.isEditMode = !this.isEditMode; // Toggle edit mode
          this.showupdatepicture = !this.showupdatepicture;
        }
      },
      uploadimg() {  const formData = new FormData();
  
  // Append employee data to the FormData object
  formData.append("emp_id", this.clickedNodeData.id);
  formData.append("profile_picture", this.files2[0]);
  
  
  
  axios
    .put("http://172.28.28.91:97/api/Admin/UpdateImage", formData)
    .then((response) => {
      console.log("File uploaded successfully:", response.data);
    
      this.fetchData();
    })
    .catch((error) => {
      console.error("Error uploading file:", error);
      // Handle error
    });
      
      },
      saveNode() {
    // Prepare the employee data object
    const employeeData = {
      emp_id: this.clickedNodeData.id,
      name: this.clickedNodeData.name,
      reporting_to: this.clickedNodeData.parentId,
      position_code: this.clickedNodeData.positioncode,
      position_title: this.clickedNodeData.positionName,
      email_address: this.clickedNodeData.email,
      phone_number: this.clickedNodeData.phone,
      home_address: this.clickedNodeData.address,
      department: this.clickedNodeData.department
      // Add other employee data fields as needed
    };
  
    // Make the PUT request with JSON data
    axios
      .put("http://172.28.28.91:97/api/Admin/UpdateEmployee", employeeData, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((response) => {
        console.log("Employee data updated successfully:", response.data);
        this.fetchData();
        this.uploadimg();
        this.isClickModal = false;
        this.isEditMode = false;
      
      })
      .catch((error) => {
        console.error("Error updating employee data:", error);
        // Handle error
      });
  },
  
  
      async addNodeAndSave() {
        try {
          // Save the node data to the database first
          const formData = new FormData();
          formData.append("emp_id", this.newNode.id);
          formData.append("name", this.newNode.name);
          formData.append("reporting_to", this.newNode.parentId); // Assuming parent_id is correct
          formData.append("position_code", this.newNode.positionCode); // Use correct property name
          formData.append("position_title", this.newNode.positionTitle); // Use correct property name
          formData.append("email_address", this.newNode.emailAddress); // Use correct property name
          formData.append("phone_number", this.newNode.phoneNumber); // Use correct property name
          formData.append("home_address", this.newNode.homeAddress); // Use correct property name
          formData.append("spouse", this.newNode.spouse); // Use correct property name
          formData.append("department", this.newNode.department); // Use correct property name
          formData.append("profile_picture", this.files2[0]);
  
          const uploadResponse = await axios.post(
            "http://172.28.28.91:97/api/Admin/InsertNewEmployee",
            formData
          );
  
          console.log("Node data saved to the database:", uploadResponse.data);
  
          // After saving to the database, add the node to the organization chart
          if (this.chartReference) {
            // Ensure that parentId is provided and not empty
            if (this.newNode.parentId.trim() !== "") {
              // Add the node to the chart
              this.chartReference.addNode(this.newNode).render();
            } else {
              console.error("Error: ParentId is empty or not provided.");
              // Handle the case where parentId is not provided
              // For example, display an error message to the user
            }
          }
  
          // Reset the form values
          this.newNode = {
            id: "",
            name: "",
            parentId: "",
            positionCode: "",
            positionTitle: "",
            emailAddress: "",
            phoneNumber: "",
            homeAddress: "",
            spouse: "",
            department: "",
            // Add other properties as needed
          };
          this.isAddNodeModalOpen = false;
          this.renderChart();
        } catch (error) {
          console.error("Error adding and saving node:", error);
          // Handle errors
        }
      },
  
      async deleteNode(nodeId) {
        try {
          // Check if the node is being referred to by another node
          if (this.hasReferenceToOtherUser(this.data, nodeId)) {
            window.alert(
              "Cannot delete user because it is referred to by another user."
            );
            return; // Exit the function if the node is being referred to
          }
  
          // If the node is not being referred to, proceed with deletion
          // Send a request to your API to delete the node using the nodeId
          await axios.delete(
            `http://172.28.28.91:97/api/Admin/DeleteEmployee/${nodeId}`
          );
  
          // If the deletion is successful, remove the node from the data array
          const nodeIndex = this.data.findIndex((node) => node.id === nodeId);
          if (nodeIndex !== -1) {
            this.data.splice(nodeIndex, 1);
  
            // Re-render the chart to reflect the changes
            this.renderChart();
  
            // Close any modal or reset any state related to the deleted node if needed
            this.isClickModal = false;
          } else {
            console.error("Node not found:", nodeId);
          }
        } catch (error) {
          console.error("Error deleting node:", error);
          // Handle errors, such as displaying an error message to the user
        }
      },
  
      hasReferenceToOtherUser(data, userId) {
        // Iterate through the data array
        for (let i = 0; i < data.length; i++) {
          // Check if the parentId of any user matches the userId
          if (data[i].parentId === userId) {
            return true; // If a match is found, return true
          }
        }
        return false; // If no match is found, return false
      },
  
      closeClickModal() {
        this.isClickModal = false;
        this.isEditMode = false;
        this.showupdatepicture = false;
      },
      addNode() {
        // Here you can implement the logic to add the node based on this.clickedNodeData
        // For example, you can call an API to add the node to your data source
        console.log("Adding node:", this.clickedNodeData);
  
        // After adding the node, you might want to close the modal
        this.isClickModal = false;
      },
      fetchData() {
        fetch("http://172.28.28.91:97/api/User/GetAllEmployees", {
          mode: "cors", // Adding CORS mode
        })
          .then((response) => response.json())
          .then((response) => {
            console.log("Fetched data:", response);
  
            // Extract the result array from the response data
            const resultArray = response.result;
  
            // Transform keys of the items in the result array
            const modifiedData = resultArray.map((item) => ({
              id: item.emp_id,
              parentId: item.reporting_to,
              name: item.name,
              positionCode: item.position_code,
              positionName: item.position_title,
              phone: item.phone_number,
              email: item.email_address,
              team: "", // You may need to provide a value for the team key
              location: item.home_address,
              department: item.department,
              description: "", // You may need to provide a description value
              imageUrl: item.profile_picture, // You may need to provide an image URL
            }));
  
            console.log("Fetched and modified data:", modifiedData);
  
            // Assign the modified data to your component's data property
            this.data = modifiedData;
  
            // Perform any other actions with the data
            // For example, render a chart
            console.log("Value of this selepas fetcg:", this.data);
            this.renderChart();
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
  
        // Promise.resolve(employeesData)
        //   .then((data) => {
        //     console.log('Fetched data:', data)
        //     this.data = data
        //     this.renderChart()
        //   })
        //   .catch((error) => {
        //     console.error('Error fetching data:', error)
        //   })
      },
      renderChart() {
        console.log("renderChart method called");
        console.log("Value of this:", this);
        // Existing logic of the renderChart method...
  
        if (!this.chartReference) {
          this.chartReference = new OrgChart();
        }
  
        this.chartReference
          .container(this.$refs.chartContainer)
          .data(this.data)
          .nodeWidth(() => 250)
          .initialZoom(0.7)
          .nodeHeight(() => 175)
          .childrenMargin(() => 40)
          .compactMarginBetween(() => 15)
          .compactMarginPair(() => 80)
          .nodeContent((d) => {
            return `
                <div style="padding-top:30px;background-color:none;margin-left:1px;height:${
                  d.height
                }px;border-radius:2px;overflow:visible">
                  <div style="height:${
                    d.height - 32
                  }px;padding-top:0px;background-color:white;border:1px solid lightgray;">
    
                    <img src=" ${
                      d.data.imageUrl
                    }" style="margin-top:-30px;margin-left:${
                      d.width / 2 - 30
                    }px;border-radius:100px;width:60px;height:60px;" />
    
                   <div style="margin-right:10px;margin-top:1px;float:right;font-size:10px">${
                     d.data.id
                   }</div>
                   
                   <div style="margin-top:-30px;background-color:#293171;height:10px;width:${
                     d.width - 2
                   }px;border-radius:1px"></div>
    
                   <div style="padding:20px; padding-top:35px;text-align:center">
                       <div style="color:#111672;font-size:10px;font-weight:bold"> ${
                         d.data.name
                       } </div>
                       <div style="color:#404040;font-size:10px;margin-top:4px"> ${
                         d.data.positionName
                       } </div>
                   </div> 
                   <div style="display:flex;justify-content:space-between;padding-left:15px;padding-right:15px;">
                     <div > Manages:  ${d.data._directSubordinates} 👤</div>  
                     <div > Oversees: ${d.data._totalSubordinates} 👤</div>    
                   </div>
                  </div>     
          </div>
      `;
          })
          .layout(this.layoutPositions[this.layoutIndex])
          .render();
  
        this.chartReference.onNodeClick((node) => {
          // Assuming `node` contains the data directly
          this.clickedNodeData = {
            id: node.data.id,
            parentId: node.data.parentId,
            name: node.data.name,
            positionName: node.data.positionName,
            phone: node.data.phone,
            email: node.data.email,
            department: node.data.department,
            imageUrl: node.data.imageUrl,
            address: node.data.location,
            positioncode: node.data.positionCode,
          };
  
          // Log the clicked node data for debugging
          console.log("Clicked Node Data:", this.clickedNodeData);
          this.isClickModal = true;
          this.files = this.clickedNodeData.imageUrl;
          console.log("img files", this.files);
          // Open the add node modal
        });
  
        console.log("Chart rendered:", this.chartReference);
      },
      fitChart() {
        if (this.chartReference) {
          this.chartReference.fit();
        }
      },
      cycleLayout() {
        this.layoutIndex = (this.layoutIndex + 1) % this.layoutPositions.length;
  
        this.renderChart();
      },
      fullscreen() {
        const chartContainer = this.$refs.chartContainer;
        if (!this.isFullscreen) {
          if (chartContainer.requestFullscreen) {
            chartContainer.requestFullscreen();
          } else if (chartContainer.mozRequestFullScreen) {
            /* Firefox */
            chartContainer.mozRequestFullScreen();
          } else if (chartContainer.webkitRequestFullscreen) {
            /* Chrome, Safari & Opera */
            chartContainer.webkitRequestFullscreen();
          } else if (chartContainer.msRequestFullscreen) {
            /* IE/Edge */
            chartContainer.msRequestFullscreen();
          }
          // Listen for the keydown event on the document
          document.addEventListener("keydown", this.handleKeyDown);
        }
        // Toggle isFullscreen value
        this.isFullscreen = !this.isFullscreen;
        this.isFullscreen = false;
      },
  
      toggleHighlight(nodeId) {
        if (this.highlightedNodeId === nodeId) {
          this.clearHighlighting();
        } else {
          this.setHighlighted(nodeId);
        }
      },
      setHighlighted(nodeId) {
        // Your code to highlight the specified node
        // Example:
        // Update node class, change color, etc.
        this.highlightedNodeId = nodeId;
        // Trigger re-rendering of the chart
        this.renderChart();
      },
      clearHighlighting() {
        // Your code to clear highlighting
        // Example:
        // Reset all nodes to default state
        this.highlightedNodeId = null;
        // Trigger re-rendering of the chart
        this.renderChart();
      },
      filterChart(event) {
        const value = event.target.value.toLowerCase();
        const chart = this.chartReference;
  
        // Clear previous highlighting
        chart.clearHighlighting();
  
        // Get chart nodes
        const data = chart.data();
        let foundNode = null;
  
        // Un-minimize the chart if it's currently minimized
  
        // Loop over data and check if input value matches any name
        data.forEach((d) => {
          if (value !== "" && d.name && d.name.toLowerCase().includes(value)) {
            // If matches, mark node as highlighted
            d._highlighted = true;
            d._expanded = true;
            // Keep track of the first matching node found
            if (!foundNode) {
              foundNode = d;
            }
          }
        });
  
        // Update data and re-render the chart
        chart.data(data).render().fit();
  
        // If a matching node is found, navigate to it
        if (foundNode) {
          // Delay focusing on the node to ensure it's rendered
          setTimeout(() => {
            const nodeElement = document.querySelector(
              `[data-node-id="${foundNode.id}"]`
            );
            if (nodeElement) {
              nodeElement.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "center",
              });
            }
          }, 200); // Adjust delay as needed
        }
      },
      expandAllNodes() {
        if (this.chartReference) {
          this.chartReference.expandAll().fit();
        }
      },
      collapseAllNodes() {
        if (this.chartReference) {
          this.chartReference.collapseAll().fit();
        }
      },
      exportCurrentImage() {
        console.log("Exporting current image...");
        if (this.chartReference) {
          this.chartReference.exportImg({
            save: true,
            format: "png",
            quality: 1,
            full: false,
            background: "#ffffff",
            width: null,
            height: null,
            filename: "chart",
            style: {
              "font-family": "Arial",
              "font-size": "12px",
              "text-align": "left",
              "background-color": "#ffffff",
            },
          });
        }
      },
  
      exportFullImage() {
        console.log("Exporting full image...");
        if (this.chartReference) {
          this.chartReference.exportImg({
            save: true,
            format: "png",
            quality: 1,
            full: true,
            background: "#ffffff",
            width: null,
            height: null,
            filename: "chart",
            style: {
              "font-family": "Arial",
              "font-size": "12px",
              "text-align": "left",
              "background-color": "#ffffff",
            },
          });
        }
      },
      exportSvg() {
        if (this.chartReference) {
          this.chartReference.exportSvg();
        }
      },
      exportPdf() {
        const chartContainer = this.$refs.chartContainer;
  
        if (chartContainer) {
          html2canvas(chartContainer).then((canvas) => {
            const imgData = canvas.toDataURL("image/jpeg", 1.0);
            const pdf = new jsPDF();
            const width = pdf.internal.pageSize.getWidth();
            const height = (canvas.height * width) / canvas.width;
            pdf.addImage(imgData, "JPEG", 0, 0, width, height);
            pdf.save("chart.pdf");
          });
        }
      },
      showAddNodeModal() {
        this.isAddNodeModalOpen = true;
      },
      closeAddNodeModal() {
        this.isAddNodeModalOpen = false;
      },
      addNodeToRoot() {
        console.log("addNodeToRoot method called");
        if (this.chartReference) {
          // Call the method to add a node to the root with the values from the form
          this.chartReference.addNode(this.newNode).render();
          // Reset the form values
          this.newNode = {
            id: "",
            name: "",
            parentId: "",
            // Reset other properties as needed
          };
          // Close the modal
          this.closeAddNodeModal();
        }
      },
    },
  };
  </script>
  <style scoped>
  #dropdown {
    max-height: 200px; /* Adjust this value to fit your needs */
  }
  </style>
  