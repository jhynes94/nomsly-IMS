<template>
 <div id="nav">
    <nav class="navbar navbar-default navbar-static-top">
      <div class="container">
         <div class="navbar-header">
            <a class="navbar-brand">Bar trivia v0.1</a>
            <router-link class="navbar-brand" to="/NewQuestion"><a>New Question</a></router-link>
            <router-link class="navbar-brand" to="/question"><a>Trivia</a></router-link>
         </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "nav"
};
</script>