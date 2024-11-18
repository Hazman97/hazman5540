<template>
  <div class="p-4">
    <h2 class="text-2xl font-semibold">Upload New Image</h2>
    <form @submit.prevent="uploadImage">
      <input
        v-model="title"
        type="text"
        placeholder="Title"
        class="mt-4"
        required
      />
      <textarea
        v-model="description"
        placeholder="Description"
        class="mt-4"
        required
      ></textarea>
      <select v-model="category" class="mt-4" required>
        <option disabled value="">Select Category</option>
        <option value="travel">Travel</option>
        <option value="vlog">Vlog</option>
        <option value="hiking">Hiking</option>
      </select>
      <input type="file" @change="handleFileUpload" class="mt-4" required />
      <button type="submit" class="btn mt-4">Upload</button>
    </form>
  </div>
</template>

<script>
import { supabase } from "../../supabase";

export default {
  data() {
    return {
      title: "",
      description: "",
      category: "",
      file: null,
    };
  },
  async mounted() {
    try {
      const { data: user, error } = await supabase.auth.getUser();
      if (error) throw error;
      console.log("Authenticated User ID:", user.id);
    } catch (error) {
      console.error("Error fetching user:", error.message);
    }
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
      console.log(this.file); // Log to check if the file is selected
    },
    async uploadImage() {
      if (!this.file) {
        alert("No file selected");
        return;
      }

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from("photos")
        .upload(`public/${this.file.name}`, this.file);

      if (error) {
        console.error("Error uploading image:", error.message);
        alert("Error uploading image: " + error.message);
        return;
      }

      // Get Public URL of Uploaded Image
      const { publicURL } = supabase.storage
        .from("photos")
        .getPublicUrl(data.path);
      if (!publicURL) {
        alert("Failed to get image URL");
        return;
      }

      // Save Image Data in Supabase Database
      // Add this line to verify the ID
      const { data: dbData, error: dbError } = await supabase
        .from("images")
        .insert([
          {
            title: this.title,
            description: this.description,
            category: this.category,
            image_url: publicURL,
            user_id: supabase.auth.user().id,
          },
        ]);

      if (dbError) {
        console.error("Error saving image data:", dbError.message);
        alert("Error saving image data: " + dbError.message);
      } else {
        alert("Image uploaded successfully!");
      }
    },
  },
};
</script>
