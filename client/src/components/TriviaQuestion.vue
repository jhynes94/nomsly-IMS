<template>
  <div>
    <userNav/>
    <div class="col-lg-12">
      <!-- SPACER ROW -->
      <div class="row">
        <div class="col-lg-12">
          <h1 style="text-align: center;" class="my-4"></h1>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-6 text-center mb-4">
          <h2>{{ question }}</h2>
        </div>
      </div>

      <div class="row" v-for="product in answers">
        <div class="col-lg-12 col-md-12 col-sm-6 text-center mb-4">
          <h3><button type="button" class="btn btn-primary" style="margin: 10px" @click="selected(product)"><h3 style="margin: 10px">{{ product }}</h3></button></h3>
        </div>
      </div>

      <div v-if="Correct != ''" class="alert alert-success" role="alert">
        {{ Correct }}
      </div>
      <div v-if="Incorrect != ''" class="alert alert-danger" role="alert">
        {{ Incorrect }}
      </div>


      <div>{{producion}}</div>

    </div>
  </div>
</template>

<script>
import userNav from "./nav.vue";

export default {
  name: "TriviaQuestion",
  data() {
    return {
      question: "",
      answers: "",
      Incorrect: "",
      Correct: "",
      producion: "No data",
      apiURL: ""
    };
  },
  methods: {
    selected: function(input) {
      this.$http
        .post(this.apiURL + "/submission", {answer: input})
        .then(function(response) {
          console.log(response);

          if (response.body.message === true) {
            console.log("CORRECT!");
            this.Correct = "Nice! It was " + input;
            this.Incorrect = "";
            this.getData(); //refresh page with new question
          } else {
            console.log("INCORRECT!");
            this.Correct = "";
            this.Incorrect = "Nope! It was somthing else";
          }
        });
    },
    getData: function() {
      this.$http.get(this.apiURL + "/qna").then(function(response) {
        console.log(response);

        this.question = response.body.question;
        this.answers = response.body.answers;
      });
    }
  },
  created: function() {
    this.producion = process.env.NODE_ENV;
    if(process.env.NODE_ENV === 'development'){
      this.apiURL = "http://localhost:3000";
    }
    this.getData();
  },
  components: {
    userNav
  }
};
</script>
