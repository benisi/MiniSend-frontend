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
          <div class="sidebar-view">
            <Sidebar />
          </div>
          <div class="main-view">
            <router-view />
          </div>
        </div>
        <router-view v-else />
      </div>
    </v-app>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
import { mapGetters } from 'vuex'

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

<style lang="scss" scoped></style>
