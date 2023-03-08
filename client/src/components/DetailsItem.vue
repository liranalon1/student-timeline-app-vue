<template>
    <div class="details-item flex">
        <div class="icon">
            <img :src="imageSrc" :alt="title" />
        </div>
        <div class="details flex">
            <p>{{ title }}</p>
            <span class="date">{{ dateCreated }}</span>
        </div>   
    </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'Modal',
  props: {
    imageSrc: String,
    title: String,
    dateCreated: String,
  },
};
</script>

<style lang="scss" scoped>
    @import "/src/styles/reset.scss";
    @import "/src/styles/global.scss";
    @import "/src/styles/variables.scss";
    @import "https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap";

    .details-item {
        .icon{
            width: 65px;
            height: 65px;
            background: #01c5c4;
            border-radius: 50%;
        }

        .details{
            flex-direction: column;

            p{
                font-weight: 700;
                text-transform: capitalize;
            }
        }
    }
</style>