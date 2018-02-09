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
        <div class="col-lg-12" style="margin-bottom: 25px">
          <img style="width: 100%; height: auto;" src="../assets/Nomsly-Logo.png" alt="">
        </div>
      </div>

      

      <div class="row" v-for="meal in meals">
        <div class="col-lg-12 col-md-12 col-sm-12 text-center mb-4">
          <h1>{{meal.name}}</h1>
          <img style="width: 407px; height: auto;" v-bind:src="meal.imageLink" />
        </div>
        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 col-lg-offset-3 col-md-offset-3 col-sm-offset-3 col-xs-offset-3 text-center mb-4">
          <a @click="Vote('like', meal)" class="btn btn-default"><img style="width: 100%; height: auto;" src="../assets/Happy-Apple.png" alt=""></a>
        </div>
        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 col-lg-offset-0 col-md-offset-0 col-sm-offset-0 col-xs-offset-3 text-center mb-4">
          <a @click="Stock(meal)" class="btn btn-default">
            <img  v-if="meal.quantity > 0" style="width: 100%; height: auto;" src="../assets/In-Stock.png" alt="">
            <img  v-else style="width: 100%; height: auto;" src="../assets/OOS.jpg" alt="">
          </a>
        </div>
        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 col-lg-offset-0 col-md-offset-0 col-sm-offset-0 col-xs-offset-3 text-center mb-4">
          <a @click="Vote('dislike', meal)" class="btn btn-default"><img style="width: 100%; height: auto;" src="../assets/Sad-Orange.png" alt=""></a>
        </div>
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center mb-4">
          <hr style="height: 7px">
        </div>
      </div>

      <div>{{producion}} server</div>

    </div>
  </div>
</template>

<script>
export default {
  name: "nomslyClient",
  data() {
    return {
      meals: "",
      Incorrect: "",
      Correct: "",
      producion: "No data",
      apiURL: "",
      accountNumber: "",
    };
  },
  methods: {
    getMeals: function() {
      this.$http.get(this.apiURL + "/meals?account=" + this.accountNumber).then(function(response) {
        console.log(response.body.meals);
        this.meals = response.body.meals;
      });
    },
    clearAlerts: function(){
      console.log("Clear Alerts")
      this.Correct = "";
      this.Incorrect = "";
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

      //Send to Server
      this.$http
        .post(this.apiURL + "/stocking?account=" + this.accountNumber, {meal: meal})
        .then(function(response) {
          console.log(response);
      });

    },
    Vote: function(theVote, meal) {
      
      // Send alerts
      if(theVote == 'like'){
        this.Correct = "We're glad you liked it!";
      }
      else if(theVote == 'dislike'){
        this.Correct = "We'll be sure to fix that for you";
      }

      //Send to Server
      this.$http
        .post(this.apiURL + "/vote?account=" + this.accountNumber, {vote: theVote, mealLiked: meal})
        .then(function(response) {
          console.log(response);
      });

    },
  },
  created: function() {
    this.producion = process.env.NODE_ENV;
    if (process.env.NODE_ENV === "development") {
      this.apiURL = "http://localhost:3000";
    }
    console.log(this.$route.params.accountNumber);
    this.accountNumber = this.$route.params.accountNumber
    this.getMeals();
  }
};
</script>

<style scoped>
.btn-default {
  color: #fff;
  border: 2px solid;
  border-color: grey;
  border-radius: 15px;
  box-shadow: 0 9px #999;
  margin-bottom: 30px;
}
.btn-default:hover {
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
   -webkit-transform: scale3d(1.2, 1.2, 1.2);
    transform: scale3d(5);
}

.btn-default:active {
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
</style>

