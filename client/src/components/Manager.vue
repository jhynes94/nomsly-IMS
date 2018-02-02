<template>
<div>
  <nomslyNav />
  <div class="container">
    <input type="text" v-model="formQuestion" class="form-control" placeholder="Question" aria-label="Username" aria-describedby="basic-addon1">
    <h1></h1>
    <input type="text" v-model="formAnswer" class="form-control" placeholder="Answer" aria-label="Username" aria-describedby="basic-addon1">
    <h1></h1>
    <input type="text" v-model="fromFAnswer1" class="form-control" placeholder="Fake Answer" aria-label="Username" aria-describedby="basic-addon1">
    <h1></h1>
    <input type="text" v-model="fromFAnswer2" class="form-control" placeholder="Fake Answer" aria-label="Username" aria-describedby="basic-addon1">
    <h1></h1>
    <input type="text" v-model="fromFAnswer3" class="form-control" placeholder="Fake Answer" aria-label="Username" aria-describedby="basic-addon1">
    <h1></h1>
    <div class="row">
      <div class="col-lg-12 col-sm-6 text-center mb-4">
          <h3><button type="button" class="btn btn-primary" style="margin: 10px" @click="newQuestionSubmission()"><h3 style="margin: 10px">Submit</h3></button></h3>
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
      formQuestion: "",
      formAnswer: "",
      fromFAnswer1: "",
      fromFAnswer2: "",
      fromFAnswer3: ""
    };
  },
  methods: {
  },
  created: function() {
    this.producion = process.env.NODE_ENV;
    if (process.env.NODE_ENV === "development") {
      this.apiURL = "http://localhost:3000";
    }
  },
  components: {
    nomslyNav
  }
};
</script>
