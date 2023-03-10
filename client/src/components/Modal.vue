<template>
    <div class="modal">
        <button class="close" @click="closeModal">
            <font-awesome-icon icon="xmark"/>
        </button>
        <div class="inner">
            <DetailsItem 
                :productVariant="item.product"
                :imageSrc="getImgSrc(item.topic_data.name)"
                :title="item.title"
                :dateCreated="dateAndTime(item.d_created)"
            />

            <div class="comment">{{ item.comment }}</div>

            <div class="score flex" 
                v-show="item.score !== ''">
                <span>Score</span> {{ item.score }}/10
            </div>
        </div>
    </div>
</template>

<script>
import DetailsItem from '@/components/DetailsItem.vue';
import dayjs from 'dayjs';

export default {
  name: 'Modal',
  components: {
    DetailsItem,
  },
  props: {
    item: Object,
  },
  methods: {
    closeModal() {
        this.$emit('input', false);
    },

    dateAndTime(timestamp) {
      return dayjs(timestamp).format("MMM D, YYYY · h:mm a");
    },

    getImgSrc(name) {
      const images = require.context('../assets/topics', false, /\.png$/);
      return images(`./${name.replaceAll(' ', '')}.png`);
    }
  },
};
</script>

<style lang="scss" scoped>
    @import "/src/styles/reset.scss";
    @import "/src/styles/global.scss";
    @import "/src/styles/variables.scss";
    @import "https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap";

    .modal{
        position: fixed;
        z-index: 1;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%,);
        max-width: 50vw;
        width: 100%;
        height: 74vh;
        border-radius: 20px;
        border: 0.333rem solid #a0a0a0;
        padding: 1.667rem;
        background: #fff;

        .close{
            top: 1.667rem;
            right: 1.667rem;
            position: absolute;
            width: 2.222rem;
            height: 2.222rem;
            border-radius: 50%;
            border: 0.333rem solid #a0a0a0;
            background: #fff;

            svg {
                width: 100%;
                height: 100%;
                path{
                    fill: #a0a0a0;
                }
            }
        }

        .inner{
            display: flex;
            flex-direction: column;
            height: 100%;
            ::v-deep .details-item {
                display: flex;
                align-items: center;
                flex-direction: column;
                margin-top: 1.667rem;
                .icon{
                    width: 5.5rem;
                    height: 5.5rem;

                    &.bpjr{
                        &::after{
                            width: 2em;
                            height: 2em;
                        }
                    }                    
                }
                .details {
                    text-align: center;
                    p{
                        font-size: 2.5rem;
                        margin: 1.5rem 0;
                    }
                    .date{
                        font-size: 1.5rem;
                    }
                }
            }

            .comment {
                font-weight: 700;
                font-size: 2.5rem;
                margin-top: 2rem;
                margin-left: 1.111rem;
            }
            .score {
                gap: 10px;
                color: $secondary-color;
                font-weight: 700;
                font-size: 1.8rem;
                margin-top: auto;
                margin-left: 1.111rem;

                span{
                    font-weight: 400;
                }
            }
        }
    }
</style>