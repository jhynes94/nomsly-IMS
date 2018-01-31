<template>
  <div>
    <div class="col-lg-12">

    <nav v-if="Correct != '' || Correct != ''" class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <div v-if="Correct != ''" class="alert alert-success" role="alert">
          {{ Correct }}
        </div>
        <div v-if="Incorrect != ''" class="alert alert-danger" role="alert">
          {{ Incorrect }}
        </div>
      </div>
    </nav>


      <!-- SPACER ROW -->
      <div class="row">
        <div class="col-lg-12">
          <h1 style="text-align: center;" class="my-4"></h1>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <h1 style="text-align: center;" class="my-4"></h1>
        </div>
      </div>      
            <div class="row">
        <div class="col-lg-12">
          <h1 style="text-align: center;" class="my-4"></h1>
        </div>
      </div>    

      

      <div class="row" v-for="meal in meals">
        <div class="col-lg-12 col-md-12 col-sm-6 text-center mb-4">
          <h1>{{meal.name}}</h1>
          <img v-bind:src="meal.imageLink" />
        </div>
        <div class="col-lg-2 col-md-2 col-sm-2 col-lg-offset-3 text-center mb-4">
          <a @click="Vote('like')" class="btn btn-default"><img style="width: 100%; height: auto;" src="../assets/thumbs-up.png" alt=""></a>
        </div>
        <div class="col-lg-2 col-md-2 col-sm-2 text-center mb-4">
          <a @click="Stock(meal)" class="btn btn-default">
            <img  v-if="meal.quantity > 0" style="width: 100%; height: auto;" src="../assets/In-Stock.png" alt="">
            <img  v-else style="width: 100%; height: auto;" src="../assets/OOS.jpg" alt="">
          </a>
        </div>
        <div class="col-lg-2 col-md-2 col-sm-2 text-center mb-4">
          <a @click="Vote('dislike')" class="btn btn-default"><img style="width: 100%; height: auto;" src="../assets/thumbs-down.png" alt=""></a>
        </div>
        <div class="col-lg-12 col-md-12 col-sm-6 text-center mb-4">
          <hr>
        </div>
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
      apiURL: "",
      stockImageURL: "../assets/OOS.jpg"
    };
  },
  methods: {
    getMeals: function() {
      this.$http.get(this.apiURL + "/meals").then(function(response) {
        console.log(response.body.meals);
        this.meals = response.body.meals;
      });
    },
    Stock: function(meal) {
      if (meal.quantity > 0) {
        console.log("Out of Stock! quantity: " + meal.quantity);
        meal.quantity = 0;
        this.Correct = "We'll send you more soon!";
      } else {
        console.log("In Stock! quantity: " + meal.quantity);
        meal.quantity = 1;
        this.Correct = "";
      }
    },
    Vote: function(theVote) {
      if(theVote == 'like'){
        this.Correct = "We're glad you liked it!";
      }
      else if(theVote == 'dislike'){
        this.Correct = "We'll be sure to fix that for you";
      }
    },
  },
  created: function() {
    this.producion = process.env.NODE_ENV;
    if (process.env.NODE_ENV === "development") {
      this.apiURL = "http://localhost:3000";
    }
    this.getMeals();
  },
  components: {
    userNav
  }
};
</script>
