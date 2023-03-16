<template>
    <div class="details-item flex">
        <div :class="['icon', `${productVariant}`]">
            <img :src="imageSrc" :alt="title" />
        </div>
        <div class="details flex">
            <p>{{ title }}</p>
            <span class="date">{{ dateCreated }}</span>
        </div>   
    </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    productVariant: String,
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
            position: relative;
            width: 4rem;
            height: 4rem;
            border-radius: 50%;
            display: grid;
            place-items: center;
            &.bp{
                background: #01c5c4;
            }
            &.bpjr{
                background: #f7af0f;
                &::after{
                    content: "Jr.";
                    position: absolute;
                    z-index: 1;
                    bottom: 0;
                    right: -8px;
                    background: #ffc65f;
                    width: 1.5em;
                    height: 1.5em;
                    border-radius: 50%;
                    color: #5e3114;
                    display: grid;
                    place-items: center;
                    font-size: 1rem;
                    font-weight: 900;
                }
            }

            img {
                max-width: 80%;
            }
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