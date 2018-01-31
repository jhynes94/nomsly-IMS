<template>
<div class="container">
      <!-- SPACER ROW -->
      <div class="row">
        <div class="col-lg-12">
          <h1 style="text-align: center;" class="my-4"></h1>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-6 text-center mb-4">
          <h1>{{ question }}</h1>
        </div>
      </div>
      <div class="row">
        <h2 class="col-lg-6 col-md-6 col-sm-6 text-center answer" v-for="product in answers">
          {{ product }}
        </h2>
      </div>
      
      <div class="row">
        <h2>People who have answered</h2>
      </div>
      
    </div>
</template>

<script>
export default {
  name: "TV",
  data() {
    return {
      question: "",
      answers: "",
    };
  },
  methods: {
    getData: function() {
      this.$http.get("http://localhost:3000/qna").then(function(response) {
        console.log(response);
        this.question = response.body.question;
        this.answers = response.body.answers;
      });
    }
  },
  created: function() {
      this.getData();
  }
};
</script>

<style scoped>
.answer {
  margin-top: 10px;
  vertical-align: middle;
  background-color: red;
}
</style>