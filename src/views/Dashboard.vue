<template>
  <div class="home">
    <h1>Dashboard</h1>
    <v-row>
      <v-col cols="12" md="6" lg="4" xl="3" sm="6" xs="12">
        <DashboardCard
          title="Mails"
          :figure="mailCount"
          link="/mails"
          :isLoading="loading"
          theme="alternate-theme-red"
          :footerData="footerData"
          icon="layer-group"
          v-if="!loading"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DashboardCard from "@/components/DashboardCard.vue";

export default {
  name: "Dashboard",
  components: {
    DashboardCard,
  },
  data() {
    return {
      loading: false,
    };
  },
  created() {
    this.loading = true;
    this.$store
      .dispatch("dashboard/index")
      .then(() => {
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  },
  computed: {
    mail() {
      return this.$store.getters["dashboard/index"];
    },
    mailCount() {
      if (this.mail) {
        return this.mail.sent + this.mail.failed + this.mail.posted;
      }
      return 0;
    },
    footerData() {
      return {
        right: {
          text: "Sent",
          value: (this.mail && (this.mail.sent || 0)) ,
          color: "icon-green",
        },
        left: {
          text: "failed",
          value: (this.mail && (this.mail.failed || 0)),
          color: "icon-red",
        },
      };
    },
  },
};
</script>
