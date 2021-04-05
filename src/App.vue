<template>
  <div id="app">
    <v-app>
      <notifications
        group="notification"
        position="top center"
        :duration="10000"
      />
      <div class="container-fluid px-0">
        <FullScreenLoader :status="showLoader" :message="loaderMessage" />
        <div v-if="!!token" class="full-view">
          <Header />
          <Sidebar />
          <v-main>
            <div class="main-view">
              <router-view />
            </div>
          </v-main>
        </div>
        <router-view v-else />
      </div>
    </v-app>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
import { mapGetters } from "vuex";
import FullScreenLoader from "@/components/FullScreenLoader.vue";
import { eventBus } from "@/eventBus";

export default {
  components: {
    Sidebar,
    Header,
    FullScreenLoader,
  },
  data() {
    return {
      showLoader: false,
      loaderMessage: "",
    };
  },
  created() {
    eventBus.$on("show-loader", (message) => {
      this.showLoader = true;
      this.loaderMessage = message;
    });
    eventBus.$on("hide-loader", () => {
      this.showLoader = false;
      this.loaderMessage = "";
    });
  },
  computed: {
    ...mapGetters({
      token: "auth/getToken",
      user: "auth/getUser",
    }),
  },
  watch: {
    $route(to, from) {
      document.title = `${to.meta.title} - MiniSend` || "MiniSent";
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/_variables.scss";

.app-row,
.app-col {
  height: inherit;
}

.main-view {
  overflow-x: hidden;
  overflow-y: auto;
  padding-left: 65px;
  padding-right: 65px;
  padding-top: 40px;

  @media screen {
    height: 85vh;
  }

  @media screen and (max-width: 768px) {
    padding: 10px !important;
  }

  @media screen and (min-width: 768px) and (max-width: 960px) {
    padding: 20px !important;
  }
  @media only screen and (min-width: 1280px) and (max-width: 1799px) {
    padding: 50px !important;
  }
}

@font-face {
  font-family: "Poppins";
  src: url("assets/fonts/Poppins/Poppins-BlackItalic.ttf") format("truetype");
  font-weight: 900;
  font-style: normal;
}

@font-face {
  font-family: "Poppins";
  src: url("assets/fonts/Poppins/Poppins-Black.ttf") format("truetype");
  font-weight: 900;
  font-style: normal;
}

@font-face {
  font-family: "Poppins";
  src: url("assets/fonts/Poppins/Poppins-BoldItalic.ttf") format("truetype");
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: "Poppins";
  src: url("assets/fonts/Poppins/Poppins-Bold.ttf") format("truetype");
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: "Poppins";
  src: url("assets/fonts/Poppins/Poppins-ExtraBoldItalic.ttf")
    format("truetype");
  font-weight: 800;
  font-style: normal;
}

@font-face {
  font-family: "Poppins";
  src: url("assets/fonts/Poppins/Poppins-ExtraBold.ttf") format("truetype");
  font-weight: 800;
  font-style: normal;
}

@font-face {
  font-family: "Poppins";
  src: url("assets/fonts/Poppins/Poppins-ExtraLightItalic.ttf")
    format("truetype");
  font-weight: 200;
  font-style: normal;
}

@font-face {
  font-family: "Poppins";
  src: url("assets/fonts/Poppins/Poppins-ExtraLight.ttf") format("truetype");
  font-weight: 200;
  font-style: normal;
}

@font-face {
  font-family: "Poppins";
  src: url("assets/fonts/Poppins/Poppins-Italic.ttf") format("truetype");
  font-weight: medium;
  font-style: normal;
}

@font-face {
  font-family: "Poppins";
  src: url("assets/fonts/Poppins/Poppins-LightItalic.ttf") format("truetype");
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: "Poppins";
  src: url("assets/fonts/Poppins/Poppins-Light.ttf") format("truetype");
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: "Poppins";
  src: url("assets/fonts/Poppins/Poppins-MediumItalic.ttf") format("truetype");
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: "Poppins";
  src: url("assets/fonts/Poppins/Poppins-Medium.ttf") format("truetype");
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: "Poppins";
  src: url("assets/fonts/Poppins/Poppins-Regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: "Poppins";
  src: url("assets/fonts/Poppins/Poppins-SemiBoldItalic.ttf") format("truetype");
  font-weight: 600;
  font-style: normal;
}

@font-face {
  font-family: "Poppins";
  src: url("assets/fonts/Poppins/Poppins-SemiBold.ttf") format("truetype");
  font-weight: 600;
  font-style: normal;
}

@font-face {
  font-family: "Poppins";
  src: url("assets/fonts/Poppins/Poppins-ThinItalic.ttf") format("truetype");
  font-weight: 100;
  font-style: normal;
}

@font-face {
  font-family: "Poppins";
  src: url("assets/fonts/Poppins/Poppins-Thin.ttf") format("truetype");
  font-weight: 100;
  font-style: normal;
}

.v-application {
  font-family: "Poppins";
}

.v-main,
.theme--light.v-application {
  background-color: #f1f3f6 !important;
}

a {
  text-decoration: none;
}

.sent,
.completed {
  background-color: $gin-light !important;
  color: $white !important;
}

.failed,
.uncomplete {
  background-color: $warning !important;
  color: $danger !important;
}

.v-breadcrumbs li {
  font-size: 1.3rem !important;
}
</style>
