<template>
  <router-link :to="link">
    <v-card
      class="my-5 py-2 p-0 m-0 dash-card w-100"
      :class="`${cardTheme}-${theme}`"
    >
      <v-row class="w-100 my-4 p-0">
        <v-col class="card-widget w-100" cols="12">
          <span class="figure">
            <ICountUp
              :endVal="figure"
              :options="countUpOptions"
              @ready="onReady"
            />
          </span>
          <div class="title mt-2">{{ title }}</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="w-100 py-0 my-0" cols="12" md="12">
          <hr class="divider w-100 my-0" />
        </v-col>
        <v-col cols="12" md="12" class="d-flex justify-content-center">
          <span class="footer-text d-flex align-items-center px-4">
            <font-awesome-icon
              class="item-icon mr-2"
              icon="circle"
              :class="footerData.right.color"
            ></font-awesome-icon>
            {{ footerData.right.value | seperateThousandByComma }}
            {{ footerData.right.text }}
          </span>
          |
          <span class="footer-text d-flex align-items-center px-4">
            <font-awesome-icon
              class="item-icon mr-2"
              :class="footerData.left.color"
              icon="circle"
            ></font-awesome-icon>
            {{ footerData.left.value | seperateThousandByComma }}
            {{ footerData.left.text }}
          </span>
        </v-col>
      </v-row>
    </v-card>
  </router-link>
</template>

<script>
import ICountUp from "vue-countup-v2";

export default {
  components: {
    ICountUp,
  },
  props: {
    title: {
      type: String,
      isRequired: true,
    },
    figure: {
      type: Number,
      isRequired: true,
    },
    link: {
      type: String,
      isRequired: true,
    },
    icon: {
      type: String,
      isRequired: true,
    },
    isLoading: {
      type: Boolean,
      isRequired: true,
    },
    footerData: {
      type: Object,
      isRequired: true,
    },
    theme: {
      type: String,
      isRequired: true,
    },
  },
  data() {
    return {
      cardTheme: "alternate",
      countUpOptions: {
        useEasing: true,
        useGrouping: true,
        separator: ",",
        decimal: ".",
        prefix: "",
        suffix: "",
      },
    };
  },
  methods: {
    onReady(instance, CountUp) {
      instance.update(0 + this.figure);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";
.divider {
  color: $mystic;
}

.icon-green {
  color: $green-weed;
}

.icon-red {
  color: $red-flower;
}

.icon-orange {
  color: $orange;
}

.icon-container {
  border-radius: 50%;
}
.v-card .figure {
  font-size: 1.375rem;
  font-weight: 600;
  display: block;
}
.item-icon {
  font-size: 2rem;
}
.v-card .title {
  color: $mulled-wine;
  font-size: 1rem !important;
  letter-spacing: 0.05px;
  line-height: 22px;
  font-weight: 300;
}
.dash-card {
  border-radius: 10px !important;
  box-shadow: 0 2px 40px 0 rgba(0, 0, 0, 0.04) !important;
  margin-top: 40px !important;
}
.footer-text {
  color: $mulled-wine;
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.03px;
  width: 45%;
  justify-content: center;
  line-height: 17px;
  display: inline-block;
  padding: 0 0.5rem 0 0.5rem;
  .item-icon {
    font-size: 12px;
  }
}
@media only screen and (max-width: 913px) and (min-width: 766px) {
  .v-card .figure {
    font-size: 3rem;
  }
}
@media only screen and (max-width: 320px) {
  .v-card .figure {
    font-size: 2.5rem;
  }
}

@media only screen and (max-width: 767px) {
  .v-card span.figure {
    text-align: center !important;
  }
  .v-card .title {
    text-align: center;
  }
}

@media only screen and (max-width: 1629px) and (min-width: 1200px) {
  .card-widget {
    text-align: center;
  }
}
@media only screen and (max-width: 1155px) and (min-width: 992px) {
  .item-icon {
    font-size: 1.5rem;
  }
}

.alternate-theme-green {
  color: white !important;
  background: $forest-green !important;
  .divider {
    background-color: white !important;
  }
  .figure,
  .title,
  span,
  div,
  .item-icon {
    color: white !important;
  }
  .theme-green {
    background-color: $gin-light !important;
  }
}

.alternate-theme-red {
  color: white !important;
  background: $cardinal !important;
  .divider {
    background-color: white;
  }
  .figure,
  .title,
  span,
  div,
  .item-icon {
    color: white !important;
  }
  .theme-red {
    background-color: $red-tone !important;
  }
}

.alternate-theme-blue {
  color: white !important;
  background: $blue-sea !important;
  .divider {
    background-color: white;
  }
  .figure,
  .title,
  span,
  div,
  .item-icon {
    color: white !important;
  }
  .theme-blue {
    background-color: $blue-sea-dark !important;
  }
}

.alternate-theme-purple {
  color: white !important;
  background: $purple-dark !important;
  .divider {
    background-color: white;
  }
  .figure,
  .title,
  span,
  div,
  .item-icon {
    color: white !important;
  }
  .theme-purple {
    background-color: $light-purple !important;
  }
}

.v-card span.figure {
  text-align: center !important;
}
.v-card .title {
  text-align: center;
}
</style>
