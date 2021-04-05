<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" divider="/"></v-breadcrumbs>
    <v-card class="mx-auto px-8 py-4" v-if="!loading">
      <v-card-text>
        <p class="display-1 text--primary">{{ mail.subject }}</p>
        <p class="faint  my-0">
          From: {{ mail.sender_email }}&#60;{{ mail.sender_name }}&#62;
        </p>
        <p class="faint my-0">To: {{ mail.email }}&#60;{{ mail.name }}&#62;</p>
        <p class="faint  my-0 mb-4">Date: {{ mail.created_at | dateTimeFilter }}</p>
        <hr />
        <div class="text--primary mt-8" v-if="mail.text">
          {{ mail.text }}
        </div>
        <div
          class="text--primary mt-8"
          v-if="mail.html"
          v-html="mail.html"
        ></div>
      </v-card-text>
    </v-card>
    <v-progress-circular
      :size="50"
      class="loader"
      :width="7"
      color="primary"
      indeterminate
      v-if="loading"
    ></v-progress-circular>
  </div>
</template>
<script>
import _ from "lodash";

export default {
  data() {
    return {
      loading: false,
      id: null,
      breadcrumbs: [
        {
          text: "Mails",
          disabled: false,
          href: "/mails",
        },
        {
          text: "view",
          disabled: true,
          href: "",
        },
      ],
    };
  },
  created() {
    this.loading = true;
    this.id = this.$route.params.id;
    this.breadcrumbs[1].text = this.id;
    this.$store
      .dispatch("mails/fetchSingle", this.id)
      .then(() => {
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  },
  computed: {
    mail() {
      return this.$store.getters["mails/getSingle"];
    },
  },
  methods: {},
};
</script>
<style scoped>
.loader {
  position: absolute;
  left: 50%;
  top: 35%;
  z-index: 1000;
  height: 31px;
  width: 31px;
}
.faint {
  color: rgb(0 0 0 / 50%);
}
</style>
