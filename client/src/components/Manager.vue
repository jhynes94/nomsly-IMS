<template>
<div>
  <nomslyNav />
  <div class="container">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 text-center mb-4">
        <h1>Graph of Likes/Dislikes</h1>
        <img src="https://cloud.addictivetips.com/wp-content/uploads/2009/12/Bar-Graphs.jpg" alt="">
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 text-center mb-4">
        <h1>Table of likes</h1>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-6 text-center mb-4">
        <h1>Likes</h1>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-6 text-center mb-4">
        <h1>dislikes</h1>
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
      feedback: "",
    };
  },
  methods: {},
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
