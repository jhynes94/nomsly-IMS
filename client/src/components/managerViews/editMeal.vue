<template>
<div>
  <nomslyNav />
  <div class="container">

    <div class="row">
      <div v-if="currentMeal != null" class="col-lg-12 col-md-12 col-sm-12 text-center mb-4">
        <h1><input style="text-align: center; width: 500px;" v-model="currentMeal.name" placeholder="Meal Name"></h1>
        <h2><textarea style="text-align: center; width: 500px;" v-model="currentMeal.description" placeholder="Description of meal"></textarea></h2>
        <h2><textarea style="text-align: center; width: 500px;" v-model="currentMeal.contents" placeholder="Contents of Meal (Seprated by commas)"></textarea></h2>
        <h3>Image Link: <input style="text-align: center;" v-model="currentMeal.imageLink" placeholder="Link to image"></h3>
        <h3>Nutrition Link: <input style="text-align: center;" v-model="currentMeal.nutritionLink" placeholder="Link to Nutrition image"></h3>
        <hr>
        <div class="row">
          <h1>Attributes</h1>
          <div class="col-lg-12 col-md-12 col-sm-12 text-center mb-4" v-for="Attribute in currentMeal.attributes">
            <p>{{Attribute}} <a @click="removeAttribute(Attribute)" class="btn btn-default glyphicon glyphicon-remove" style="color: red;"></a></p>
          </div>
          <div class="col-lg-12 col-md-12 col-sm-12 text-center mb-4" v-for="Attribute in possibleAttributes">
            <p>{{Attribute}} <a @click="addAttribute(Attribute)" class="btn btn-default glyphicon glyphicon-plus" style="color: green;"></a></p>
          </div>
        </div>
        <hr>
        <a @click="updateMeal(currentMeal)" class="btn btn-primary">Update</a>
        <hr>
        <a @click="deleteMeal(currentMeal)" class="btn btn-danger">Delete Meal</a>
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
      currentMeal: null,
      mealNumber: 0,
      possibleAttributes: ["POPULAR", "VEGETARIAN", "VEGAN", "GLUTEN FREE", "HIGH-PROTIEN", "PALEO"],
    };
  },
  methods: {
    getMeal: function() {
      this.$http
        .get(this.apiURL + "/getMeal?mealId=" + this.mealNumber)
        .then(function(response) {
          console.log("Current Meal");
          console.log(response.body.meal);
          this.currentMeal = response.body.meal;

          console.log(this.currentMeal.attributes + "recieve")

          if(this.currentMeal.attributes == undefined){
            this.currentMeal.attributes = []
          }

          //remove common matches
          this.possibleAttributes = this.possibleAttributes.filter((word) => !this.currentMeal.attributes.includes(word));

          /*
          var fullWordList = ['1','2','3','4','5'];
          var wordsToRemove = ['1','2','3'];

          var filteredKeywords = fullWordList.filter((word) => !wordsToRemove.includes(word));

          console.log(filteredKeywords);
          */

        });
    },
    updateMeal: function(inputMeal) {
      console.log(inputMeal.name);

          console.log(inputMeal.attributes + "send")
      this.$http
        .post(this.apiURL + "/updateMeal", { meal: inputMeal })
        .then(function(response) {
          console.log(response);
          this.$router.push("/manager")
        });
    },
    addAttribute: function(attribute){
      this.currentMeal.attributes = this.currentMeal.attributes.concat(attribute);
      this.possibleAttributes = this.possibleAttributes.filter((word) => !this.currentMeal.attributes.includes(word));
    },
    removeAttribute: function(attribute){
      Array.prototype.remove = function() {
          var what, a = arguments, L = a.length, ax;
          while (L && this.length) {
              what = a[--L];
              while ((ax = this.indexOf(what)) !== -1) {
                  this.splice(ax, 1);
              }
          }
          return this;
      };

      this.possibleAttributes = this.possibleAttributes.concat(attribute);
      this.currentMeal.attributes = this.currentMeal.attributes.remove(attribute);
      this.possibleAttributes = this.possibleAttributes.filter((word) => !this.currentMeal.attributes.includes(word));
    },
  },
  created: function() {
    this.producion = process.env.NODE_ENV;
    if (process.env.NODE_ENV === "development") {
      this.apiURL = "http://localhost:3000";
    }
    this.mealNumber = this.$route.params.mealNumber;

    this.getMeal();
  },
  components: {
    nomslyNav,
    LineChart2
  }
};
</script>
