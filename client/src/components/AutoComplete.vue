<template>
    <div class="auto-complete">
        <ul class="flex">
            <li 
                v-for="item in sortList(items)" 
                :key="item.title"
                @click="selectItem(item.title)">
                {{ item.title }}
            </li>
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
    selectItem(item) {
        this.$emit('input', item);
        this.$emit('autoComplete', false);
    },
    sortList(arr) {
        return arr.sort((a, b) => (a.title < b.title ? -1 : 1));
    }
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
        top: 3rem;
        width: 100%;
        max-height: 16.875rem;
        background: #fff;
        border: 2px solid $grey-color;
        border-top: none;
        overflow-x: auto;
        ul {
            flex-direction: column;
            li{
                padding: 10px;
                cursor: pointer;
            }
        }
    }
</style>