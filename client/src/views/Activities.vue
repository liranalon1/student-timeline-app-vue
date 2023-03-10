<template>
  <div class="activities">
    <div class="container">
      <h1>Timeline</h1>

      <button class="switch-api" @click="toggleAPI">Switch API >></button>

      <div class="search-wrap">
        <Search v-model="searchValue" />
        <AutoComplete 
          v-if="filteredList.length && searchValue"
          :items="filteredList" />
      </div>
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
          <span class="month" 
            v-if="filteredList.filter(({monthName}) => monthName.includes(month)).length">
            {{ month }}
          </span>
          <ul>
            <li 
              v-for="(item, index) in filteredList.filter(({monthName}) => monthName.includes(month))"
              :class="['row flex', {'lastRow': index === filteredList.filter(({monthName}) => monthName.includes(month)).length - 1 }]"
              :key="item.id">

              <DetailsItem 
                :productVariant="item.product"
                :imageSrc="getImgSrc(item.topic_data.name)"
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

        <div 
          v-if="handleLoadMore" 
          class="load-more" 
          @click="activitiesToShow += 10">
          <a><font-awesome-icon icon="chevron-down" /> Load More</a>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Search from '@/components/Search.vue';
import AutoComplete from '@/components/AutoComplete.vue';
import FilterNav from '@/components/FilterNav.vue';
import Modal from '@/components/Modal.vue';
import DetailsItem from '@/components/DetailsItem.vue';
import { callAPI } from "@/services";
import dayjs from 'dayjs';

export default {
  name: 'activities',
  components: {
    Search,
    AutoComplete,
    FilterNav,
    Modal,
    DetailsItem,
  },
  data() {
    return {
      currentAPI: "",
      showModal: false,
      showAutoComplete: false,
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
      },
      activitiesToShow: 10,
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    showModal(to, from) {
      if(to == false) {
        if(this.$route.params.modal) {
          this.$router.push(this.$route.path);
        }
      }
    }
  },
  methods: {
    init() {
      const expr = this.$route.path;
      switch (expr) {
        case '/v1':
          this.currentAPI = "v1";
          this.getData(`activities/v1`);
          break;
        case '/v2':
          this.currentAPI = "v2";
          this.getData(`activities/v2`);
          break;
        default:
          this.currentAPI = "v1";
          this.getData(`activities/v1`);
      }
    },

    changePathToCurrentAPI() {
      this.$router.push({path: `/${this.currentAPI}`}).catch(() => {});
    },

    toggleAPI() {
      if( this.currentAPI === "v1" ){
        this.currentAPI = "v2";
      }else{
        this.currentAPI = "v1";
      }
      this.activities.splice(0);
      this.getData(`activities/${this.currentAPI}`);
    },

    getData(api) {
        callAPI({
            url: api, 
            params: {
              method: "get",
            }          
        })
        .then((res) => {
            if(res.status === 200){
              this.handleAPIResponse({api: this.currentAPI, data: res.data}) 
            }else{
                console.log(res);
            }
        });
    },

    handleAPIResponse({api, data}) {
      let arr = []

      data.forEach(item => {
        if(api === "v1"){
          item.d_created = this.getTimeStamp(item.d_created);
          arr.push(item);
        }else{
          item.activities.forEach(elem => {
            elem.d_created = this.getTimeStamp(elem.d_created);
            arr.push({
              ...elem,
              resource_type: item.resource_type
            });            
          });
        }
      });

      this.setMonths(arr);
      this.setActivities(arr);
      this.handleModal();
    },

    getTimeStamp(time) {
      return Number(time) * 1000;
    },

    getMonthName(unixtime) {
      const monthNum = dayjs(unixtime).month();
      return this.allMonthNames[monthNum];
    },

    setMonths(arr) {
      const months = arr.map(item => this.getMonthName(item.d_created));
      const uniqueMonthNames = [...new Set(months)];
      this.months = this.sortByMonth(uniqueMonthNames);
    },

    setActivities(arr) {
      arr.map((item) => {
        const monthName = this.getMonthName(item.d_created);
        const title = `${item.topic_data.name} ${item.resource_type.replaceAll("_", " ")}`
        this.activities.push({
          monthName,
          title,
          ...item
        })
      });
    },

    sortByMonth(arr) {
      const sortedMonths = arr.sort((a, b) => {
        return (this.allMonthNames.indexOf(a) < this.allMonthNames.indexOf(b) ? 1 : -1);
      });
      return sortedMonths;
    },

    dateAndTime(timestamp) {
      return dayjs(timestamp).format("MMM D, YYYY · h:mm a");
    },

    handleModal(item) {
      const urlHash = this.$route.hash;
      if(item === undefined && !urlHash){
        this.changePathToCurrentAPI();
        return
      }
      //  in case there is urlHash
      else if( urlHash.includes("id=") ) {
        this.activities.filter(elem => {
          if( urlHash.split('#id=')[1] === elem.id ) {
            this.selectedActivity = elem;
            this.showModal = true;
          }
        });
      }
      else {
        this.selectedActivity = item;
        this.$router.push({hash: `id=${item.id}`}).catch(() => {});
        this.showModal = true;          
      }
    },

    handleScore(resourceType) {
      return this.activityTypes[resourceType] !== undefined && this.activityTypes[resourceType].score;
    },

    handleZoom(resourceType) {
      return this.activityTypes[resourceType] !== undefined && this.activityTypes[resourceType].zoom;
    },

    getImgSrc(name) {
      const images = require.context('../assets/topics', false, /\.png$/);
      return images(`./${name.replaceAll(' ', '')}.png`);
    },
  },
  computed: {
    filteredList() {
      return this.activities.slice(0, this.activitiesToShow).filter(item => {
        const tabValueIncludesInTitle = item.title.toLowerCase().includes(this.tabValue.toLowerCase());
        const searchValueIncludesInTitle = item.title.toLowerCase().includes(this.searchValue.toLowerCase());
        return tabValueIncludesInTitle && searchValueIncludesInTitle;
      })
    },
    handleLoadMore() {
      return this.activitiesToShow < this.activities.length || this.activities.length > this.activitiesToShow;
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
    h1{
      font-weight: 900;
      font-size: 2.222rem;
    }

    .switch-api {
      color: $secondary-color;
      font-weight: 700;
      margin-top: 1.111rem;
      text-decoration: underline;      
    }
    .search-wrap{
      max-width: 31.667rem;
      position: relative;
    }
    .main-list{
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
  }
</style>
