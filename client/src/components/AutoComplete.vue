<template>
    <div class="auto-complete">
        <ul class="flex">
            <li v-for="item in items" :key="item.title">{{ item.title }}</li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'AutoComplete',
  props: {
    items: Array,
  },
  methods: {
       
  },
};
</script>

<style lang="scss" scoped>
    @import "/src/styles/reset.scss";
    @import "/src/styles/global.scss";
    @import "/src/styles/variables.scss";
    @import "https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap";

    .auto-complete {
        position: absolute;
        z-index: 1;
        top: 52px;
        width: 100%;
        max-height: 270px;
        background: #fff;
        border: 2px solid $grey-color;
        border-top: none;
        overflow-x: auto;        
        ul {
            flex-direction: column;
            li{
                padding: 10px;
            }
        }
    }
</style>