<template>
    <div class="serach">
        <input type="text" placeholder="Search Timeline" autofocus @input="search($event)" />
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
        margin-top:30px;

        input {
            max-width: 570px;
            width: 100%;
            height: 52px;
            border-radius: 5px;
            border: 2px solid $grey-color;
            padding: 0 15px;
            font-weight: 700;
        }
    }
</style>