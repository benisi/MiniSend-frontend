<template>
  <div id="app">
    <v-app>
      <notifications
        group="notification"
        position="top center"
        :duration="10000"
      />
      <div class="container-fluid px-0">
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

export default {
  components: {
    Sidebar,
    Header,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      token: "auth/getToken",
      user: "auth/getUser",
    }),
  },
};
</script>

<style lang="scss" scoped>
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
</style>
