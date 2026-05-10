<template>
  <div class="feedback-form">
    <h2>Training Feedback</h2>

    <form @submit.prevent="submitForm">
      <div v-for="(question, index) in questions" :key="index" class="form-group">
        <label>{{ question.label }}</label>
        <div class="options">
          <label v-for="option in ratings" :key="option">
            <input type="radio" :name="'question_' + index" :value="option" v-model="answers[index]"/>
            {{ option }}
          </label>
        </div>
      </div>

      <div class="form-group">
        <label>Test result (if any)</label>
        <input type="text" v-model="testResult" placeholder="Enter result"/>
      </div>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questions: [
        { label: "Objectives of this program adequately met." },
        { label: "Training will assist you in your profession/area of work." },
        { label: "Trainer has good presentation skills and knowledge." }
      ],
      ratings: ["Poor", "Fair", "Good", "Excellent"],
      answers: [],
      testResult: ""
    };
  },
  methods: {
    submitForm() {
      console.log({
        answers: this.answers,
        testResult: this.testResult
      });
      alert("Feedback submitted!");
    }
  }
};
</script>

<style scoped>
.form-group {
  margin-bottom: 20px;
}
.options label {
  margin-right: 15px;
}
</style>
