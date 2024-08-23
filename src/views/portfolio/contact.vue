<style scoped>


@keyframes spin-scale {
  0% {
    transform: rotate(0deg) scale(1) translate(50px, 200px);

  }
  50% {
    transform: rotate(180deg) scale(1.5) translate(100px, 300px);

  }
  100% {
    transform: rotate(360deg) scale(1) translate(50px, 200px);
 
  }
}

.animate-move-spin-scale {
  animation: move 10s infinite, spin-scale 5s infinite;
}
</style>

<template>
  <div class="px-[15%] relative z-1 dark:bg-[#0a192f] py-10 ">
    <div class="absolute top-0 -left-4 w-72 h-72 rounded-full bg-purple-300 dark:bg-purple-300/20 blur-2xl animate-move-spin-scale"></div>
    <div class="absolute top-5 -left-10 w-40 h-40 rounded-full bg-blue-300  dark:bg-blue-300/20 blur-2xl animate-move-spin-scale"></div>
    <h2 class="font-semibold text-center text-4xl capitalize text-black dark:text-[#ccd6f6]">contact me</h2>
    <div class="flex flex-col sm:flex-col md:flex-row md:justify-between gap-2 relative z-2">
      <div class="bg-white/30 dark:bg-black/10 backdrop:blur-xl dark:mt-10 container w-full h-50 py-10 px-10 rounded-xl">
        <h1 class="text-center text-3xl font-semibold capitalize mb-5">
           
        </h1>
        <form @submit.prevent="sendEmail">
    <input
      type="text"
      v-model="name"
      placeholder="Name"
      class="w-full h-10 border-2 border-gray-300 rounded-md mb-4 p-2 bg-white dark:bg-transparent dark:border-slate-400 dark:border text-slate-400 dark:hover:border-teal-300 "
    />
    <input
      type="email"
      v-model="email"
      placeholder="Email"
      class="w-full h-10 border-2 border-gray-300 rounded-md mb-4 p-2 bg-white dark:bg-transparent dark:border-slate-400 dark:border text-slate-400 dark:hover:border-teal-300"
    />
    <textarea
      v-model="message"
      placeholder="Message"
      class="w-full h-20 border-2 border-gray-300 rounded-md mb-4 p-2 bg-white dark:bg-transparent dark:border-slate-400 dark:border text-slate-400 dark:hover:border-teal-300"
    ></textarea>
    <div class="flex justify-end">
      <button
  type="submit"
  class="bg-white dark:bg-transparent dark:border-teal-300 dark:border dark:text-teal-500 bg-opacity-30 backdrop-filter backdrop-blur-md rounded-full px-4 py-2 text-blue-700 font-semibold flex items-center justify-center"
  :disabled="loading"
>
  <span v-if="!loading">Send</span>
  <svg
    v-if="loading"
    class="animate-spin h-5 w-5 text-teal-500"
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
      d="M4 12a8 8 0 018-8v8H4z"
    ></path>
  </svg>
</button>

    </div>
  </form>
      </div>
      <div class=" p-5  backdrop-blur-md bg-white/30 dark:bg-black/10 rounded-xl dark:text-[#ccd6f6] dark:mt-10">
<h1 class="font-semibold text-2xl capitalize ">contact info</h1>
<div class="flex flex-col gap-3 mt-5">
    <a href="mailto:hazman5001@gmail.com" target="_blank" class="text-slate-700 dark:text-slate-400 font-semibold items-center flex gap-2"> <span>
     
      <svg
              width="24"
              height="24"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current text-gray-800 dark:text-slate-400"
            > <path
                d="M44 24V9H24H4V24V39H24"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M44 34L30 34"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M39 29L44 34L39 39"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4 9L24 24L44 9"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
</span> hazman5001@gmail.com</a>
      <a 
      href="https://wa.me/60169333092" 
      class="text-slate-700 font-semibold flex items-center gap-2 dark:text-slate-400" 
      target="_blank"  
      rel="noopener noreferrer"
    > <span>
  <svg
    class="stroke-current text-gray-800 dark:text-slate-400"
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>WhatsApp icon</title>
    <path
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
    />
  </svg>
</span>
      0169333092
    </a>
    <a href="https://www.google.com/maps/place/Shah+Alam,+Selangor/@3.1017871,101.4110135,11.62z/data=!4m6!3m5!1s0x31cc4d8b932abdc7:0x6e65e085abb091c5!8m2!3d3.073281!4d101.518461!16zL20vMHN5cmY?entry=ttu" class="text-slate-700 dark:text-slate-400 font-semibold flex item-center gap-2"> <span>
       
      <svg
  width="24"
  height="24"
  viewBox="0 0 48 48"
  fill="none"
  class="stroke-current text-gray-800 dark:text-slate-400"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M9.85786 32.7574C6.23858 33.8432 4 35.3432 4 37C4 40.3137 12.9543 43 24 43C35.0457 43 44 40.3137 44 37C44 35.3432 41.7614 33.8432 38.1421 32.7574"
    stroke-width="4"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M24 35C24 35 37 26.504 37 16.6818C37 9.67784 31.1797 4 24 4C16.8203 4 11 9.67784 11 16.6818C11 26.504 24 35 24 35Z"
    fill="transparent"
    stroke-width="4"
    stroke-linejoin="round"
  />
  <path
    d="M24 22C26.7614 22 29 19.7614 29 17C29 14.2386 26.7614 12 24 12C21.2386 12 19 14.2386 19 17C19 19.7614 21.2386 22 24 22Z"
    fill="transparent"
    stroke-width="4"
    stroke-linejoin="round"
  />
</svg>

    </span> Shah Alam, Selangor</a>
</div>
<h1 class="font-semibold text-2xl capitalize mt-5 ">social Network</h1>
<div>
    <div class="flex gap-2 py-5">
    <a href="https://www.facebook.com/hazman5540" class="text-blue-700 font-semibold" target="_blank"> <span>
<svg width="24" height="24" viewBox="0 0 48 48" fill="none" class="stroke-current text-gray-800 dark:text-slate-400" xmlns="http://www.w3.org/2000/svg">
<path d="M36 12.5997H31.2489H29.9871C28.9009 12.5997 28.0203 13.4803 28.0203 14.5666V21.4674H36L34.8313 29.0643H28.0203V43H19.2451V29.0643H12V21.4674H19.1515L19.2451 14.2563L19.2318 12.9471C19.1879 8.60218 22.6745 5.04434 27.0194 5.0004C27.0459 5.00013 27.0724 5 27.0989 5H36V12.5997Z" fill="transparent"  stroke-width="4" stroke-linejoin="round" />
</svg>
</span></a>
      <a 
      href="https://www.tiktok.com/@hazman5540" 
      class="text-blue-700 font-semibold " 
      target="_blank" 
      rel="noopener noreferrer"
    >
     <span>
<svg width="24" height="24" viewBox="0 0 48 48" class="stroke-current text-gray-800 dark:text-slate-400" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.358 19.1399C15.4694 18.8558 11.3762 20.9553 9.07838 25.4384C5.63169 32.163 8.48026 43.1666 19.9788 43.1666C31.4774 43.1666 31.81 32.0554 31.81 30.8914C31.81 30.1154 31.81 25.7764 31.81 17.8746C34.2694 19.4323 36.343 20.37 38.0308 20.6877C39.7186 21.0053 40.7915 21.1461 41.2497 21.11V14.6343C39.6886 14.4461 38.3386 14.0873 37.1997 13.5581C35.4913 12.7643 32.1037 10.5611 32.1037 7.33208C32.106 7.34787 32.106 6.51493 32.1037 4.83325H24.9857C24.9645 20.6493 24.9645 29.3353 24.9857 30.8914C25.0175 33.2255 23.2068 36.4905 19.5355 36.4905C15.8642 36.4905 14.0535 33.2281 14.0535 31.1239C14.0535 29.8357 14.496 27.9685 16.3251 26.5858C17.4098 25.7658 18.9153 25.4384 21.358 25.4384C21.358 24.6828 21.358 22.5833 21.358 19.1399Z" fill="transparent" stroke-width="4" stroke-linejoin="round" />
</svg>
</span>
    </a>
    <a href="https://www.instagram.com/hazman_adanan/" class="text-blue-700 font-semibold"> <span> 
<svg width="24" height="24" viewBox="0 0 48 48" fill="none" class="stroke-current text-gray-800 dark:text-slate-400" xmlns="http://www.w3.org/2000/svg">
<path d="M34 6H14C9.58172 6 6 9.58172 6 14V34C6 38.4183 9.58172 42 14 42H34C38.4183 42 42 38.4183 42 34V14C42 9.58172 38.4183 6 34 6Z" fill="transparent"  stroke-width="4" stroke-linejoin="round" />
<path d="M24 32C28.4183 32 32 28.4183 32 24C32 19.5817 28.4183 16 24 16C19.5817 16 16 19.5817 16 24C16 28.4183 19.5817 32 24 32Z" fill="transparent"  stroke-width="4" stroke-linejoin="round" />
<path d="M35 15C36.1046 15 37 14.1046 37 13C37 11.8954 36.1046 11 35 11C33.8954 11 33 11.8954 33 13C33 14.1046 33.8954 15 35 15Z" fill="#333" />
</svg>
</span></a>
</div>
</div>
      </div>
    </div>
  </div>
</template>
<script>
import emailjs from 'emailjs-com';

export default {
  components: {
    emailjs
  },
  data() {
    return {
      name: '',
      email: '',
      message: '',
      loading: false,
    };
  },
  methods: {
  async sendEmail() {
    this.loading = true;  // Start loading
    try {
      const serviceId = 'service_4rlm53k';
      const templateId = 'template_hh9ycj9';
      const userId = 'RCPfF4lu88RJjCpCV';

      const templateParams = {
        name: this.name,
        email: this.email,
        message: this.message,
      };

      await emailjs.send(serviceId, templateId, templateParams, userId);
      
      alert('Email sent successfully!');
      
      // Clear the form fields
      this.name = '';
      this.email = '';
      this.message = '';
      
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Failed to send email.');
    } finally {
      this.loading = false;  // Stop loading whether success or failure
    }
  },
}

};
</script>