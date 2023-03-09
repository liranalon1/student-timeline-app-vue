<template>
  <div class="activities">
    <div class="container">
      <h1>Timeline</h1>

      <Search v-model="searchValue" />
      <FilterNav v-model="tabValue" />
      <Modal 
        v-if="showModal"
        v-model="showModal"
        :item="selectedActivity"
      />

      <div class="main-list">
        <div class="inner-list" 
          v-for="month in months" 
          :key="month">
          <span class="month" v-if="filteredList(month).length">{{ month }}</span>
          <ul>
            <li 
              v-for="(item, index) in filteredList(month)"
              :class="['row flex', {'lastRow': index === filteredList(month).length - 1 }]"
              :key="item.id">

              <DetailsItem 
                :imageSrc="item.topic_data.icon_path"
                :title="item.title"
                :dateCreated="dateAndTime(item.d_created)"
              />

              <div class="inner-right flex">
                <div class="score flex" 
                  v-show="handleScore(item.resource_type)">
                  <span>Score</span> {{ item.score }}/10
                </div>
                <div class="view-work flex" 
                  v-show="handleZoom(item.resource_type)">
                  <a @click="handleModal(item)">
                    <font-awesome-icon icon="eye" /> 
                    View work
                  </a>
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
import Modal from '@/components/Modal.vue';
import DetailsItem from '@/components/DetailsItem.vue';
import { callAPI } from "@/services";
import dayjs from 'dayjs';

export default {
  name: 'activities',
  components: {
    Search,
    FilterNav,
    Modal,
    DetailsItem,
  },
  data() {
    return {
      showModal: false,
      tabValue: "",
      searchValue: "",
      allMonthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      months: [],
      activities: [],
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
        showScore: false,
      }
    }
  },
  created() {
    this.getActivities(`activities/v1`);
  },
  watch: {
    $route(to, from) {
      this.handleModal();
    },
    showModal(to, from) {
      if(to == false) {
        if(this.$route.params.modal) {
          this.$router.push('/');
        }
      }
    }
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
                this.handleModal();
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
        const title = `${item.topic_data.name} ${item.resource_type.replaceAll("_", " ")}`

        this.activities.push({
          monthName,
          title,
          ...item
        })
      });
    },

    dateAndTime(timestamp) {
      return dayjs(timestamp).format("MMM D, YYYY · h:mm a");
    },

    filteredList(month) {
      return this.activities.filter(item => {
        const monthIsIncludes = item.monthName.includes(month);
        const tabValueIncludesInTitle = item.title.toLowerCase().includes(this.tabValue.toLowerCase());
        const searchValueIncludesInTitle = item.title.toLowerCase().includes(this.searchValue.toLowerCase());
        return monthIsIncludes && tabValueIncludesInTitle && searchValueIncludesInTitle;
      })
    },

    handleModal(item) {
        const urlParam = this.$route.params.modal;
        
        if(item !== undefined){
          this.selectedActivity = item;
          this.$router.push({path: `/${item.id}`}).catch(() => {});
          this.showModal = true;
        } else if( urlParam ) {
            this.activities.filter(elem => {
              if( elem.id === urlParam ) {
                this.selectedActivity = elem;
              }
            });
          if(this.selectedActivity !== "") {
            this.showModal = true;
          }
        } else {
          this.showModal = false;
        }
    },

    handleScore(resourceType) {
      return this.activityTypes[resourceType] !== undefined && this.activityTypes[resourceType].score;
    },

    handleZoom(resourceType) {
      return this.activityTypes[resourceType] !== undefined && this.activityTypes[resourceType].zoom;
    }
  },
  computed: {},
}
</script>

<style lang="scss" scoped>
  @import "/src/styles/reset.scss";
  @import "/src/styles/global.scss";
  @import "/src/styles/variables.scss";
  @import "https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap";

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

          &::before, &:not(.lastRow)::after {
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

          ::v-deep .details-item {
            align-items: center;
            gap: 20px;

            .details {
              gap: 10px;
            }
          }

          .inner-right {
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
