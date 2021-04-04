<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" divider="/"></v-breadcrumbs>
    <v-card>
      <v-row>
        <v-col md="8" class="float-left pb-0 mx-4">
          <v-text-field label="Search sender" v-model="search"></v-text-field>
        </v-col>
      </v-row>
      <v-row class="table-header pr-3 m-0">
        <v-col md="8" class="float-left pb-0">
          <h4 class="my-3 mx-4">
            Showing
            {{ recordsStartToEndString }} Mail Batch{{
              pagination.total === 1 ? "" : "s"
            }}
          </h4>
        </v-col>
      </v-row>
      <v-data-table
        :items="batch"
        :headers="headers"
        :items-per-page="50"
        :options.sync="options"
        :server-items-length="pagination.total"
        @update:options="updateOptions"
        :footer-props="{
          itemsPerPageOptions: [25, 50],
        }"
        :loading="loading"
      >
        <template v-slot:[`item.action`]="{ item }">
          <router-link :to="`/batches/${item.id}`">
            view mails on this batch
          </router-link>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
import _ from "lodash";

export default {
  data() {
    return {
      options: {},
      loading: false,
      search: "",
      headers: [
        { text: "Sender Email", value: "sender_email" },
        { text: "Sender Name", value: "sender_name" },
        { text: "Status", value: "status" },
        { text: "Mail Posted", value: "recipient_count" },
        { text: "Pending Mail", value: "pending_mail" },
        { text: "Date Created", value: "created_at" },
         { text: "", value: "action", sortable: false },
      ],
      breadcrumbs: [
        {
          text: "Batch",
          disabled: true,
          href: "",
        },
      ],
    };
  },
  created() {
    this.fetchBatch();
  },
  computed: {
    batch() {
      return this.$store.getters["mails/getBatch"];
    },
    pagination() {
      return this.$store.getters["mails/pagination"];
    },
    recordsStartToEndString() {
      let start = this.options.itemsPerPage * (this.options.page - 1) + 1;
      let stop =
        this.options.itemsPerPage * (this.options.page - 1) +
        this.options.itemsPerPage;
      start = this.pagination.total > 0 ? start : 0;
      stop = this.pagination.total < stop ? this.pagination.total : stop;
      return `${start} - ${stop} of ${this.pagination.total}`;
    },
  },
  methods: {
    fetchBatch(filters = {}) {
      this.loading = true;
      this.$store
        .dispatch("mails/fetchBatchList", filters)
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    updateOptions(event) {
      let sortField = event.sortBy.length > 0 ? event.sortBy[0] : "created_at";

      const filterOptions = {
        page: event.page,
        page_size: event.itemsPerPage,
        sort: {
          field: sortField,
          direction:
            (event.sortDesc.length > 0 && !!event.sortDesc[0]) ||
            event.sortDesc.length == 0
              ? "desc"
              : "asc",
        },
      };
      if (this.search && this.search.trim().length > 0) {
        filterOptions.search = this.search.trim();
      }
      this.fetchBatch(filterOptions);
    },
    syncOptions(options) {
      this.options = options;
    },
  },
  watch: {
    search: _.debounce(function () {
      if (this.search && this.search.trim().length === 0) return;
      const filterOptions = {
        page: this.options.page,
        page_size: this.options.itemsPerPage,
        search: this.search,
      };
      this.fetchBatch(filterOptions);
    }, 300),
  },
};
</script>
