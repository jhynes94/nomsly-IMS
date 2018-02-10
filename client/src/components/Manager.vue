<template>
<div>
  <nomslyNav />
  <div class="container">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 text-center mb-4">
        <h1>Graph of Likes/Dislikes</h1>
        <line-chart2 :chartData="ChartData" :options="{responsive: true, maintainAspectRatio: false}"></line-chart2>
        <p></p>
      </div>
      <div class="col-lg-12 col-md-12 col-sm-12 text-center mb-4">
        <hr>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 text-center mb-4">
        <h1>Warnings</h1>
      </div>
      <div class="col-lg-12 col-md-12 col-sm-12 text-center mb-4"  v-for="warning in AllWarnings">
        <h3 style="color: red;"><b>{{warning.meal}}</b> is out of stock for <b>{{warning.name}}</b></h3>
      </div>
      <div class="col-lg-12 col-md-12 col-sm-12 text-center mb-4"  v-if="AllWarnings.length == 0">
        <h3 style="color: green;">No warnings at this time</h3>
      </div>
      <div class="col-lg-12 col-md-12 col-sm-12 text-center mb-4">
        <hr>
      </div>
    </div>

  <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 text-center mb-4">
        <h1>Current Accounts</h1>
      </div>
      <div class="col-lg-12 col-md-12 col-sm-12 text-center mb-4"  v-for="account in currentAccounts">
        <h3>{{account.name}}</h3>
      </div>
      <div class="col-lg-12 col-md-12 col-sm-12 text-center mb-4"  v-if="currentAccounts.length == 0">
        <h3 style="color: green;">There are no accounts!!!</h3>
      </div>
      <div class="col-lg-12 col-md-12 col-sm-12 text-center mb-4">
        <hr>
      </div>
    </div>

    <div class="row">
      <h1>Current Meal options</h1>
      <div class="col-lg-12 col-md-12 col-sm-12 text-center mb-4" v-for="meal in currentMeals">
        <p>{{meal.name}}</p>
      </div>
      <div class="col-lg-12 col-md-12 col-sm-12 text-center mb-4">
        <hr>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 text-center mb-4">
        <h1>Table of likes/dislikes</h1>
      </div>
      <div class="col-lg-12 col-md-12 col-sm-12 text-center mb-4"  v-for="vote in AllVotes">
        <h3>{{vote.name}} voted they {{vote.vote}} "{{vote.mealVotedFor}}" at: {{vote.time}}</h3>
      </div>
      <div class="col-lg-12 col-md-12 col-sm-12 text-center mb-4"  v-if="AllVotes.length == 0">
        <h3 style="color: green;">No likes or Dislikes to show at this time</h3>
      </div>
      <div class="col-lg-12 col-md-12 col-sm-12 text-center mb-4">
        <hr>
      </div>
    </div>

    


    
  </div>
</div>
</template>

<script>
import nomslyNav from "./nomslyNav.vue";
import LineExample from './LineChart.js'
import BarExample from './BarChart.js'
import LineChart2 from './LineChart2.js'


export default {
  name: "Manager",
  data() {
    return {
      apiURL: "",
      feedback: "",
      currentMeals: "",
      currentAccounts: "",
      AllVotes: [],
      AllWarnings: [],
      ChartData: {},
    };
  },
  methods: {
    getMeals: function() {
      this.$http.get(this.apiURL + "/meals?account=" + this.accountNumber).then(function(response) {
        console.log("Current Meals avaible");
        console.log(response.body.meals);
        this.currentMeals = response.body.meals;

        this.getAccounts();
      });
    },
    getAccounts: function() {
      this.$http
        .get(this.apiURL + "/CurrentAccounts")
        .then(function(response) {
          console.log("Current Accounts");
          console.log(response.body.accounts);
          this.currentAccounts = response.body.accounts;

          //Gather all votes
          for(let i=0; i < this.currentAccounts.length; i++){
            this.AllVotes = this.AllVotes.concat(this.currentAccounts[i].mealVotes);
          }
          console.log("All current Votes")
          console.log(this.AllVotes)
          this.generateChartData();

          //Gather all Warnings
          for(let i=0; i < this.currentAccounts.length; i++){
            this.AllWarnings = this.AllWarnings.concat(this.currentAccounts[i].stockWarning);
          }
          console.log("All Warnings")
          console.log(this.AllWarnings)

        });
    },
    generateChartData: function() {
      //Create array of current meals
      var MealLabels = [];
      for(let i=0; i < this.currentMeals.length; i++){
        MealLabels = MealLabels.concat(this.currentMeals[i].name);
      }

      //Create array of current meals IDs
      var MealIDs = [];
      for(let i=0; i < this.currentMeals.length; i++){
        MealIDs = MealIDs.concat(this.currentMeals[i].id);
      }

      //Create array of likes that matchs meal locations
      var allLikes = new Array(MealIDs.length).fill(0);
      var allDislikes = new Array(MealIDs.length).fill(0);
      //For all votes
      for(let i=0; i < this.AllVotes.length; i++){
        //Find matching meal
        for(let j=0; j < MealIDs.length; j++){
          if(this.AllVotes[i].mealVotedForID == MealIDs[j]) {
            //Match!
            if(this.AllVotes[i].vote == "like"){
              allLikes[j]++;
            }
            else{
              allDislikes[j]++;
            }
          }
        } 
      }

      this.ChartData = {
      labels: MealLabels,
      datasets: [
        {
          label: 'Likes',
          backgroundColor: '#05CBE1',
          data: allLikes
        },{
          label: 'Dislikes',
          backgroundColor: '#FC2525',
          data: allDislikes
        }
      ]
    };
      
    }
  },
  created: function() {
    this.producion = process.env.NODE_ENV;
    if (process.env.NODE_ENV === "development") {
      this.apiURL = "http://localhost:3000";
    }
    this.accountNumber = this.$route.params.accountNumber

    this.getMeals();
  },
  components: {
    nomslyNav,
    LineExample,
    BarExample,
    LineChart2
  }
};
</script>
