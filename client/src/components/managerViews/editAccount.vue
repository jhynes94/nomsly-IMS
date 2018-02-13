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
      <div v-if="currentAccounts != null" class="col-lg-12 col-md-12 col-sm-12 text-center mb-4">
        <h1><input type="text" name="name" :placeholder="currentAccounts[0].name" :value="currentAccounts[0].name"></h1>
      </div>
      
      <div class="col-lg-12 col-md-12 col-sm-12 text-center mb-4">
        <a @click="updateAccount(currentAccounts[0])" class="btn btn-primary">Update</a>
        <hr>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 text-center mb-4">
        <h1>Warnings for </h1>
      </div>
      <div class="col-lg-12 col-md-12 col-sm-12 text-center mb-4"  v-for="warning in AllWarnings">
        <h3 style="color: red;"><b>{{warning.meal}}</b> is out of stock for <b>{{warning.name}}</b><a @click="removeWarning(warning)" class="btn btn-default glyphicon glyphicon-remove" style="color: red;"></a></h3>
        <h4>{{warning.time}}</h4>
      </div>
      <div class="col-lg-12 col-md-12 col-sm-12 text-center mb-4"  v-if="AllWarnings.length == 0">
        <h3 style="color: green;">No warnings at this time</h3>
      </div>
      <div class="col-lg-12 col-md-12 col-sm-12 text-center mb-4">
        <hr>
      </div>
    </div>

    <div class="row">
      <h1>Current Meal options</h1>
      <div class="col-lg-12 col-md-12 col-sm-12 text-center mb-4" v-for="meal in currentMeals">
        <p>{{meal.name}} <a @click="removeMeal(meal)" class="btn btn-default glyphicon glyphicon-remove" style="color: red;"></a></p>
      </div>
      <div class="col-lg-12 col-md-12 col-sm-12 text-center mb-4">
        <a @click="addMeal()" class="btn btn-primary glyphicon glyphicon-plus"></a>
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
import nomslyNav from "../nomslyNav.vue";
import LineChart2 from "../LineChart2.js";

export default {
  name: "editAccount",
  data() {
    return {
      apiURL: "",
      feedback: "",
      currentMeals: null,
      currentAccounts: null,
      AllVotes: [],
      AllWarnings: [],
      ChartData: {},
      accountNumber: 0
    };
  },
  methods: {
    getMeals: function() {
      this.$http
        .get(this.apiURL + "/meals?account=" + this.accountNumber)
        .then(function(response) {
          console.log("Current Meals available");
          console.log(response.body.meals);
          this.currentMeals = response.body.meals;

          this.getAccounts();
        });
    },
    removeWarning: function(inputWarning) {
      //Find account
      let editedAccount = this.currentAccounts.find(function (account) {
          if (account.id == inputWarning.accountId) {
            //Find inputWarning
            for(let i = 0; i < account.stockWarning.length; i++){
              if(account.stockWarning.time = inputWarning.time){
                console.log("matching time!")
                account.stockWarning.splice(i, 1);
                break;
              }
            }
          return account;
          }
      })      
      this.updateAccount(editedAccount);
      
    },
    getAccounts: function() {
      this.$http.get(this.apiURL + "/CurrentAccounts").then(function(response) {
        this.currentAccounts = response.body.accounts;

        let accNum = this.accountNumber;

        this.currentAccounts[0] = this.currentAccounts.find(function(account) {
          if (account.id == accNum) {
            return account;
          }
        });

        //Gather all votes
        this.AllVotes = [];
        for (let i = 0; i < this.currentAccounts.length; i++) {
          if (this.accountNumber == this.currentAccounts[i].id) {
            this.AllVotes = this.AllVotes.concat(
              this.currentAccounts[i].mealVotes
            );
          }
        }
        this.generateChartData();

        //Gather all Warnings
        this.AllWarnings = [];
        for (let i = 0; i < this.currentAccounts.length; i++) {
          if (this.accountNumber == this.currentAccounts[i].id) {
            this.AllWarnings = this.AllWarnings.concat(
              this.currentAccounts[i].stockWarning
            );
          }
        }
      });
    },
    updateAccount: function(inputAccount) {
      console.log(inputAccount.name);
      this.$http
        .post(this.apiURL + "/updateAccount", { account: inputAccount })
        .then(function(response) {
          console.log(response);
          this.getAccounts();
        });
    },
    generateChartData: function() {
      //Create array of current meals
      var MealLabels = [];
      for (let i = 0; i < this.currentMeals.length; i++) {
        MealLabels = MealLabels.concat(this.currentMeals[i].name);
      }

      //Create array of current meals IDs
      var MealIDs = [];
      for (let i = 0; i < this.currentMeals.length; i++) {
        MealIDs = MealIDs.concat(this.currentMeals[i].id);
      }

      //Create array of likes that matchs meal locations
      var allLikes = new Array(MealIDs.length).fill(0);
      var allDislikes = new Array(MealIDs.length).fill(0);
      //For all votes
      for (let i = 0; i < this.AllVotes.length; i++) {
        //Find matching meal
        for (let j = 0; j < MealIDs.length; j++) {
          if (this.AllVotes[i].mealVotedForID == MealIDs[j]) {
            //Match!
            if (this.AllVotes[i].vote == "like") {
              allLikes[j]++;
            } else {
              allDislikes[j]++;
            }
          }
        }
      }

      this.ChartData = {
        labels: MealLabels,
        datasets: [
          {
            label: "Likes",
            backgroundColor: "#05CBE1",
            data: allLikes
          },
          {
            label: "Dislikes",
            backgroundColor: "#FC2525",
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
    this.accountNumber = this.$route.params.accountNumber;

    //////////////////////////////////////////
    this.getMeals();
  },
  components: {
    nomslyNav,
    LineChart2
  }
};
</script>
