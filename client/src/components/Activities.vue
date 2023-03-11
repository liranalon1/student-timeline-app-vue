<template>
  <div class="activities">
    <div class="inner-list" 
      v-for="month in months" 
      :key="month">
      <span class="month" 
        v-if="items.filter(({monthName}) => monthName.includes(month)).length">
        {{ month }}
      </span>
      <ul>
        <li 
          v-for="(item, index) in items.slice(0, activitiesToShow).filter(({monthName}) => monthName.includes(month))"
          :class="['row flex', {'lastRow': index === items.filter(({monthName}) => monthName.includes(month)).length - 1 }]"
          :key="item.id">

          <DetailsItem 
            :productVariant="item.product"
            :imageSrc="getImgSrc(item.topic_data.name)"
            :title="item.title"
            :dateCreated="dateAndTime(item.d_created)"
          />

          <div class="inner-right flex">
            <div class="score flex" 
              v-show="showScore(item.resource_type)">
              <span>Score</span> {{ item.score }}/10
            </div>
            <div class="view-work flex" 
              v-show="showZoom(item.resource_type)">
              <a @click="handleZoom(item)">
                <font-awesome-icon icon="eye" /> 
                View work
              </a>
            </div>
          </div>
  
        </li>
      </ul>
    </div>

    <div 
      v-if="showLoadMore" 
      class="load-more" 
      @click="activitiesToShow += 10">
      <a><font-awesome-icon icon="chevron-down" /> Load More</a>
    </div>

  </div>
</template>

<script>
import DetailsItem from '@/components/DetailsItem.vue';
import dayjs from 'dayjs';

export default {
  name: 'activities',
  components: {
    DetailsItem,
  },
  props: {
      items: Array,
      months: Array,
      tabValue: String,
      searchValue: String,
  },
  data() {
    return {
      activitiesToShow: 10,
      allMonthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      selectedActivity: {},
      activityTypes: {
        "movie": {
          score: false,
          zoom: false
        },
        "quiz": {
          score: true,
          zoom: true
        },
        "easy_quiz": {
          score: true,
          zoom: true
        },
        "challenge": {
          score: true,
          zoom: true
        },
        "make_a_map": {
          score: false,
          zoom: true
        },
        "make_a_movie": {
          score: false,
          zoom: true
        },
        "wordplay": {
          score: false,
          zoom: true
        },
        "related_reading": {
          score: false,
          zoom: false
        },
        "draw_about_it": {
          score: false,
          zoom: true
        },
      },
    }
  },
  methods: {
    dateAndTime(timestamp) {
      return dayjs(timestamp).format("MMM D, YYYY · h:mm a");
    },

    showScore(resourceType) {
      return this.activityTypes[resourceType] !== undefined && this.activityTypes[resourceType].score;
    },

    showZoom(resourceType) {
      return this.activityTypes[resourceType] !== undefined && this.activityTypes[resourceType].zoom;
    },

    handleZoom(item) {
      this.$emit('handleModal', item);
    },

    getImgSrc(name) {
      const images = require.context('../assets/topics', false, /\.png$/);
      return images(`./${name.replaceAll(' ', '')}.png`);
    },
  },
  computed: {
    showLoadMore() {
      return this.activitiesToShow < this.items.length || this.items.length > this.activitiesToShow;
    },
  },
}
</script>

<style lang="scss" scoped>
  @import "/src/styles/reset.scss";
  @import "/src/styles/global.scss";
  @import "/src/styles/variables.scss";
  @import "https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap";

  .activities{
    .inner-list{
      .month{
        display: grid;
        place-items: center;
        width: 8.611rem;
        height: 2.222rem;
        background: #fcf7e1;
        border-radius: 50px;
        font-size: 1.111rem;
      }

      ul{

        .row{
          position: relative;
          height: 8.333rem;
          justify-content: space-between;
          align-items: center;
          border-radius: 5px;
          border: 2px solid $grey-color;
          padding: 0 1.667rem;
          margin: 1.444rem 0;

          &::before, &:not(.lastRow)::after {
            content: "";
            position: absolute;
            left: 4.167rem;
            width: 2px;
            height: 1.556rem;
            background: $grey-color;
          }

          &::before {
            top: -1.556rem;
          }

          &::after {
            bottom: -1.556rem;
          }

          ::v-deep .details-item {
            align-items: center;
            gap: 1.111rem;

            .details {
              gap: 0.556rem;
            }
          }

          .inner-right {
            gap: 30px;
            .view-work, .score {
              color: $secondary-color;
              font-weight: 700;
            }

            .score {
              gap: 1.667rem;

              span{
                font-weight: 400;
              }
            }

            .view-work{
              gap: 0.444rem;
              align-items: center;
            }            
          }
        }
      }
    }

    .load-more{
      text-align: center;
      color: $secondary-color;
      font-weight: 700;

      svg {
        margin-right: 0.556rem;
      }
    }
  }
</style>
