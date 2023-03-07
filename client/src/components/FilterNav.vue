<template>
    <div class="filter-nav">
        <h2 class="title">Filter By:</h2>
        <nav>
          <ul class="flex">
              <li 
              v-for="(item, index) in tabs" 
              :key="item.name"
              @click="handleTab(index)">
              <a :class="[{'active': item.isActive}, 'flex']">
                  <font-awesome-icon icon="circle-check" v-if="item.isActive" /> {{ item.name }}
              </a>
              </li>
          </ul>
        </nav>    
    </div>
</template>

<script>
export default {
  name: 'FilterNav',
  data() {
    return {
      tabs: [
        {name: "All Work", isActive: true},
        {name: "Movie", isActive: false},
        {name: "Quiz", isActive: false},
        {name: "Easy Quiz", isActive: false},
        {name: "Make-a-Map", isActive: false},
        {name: "Make-a-Movie", isActive: false},
        {name: "World Play", isActive: false},
        {name: "Related Reading", isActive: false},
        {name: "Challenge", isActive: false},
        {name: "Draw About It", isActive: false},
      ],
    }
  },
  mounted() {},
  methods: {
    handleTab(index) {
      this.tabs.forEach((elem, i) => {
        if(i === index){
          elem.isActive = true;
        }else{
          elem.isActive = false;
        }
      });

      this.$emit('input', index);
    }    
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
  @import "/src/styles/reset.scss";
  @import "/src/styles/global.scss";
  @import "/src/styles/variables.scss";
  @import "https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap";
.filter-nav{
  nav{
    ul{
      gap: 12px;
      
      li {
        a{
          align-items: center;
          justify-content: center;
          gap: 6px;
          height: 52px;
          padding: 0 20px;
          border-radius: 5px;
          border: 2px solid $secondary-color;
          color: $secondary-color;
          font-weight: 700;

          &:hover, &.active{
            background: #eafcfc;
          }
        }
      }
    }
  }
}
</style>