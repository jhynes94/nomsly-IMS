<template>
  <div>
    <!-- The overlay -->
    <div id="myNav" class="overlay" style="display: block;">
      <!-- Button to close the overlay navigation -->
      <a href="javascript:void(0)" class="closebtn" @click="closeNav()">&times;</a>

      <!-- Overlay content -->
      <div class="overlay-content">
        <div class="container" style="background-color: white;">
          <div class="row">
            <div class="col-lg-12" style="margin-bottom: 25px">
              <h3>Edits will be added here</h3>
              <img style="width: 100%; height: auto;" v-bind:src="globalNutritionLink" alt="">
            </div>
          </div>
        </div>


      </div>
    </div>

    <div class="col-lg-12">

      <!-- Navigation Bar -->
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
        <div class="col-lg-3" style="margin-bottom: 25px">
          <img style="width: 100%; height: auto;" src="../assets/Icons/Logo/logonb.png" alt="">
        </div>
        <div class="col-lg-9">
          <h3><span v-for="filter in filters"><b><button @click="filterResults(filter)" class="top-button">{{filter}}</button></b></span></h3>
        </div>
        <div class="col-lg-12" style="margin-bottom: 25px">
          <hr style="height:4px;border:none;background-color:#eeeeef;" />
        </div>
      </div>

      <!-- Meal Loop -->
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-4 col-sm-4 text-center mb-4" v-for="meal in filteredMeals">
            <div class="col-lg-12 col-md-12 col-sm-12 text-center mb-4">
              <img class="img-responsive" v-bind:src="meal.imageLink" />
            </div>
            <h1><b>{{meal.name}}</b></h1>


            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center mb-4 special-button">
              <a @click="Vote('like', meal)" ><img class="img-responsive" src="../assets/Icons/Likes/Like.png" alt=""></a>
            </div>
            <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8 text-center mb-4 special-button">
              <!--<a @click="Stock(meal)" class="btn btn-default">
                <h4 style="color: black;"><b>What do you think?</b></h4>
                
                <img class="img-responsive" v-if="meal.quantity > 0"  src="../assets/In-Stock.png" alt="">
                <img class="img-responsive" v-else  src="../assets/OOS.jpg" alt="">
              </a>-->
              <a @click="details(meal)" class="btn btn-default">
                <h4 style="color: black;"><b>What do you think?</b></h4>
              </a>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center mb-4 special-button">
              <a @click="Vote('dislike', meal)" ><img class="img-responsive" src="../assets/Icons/Likes/Dislike.png" alt=""></a>
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center mb-4">
              <hr style="height: 7px">
            </div>


          </div>
        </div>
      </div>

    </div>
    
    <footer class="col-lg-12 col-md-12 col-sm-12 page-footer font-small stylish-color-dark pt-4 mt-4">
      <hr>
      <!--Copyright-->
      <div class="footer-copyright py-3 text-center">
          © 2018 Copyright:
          <a href="https://www.nomsly.com/"> Nomsly.com </a>
          <div>{{producion}} server</div>
      </div>
      <!--/.Copyright-->
    </footer>
  </div>
</template>

<script>
import nomslyService from "@/services/nomslyService";

export default {
  name: "nomslyClient",
  data() {
    return {
      meals: "",
      filteredMeals: "",
      Incorrect: "",
      filters: ["ALL", "POPULAR", "VEGETARIAN", "VEGAN", "GLUTEN FREE", "HIGH-PROTIEN"],
      Correct: "",
      producion: "No data",
      apiURL: "",
      accountNumber: "",
      globalNutritionLink: "",
      timeOut: 3000
    };
  },
  methods: {
    async getMeals() {
      let res = await nomslyService.getMeals(this.accountNumber);
      console.log(res.data.meals);
      this.meals = res.data.meals;
      this.filteredMeals = this.meals
    },
    clearAlerts: function() {
      console.log("Clear Alerts");
      this.Correct = "";
      this.Incorrect = "";
    },
    async Stock(meal) {
      if (meal.quantity > 0) {
        console.log("Out of Stock! quantity: " + meal.quantity);
        meal.quantity = 0;
        this.Correct = "We'll send you more soon!";
        setTimeout(() => {
          this.clearAlerts();
        }, this.timeOut);
      } else {
        console.log("In Stock! quantity: " + meal.quantity);
        meal.quantity = 1;
        this.Correct = "Back in Stock!";
        setTimeout(() => {
          this.clearAlerts();
        }, this.timeOut);
      }

      //Send to Server
      let res = await nomslyService.stocking(this.accountNumber, meal);
      console.log(res);
      /*this.$http
        .post(this.apiURL + "/stocking?account=" + this.accountNumber, {meal: meal})
        .then(function(response) {
          console.log(response);
      });*/
    },
    details: function(meal) {
      this.globalNutritionLink = meal.nutritionLink;
      this.openNav();
    },
    /* Open */
    openNav: function() {
      document.getElementById("myNav").style.width = "100%";
    },
    /* Close */
    closeNav: function() {
      document.getElementById("myNav").style.width = "0%";
    },
    filterResults: function(filter) {
      if(filter == "ALL"){
        this.filteredMeals = this.meals
      }
      else{
          this.filteredMeals = [];
          for(let i=0; i < this.meals.length; i++){
            if(this.meals[i].attributes == undefined){
              this.meals[i].attributes = [];
            }
            else {
              console.log(this.meals[i].name)
              if(this.meals[i].attributes.includes(filter)){
                console.log("Filter??")
                this.filteredMeals = this.filteredMeals.concat(this.meals[i])
              }
            }
          }

          //var filteredKeywords = fullWordList.filter((word) => !wordsToRemove.includes(word));
      }
    },
    Vote: function(theVote, meal) {
      // Send alerts
      if (theVote == "like") {
        this.Correct = "We're glad you liked it!";
        setTimeout(() => {
          this.clearAlerts();
        }, this.timeOut);
      } else if (theVote == "dislike") {
        this.Correct = "We'll be sure to fix that for you";
        setTimeout(() => {
          this.clearAlerts();
        }, this.timeOut);
      }

      //Send to Server
      this.$http
        .post(this.apiURL + "/vote?account=" + this.accountNumber, {
          vote: theVote,
          mealLiked: meal
        })
        .then(function(response) {
          console.log(response);
        });
    },
    RefreshWebpage: function() {
      console.log("Refreshing Page");
      //this.$router.push("client/" + this.accountNumber)
      //window.location.href = "/#/client/" + this.accountNumber
      //this.$forceUpdate();
      console.log("Failed!");
    }
  },
  created: function() {
    this.producion = process.env.NODE_ENV;
    if (this.producion === "development") {
      this.apiURL = "http://localhost:3000";
    } else {
      setTimeout(() => {
        this.RefreshWebpage();
      }, 1800000); //30 min
    }

    console.log(this.$route.params.accountNumber);
    this.accountNumber = this.$route.params.accountNumber;
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
}
.special-button {
  padding-right: 3px;
  padding-left: 3px;
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

.top-button {
  margin-right: 8px;
  background-color: white;
  border: white;
  color: black;
}
.top-button:hover {
    border-bottom: 10px solid orange;
}

.row {
  display: flex;
  flex-wrap: wrap;
  width: 100%; /*not always necessary*/
}

/* The Overlay (background) */
.overlay {
  /* Height & width depends on how you want to reveal the overlay (see JS below) */
  height: 100%;
  width: 0;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  background-color: rgb(0, 0, 0); /* Black fallback color */
  background-color: rgba(209, 227, 160, 0.9); /* Black w/opacity */
  overflow-x: hidden; /* Disable horizontal scroll */
  transition: 0.5s; /* 0.5 second transition effect to slide in or slide down the overlay (height or width, depending on reveal) */
}

/* Position the content inside the overlay */
.overlay-content {
  position: relative;
  top: 25%; /* 25% from the top */
  width: 100%; /* 100% width */
  text-align: center; /* Centered text/links */
  margin-top: 30px; /* 30px top margin to avoid conflict with the close button on smaller screens */
}

/* The navigation links inside the overlay */
.overlay a {
  padding: 8px;
  text-decoration: none;
  font-size: 36px;
  color: #818181;
  display: block; /* Display block instead of inline */
  transition: 0.3s; /* Transition effects on hover (color) */
}

/* When you mouse over the navigation links, change their color */
.overlay a:hover,
.overlay a:focus {
  color: #f1f1f1;
}

/* Position the close button (top right corner) */
.overlay .closebtn {
  position: absolute;
  top: 20px;
  right: 45px;
  font-size: 60px;
}

/* When the height of the screen is less than 450 pixels, change the font-size of the links and position the close button again, so they don't overlap */
@media screen and (max-height: 450px) {
  .overlay a {
    font-size: 20px;
  }
  .overlay .closebtn {
    font-size: 40px;
    top: 15px;
    right: 35px;
  }
}
</style>

