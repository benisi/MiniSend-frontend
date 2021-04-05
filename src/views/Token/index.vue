<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" divider="/"></v-breadcrumbs>
    <v-card>
      <v-row class="table-header pr-3 pt-4 m-0 mx-2 my-2">
        <v-col cols="12">
          <h3>Create an api token</h3>
          <v-alert class="mt-4" dense outlined text type="info">
            You can use any of the generated token to make api calls to our send
            mail endpoint, add it to the authorization header as a bearer token
          </v-alert>
          <v-text-field label="Enter token name" v-model="name"></v-text-field>
          <v-btn :disabled="!name" @click="createToken"> Create token </v-btn>
        </v-col>
      </v-row>
      <v-data-table
        :items="token"
        :headers="headers"
        :items-per-page="50"
        :footer-props="{
          itemsPerPageOptions: [25, 50],
        }"
        :loading="loading"
      >
        <template v-slot:[`item.action`]="{ item }">
          <v-btn small color="error" @click="openDeleteTokenDialog(item.id)"
            >Remove</v-btn
          >
          <v-btn small color="primary" class="ml-4" @click="copyToken(item.id)"
            >Copy</v-btn
          >
        </template>
        <template v-slot:[`item.token`]="{ item }">
          <input
            class="form-control col-md-8 col-8"
            type="text"
            :value="item.token"
            readonly
            :ref="`copy-${item.id}`"
          />
        </template>
      </v-data-table>
    </v-card>
    <Dialog
      message="Removing this token will revoke access of any app using it, are you sure you want to do this?"
      :isOpen="isDialogOpen"
      :closeCallback="closeDialog"
      :actionCallback="deleteToken"
    />
  </div>
</template>
<script>
import _ from "lodash";
import Dialog from "@/components/Dialog";

export default {
  components: {
    Dialog,
  },
  data() {
    return {
      loading: false,
      isDialogOpen: false,
      name: "",
      tokenToDeleteId: null,
      headers: [
        { text: "Name", value: "name" },
        { text: "Token", value: "token" },
        { text: "", value: "action" },
      ],
      breadcrumbs: [
        {
          text: "Token",
          disabled: true,
          href: "",
        },
      ],
    };
  },
  created() {
    this.fetchToken();
  },
  computed: {
    token() {
      return this.$store.getters["token/get"];
    },
  },
  methods: {
    copyToken(id) {
      const link = this.$refs[`copy-${id}`];
      link.select();
      link.setSelectionRange(0, 99999);
      document.execCommand("copy");
      this.$notify({
        group: "notification",
        type: "success",
        text: "Token was copied successfully",
      });
    },
    fetchToken() {
      this.loading = true;
      this.$store
        .dispatch("token/fetch")
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    createToken() {
      this.loading = true;
      const payload = {
        name: this.name,
      };
      this.$store
        .dispatch("token/create", payload)
        .then(() => {
          this.loading = false;
          this.name = "";
          this.fetchToken();
        })
        .catch(() => {
          this.loading = false;
        });
    },
    openDeleteTokenDialog(id) {
      this.tokenToDeleteId = id;
      this.isDialogOpen = true;
    },
    closeDialog() {
      this.tokenToDeleteId = null;
      this.isDialogOpen = false;
    },
    deleteToken() {
      this.loading = true;
      this.isDialogOpen = false;
      this.$store
        .dispatch("token/delete", this.tokenToDeleteId)
        .then(() => {
          this.tokenToDeleteId = null;
          this.loading = false;
          this.fetchToken();
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>
