<template>
    <div class="modal">
        <button class="close" @click="closeModal">
            <font-awesome-icon icon="xmark"/>
        </button>
        <div class="inner">
            <DetailsItem 
                :imageSrc="item.topic_data.icon_path"
                :title="item.title"
                :dateCreated="dateAndTime(item.d_created)"
            />

            <div class="comment">{{ item.comment }}</div>

            <div class="score flex" 
                v-show="showScore">
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
    showScore: Boolean
  },
  methods: {
    closeModal() {
        this.$emit('input', false);
    },

    dateAndTime(timestamp) {
      return dayjs(timestamp).format("MMM D, YYYY · h:mm a");
    },
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
        max-width: 1145px;
        width: 100%;
        height: 645px;
        border-radius: 20px;
        border: 6px solid #a0a0a0;
        padding: 0 30px;
        background: #fff;
        .close{
            top: 30px;
            right: 30px;
            position: absolute;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 6px solid #a0a0a0;
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
            ::v-deep .details-item {
                align-items: center;
                justify-content: center;
                flex-direction: column;
                margin-top: 60px;
                .icon{
                    width: 5.5rem;
                    height: 5.5rem;
                }
                .details {
                    text-align: center;
                    p{
                        font-size: 3rem;
                        margin: 40px 0;
                    }
                    .date{
                        font-size: 1.5rem;
                    }
                }
            }

            .comment {
                font-weight: 700;
                font-size: 3rem;
                margin-top: 40px;
                margin-left: 20px;
            }
            .score {
                gap: 10px;
                color: $secondary-color;
                font-weight: 700;
                font-size: 2rem;
                margin-top: 140px;
                margin-left: 20px;

                span{
                    font-weight: 400;
                }
            }
        }
    }
</style>