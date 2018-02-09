<template>
<div>
  <nomslyNav />
  <div class="container">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 text-center mb-4">
        <h1>Graph of Likes/Dislikes</h1>
        <img src="https://cloud.addictivetips.com/wp-content/uploads/2009/12/Bar-Graphs.jpg" alt="">
        <p></p>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 text-center mb-4">
        
      </div>
    </div>


    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 text-center mb-4">
        <h1>Table of likes/dislikes</h1>
      </div>
      <div class="col-lg-12 col-md-12 col-sm-12 text-center mb-4"  v-for="vote in AllVotes">
        <h3>{{vote.name}} voted they {{vote.vote}} "{{vote.mealVotedFor}}" at: {{vote.time}}</h3>
      </div>
    </div>

    
    <div class="row">
      <h3>Current Meal options</h3>
      <div class="col-lg-12 col-md-12 col-sm-6 text-center mb-4" v-for="meal in currentMeals">
        <p>{{meal.name}}</p>
      </div>
    </div>

    
  </div>
</div>
</template>

<script>
import nomslyNav from "./nomslyNav.vue";


export default {
  name: "Manager",
  data() {
    return {
      apiURL: "",
      feedback: "",
      currentMeals: "",
      currentAccounts: "",
      AllVotes: [],
      AllLikes: [],
      AllDislikes: [],


    };
  },
  methods: {
    getMeals: function() {
      this.$http.get(this.apiURL + "/meals?account=" + this.accountNumber).then(function(response) {
        console.log(response.body.meals);
        this.currentMeals = response.body.meals;
      });
    },
    getAccounts: function() {
      this.$http
        .get(this.apiURL + "/CurrentAccounts")
        .then(function(response) {
          console.log(response.body.accounts);
          this.currentAccounts = response.body.accounts;

          for(let i=0; i < this.currentAccounts.length; i++){
            this.AllVotes = this.AllVotes.concat(this.currentAccounts[i].mealVotes);
          }
          console.log(this.AllVotes)

        });
    }
  },
  created: function() {
    this.producion = process.env.NODE_ENV;
    if (process.env.NODE_ENV === "development") {
      this.apiURL = "http://localhost:3000";
    }
    console.log(this.$route.params.accountNumber);
    this.accountNumber = this.$route.params.accountNumber

    this.getMeals();
    this.getAccounts();
  },
  components: {
    nomslyNav
  }
};
</script>
