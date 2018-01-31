<template>
  <div>
    <div class="col-lg-12">
      <!-- SPACER ROW -->
      <div class="row">
        <div class="col-lg-12">
          <h1 style="text-align: center;" class="my-4"></h1>
        </div>
      </div>
      

      <div class="row" v-for="meal in meals">
        <div class="col-lg-12 col-md-12 col-sm-6 text-center mb-4">
          <h2>{{meal.name}}</h2>
          <img v-bind:src="meal.imageLink" />
        </div>
        <div class="col-lg-4 col-md-4 col-sm-4 text-center mb-4">
          <img src="../assets/thumbs-up.png" alt="Mountain View">
        </div>
        <div class="col-lg-4 col-md-4 col-sm-4 text-center mb-4">
          <img src="../assets/OOS.jpg" alt="Mountain View">
        </div>
        <div class="col-lg-4 col-md-4 col-sm-4 text-center mb-4">
          <img src="../assets/thumbs-down.png" alt="Mountain View">
        </div>
        <div class="col-lg-12 col-md-12 col-sm-6 text-center mb-4">
          <hr>
        </div>
      </div>

      <div v-if="Correct != ''" class="alert alert-success" role="alert">
        {{ Correct }}
      </div>
      <div v-if="Incorrect != ''" class="alert alert-danger" role="alert">
        {{ Incorrect }}
      </div>


      <div>{{producion}} server</div>

    </div>
  </div>
</template>

<script>
import userNav from "./nav.vue";

export default {
  name: "nomslyClient",
  data() {
    return {
      meals: "",
      Incorrect: "",
      Correct: "",
      producion: "No data",
      apiURL: ""
    };
  },
  methods: {
    getMeals: function() {
      this.$http.get(this.apiURL + "/meals").then(function(response) {
        console.log(response.body.meals);
        this.meals = response.body.meals
      });
    }
  },
  created: function() {
    this.producion = process.env.NODE_ENV;
    if(process.env.NODE_ENV === 'development'){
      this.apiURL = "http://localhost:3000";
    }
    this.getMeals();
  },
  components: {
    userNav
  }
};
</script>
