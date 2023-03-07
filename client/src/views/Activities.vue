<template>
  <div class="activities">
    <div class="container">
      <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
      <h1>Timeline</h1>
      {{ parentValue }}
      <Search />
      <FilterNav v-model="parentValue" />

      <div class="main-list">
        <div class="inner-list" 
          v-for="month in months" 
          :key="month">
          <span class="month">{{ month }}</span>
          <ul>
            <li 
              v-for="activity in activities.filter(item => item.monthName.includes(month))"
              class="row flex"
              :key="activity.id">

              <div class="inner flex">
                <div class="icon">
                  <img :src="activity.topic_data.icon_path" :alt="activity.topic_data.name" />
                </div>
                <div class="details flex">
                  <p>{{ activity.topic_data.name }} {{ activity.resource_type.replaceAll("_", " ") }}</p>
                  <span class="date">{{ dateAndTime(activity.d_created) }}</span>
                </div>
              </div>

              <div class="inner flex">
                <div class="score flex" 
                  v-show="activityTypes[activity.resource_type] !== undefined && activityTypes[activity.resource_type].score">
                  <span>Score</span> {{ activity.score }}/10
                </div>
                <div class="view-work flex" 
                  v-show="activityTypes[activity.resource_type] !== undefined && activityTypes[activity.resource_type].zoom">
                  <a><font-awesome-icon icon="eye" /> View work</a>
                </div>
              </div>
      
            </li>
          </ul>
        </div>

        <div class="load-more" @click="getActivities(`activities/v2`)">
          <a><font-awesome-icon icon="chevron-down" /> Load More</a>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Search from '@/components/Search.vue';
import FilterNav from '@/components/FilterNav.vue';
import { callAPI } from "@/services";
import dayjs from 'dayjs';

export default {
  name: 'activities',
  components: {
    Search,
    FilterNav
  },
  data() {
    return {
      parentValue: 'hello',
      allMonthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      months: [],
      activities: [],
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
      }
    }
  },
  mounted() {
    this.getActivities(`activities/v1`);
  },
  methods: {
    getActivities(url) {
        callAPI({
            url: url, 
            params: {
              method: "get",
            }          
        })
        .then((res) => {
            if(res.status === 200){
                this.setMonths(res.data);
                this.setActivities(res.data);
            }else{
                console.log(res);
            }
        });
    },

    setMonths(arr) {
      const months = arr.map(({d_created}) => {
        const monthNum = dayjs(d_created).month();
        const monthName = this.allMonthNames[monthNum];
        return monthName;
      });

      const uniqueMonthNames = [...new Set(months)];
      this.months = uniqueMonthNames;
    },

    setActivities(arr) {
      arr.map((item) => {
        const monthNum = dayjs(item.d_created).month();
        const monthName = this.allMonthNames[monthNum];

        this.activities.push({
          monthName,
          ...item
        })
      });
    },

    dateAndTime(timestamp) {
      return dayjs(timestamp).format("MMM D, YYYY · h:mm a");
    },
  },
  computed: {
    filteredList() {
      return this.activities.filter(activity => {
        return activity.title.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
}
</script>

<style lang="scss" scoped>
  @import "/src/styles/reset.scss";
  @import "/src/styles/global.scss";
  @import "/src/styles/variables.scss";
  @import "https://fonts.googleapis.com/css2?family=Lato:wght@400;700,900&display=swap";

  .activities{
    h1{
      font-weight: 900;
      font-size: 40px;
    }

    .main-list{
    .inner-list{
      .month{
        display: grid;
        place-items: center;
        width: 155px;
        height: 40px;
        background: #fcf7e1;
        border-radius: 50px;
        font-size: 20px;
      }

      ul{

        .row{
          position: relative;
          height: 150px;
          justify-content: space-between;
          align-items: center;
          border-radius: 5px;
          border: 2px solid $grey-color;
          padding: 0 30px;
          margin: 26px 0;

          &::before, &::after {
            content: "";
            position: absolute;
            left: 75px;
            width: 2px;
            height: 28px;
            background: $grey-color;
          }

          &::before {
            top: -28px;
          }

          &::after {
            bottom: -28px;
          }

          .inner{
            align-items: center;

            &:first-child{
              gap: 20px;

              .icon{
                width: 65px;
                height: 65px;
                background: #01c5c4;
                border-radius: 50%;

                img{

                }
              }
            }

            &:last-child{
              gap: 30px;

              .view-work, .score {
                color: $secondary-color;
                font-weight: 700;
              }

              .score {
                gap: 10px;

                span{
                  font-weight: 400;
                }
              }

              .view-work{
                gap: 8px;
                align-items: center;
              }
            }

            .details{
              flex-direction: column;
              gap: 15px;

              p{
                font-weight: 700;
                text-transform: capitalize;
              }
            }
          }
        }
      }

      .inner-list:last-child{
        background: red;  
        .row:last-child{
          &::after {
            content: none;  //  need to check why it doesn't work !!!!
          }
        }
      }

    }

    .load-more{
      text-align: center;
      color: $secondary-color;
      font-weight: 700;

      svg {
        margin-right: 10px;
      }
    }
  }
  }
</style>
