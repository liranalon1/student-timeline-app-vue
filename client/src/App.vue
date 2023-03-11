<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import "/src/styles/reset.scss";
  @import "/src/styles/global.scss";
  @import "/src/styles/variables.scss";
  @import "https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap";

  #app {
    color: $primary-color;
    font-family: $primary-font;
  }

  @media screen and (max-width: 1366px) {
    :root{
      font-size: 14px;
    }
  }  
</style>
