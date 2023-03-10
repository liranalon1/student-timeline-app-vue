<template>
    <div class="serach">
        <input type="text" placeholder="Search Timeline" autofocus @input="search($event)" />
        <div class="search-icon"><font-awesome-icon icon="magnifying-glass" /></div>
    </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    
  },
  methods: {
    search(e) {
        this.$emit('input', e.target.value.trim());
    }    
  },
};
</script>

<style lang="scss" scoped>
    @import "/src/styles/reset.scss";
    @import "/src/styles/global.scss";
    @import "/src/styles/variables.scss";
    @import "https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap";

    .serach {
        position: relative;
        width: 100%;
        height: 2.889rem;
        border-radius: 5px;
        border: 2px solid $grey-color;
        margin-top: 1.667rem;
        input {
            width: 100%;
            height: 100%;
            padding: 0 0.833rem;
            font-weight: 700;
        }
        .search-icon{
            position: absolute;
            top: 0;
            right: 0;
            width: 2.778rem;
            height: 2.778rem;
            background: $secondary-color;
            display: grid;
            place-items: center;
            svg {
                height: 1.3em;
                path {
                    fill: #fff;
                }
            }
        }
    }
</style>