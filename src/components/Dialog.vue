<template>
  <v-row>
    <v-dialog class="mx-0 px-0" v-model="isOpen" persistent width="900px">
      <v-card class="w-100">
        <v-row class="px-4 py-4 mx-0 w-100">
          <v-col class="justify-content-center flex">
            <p>{{ message }}</p>
            <div class="button py-4 px-4 float-right">
              <v-btn
                color="error"
                tag="button"
                class="cy-yes btn"
                @click="actionCallback"
                >Yes</v-btn
              >
              <v-btn
                color="primary"
                tag="button"
                class="btn ml-2"
                @click="closeCallback"
                >No</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      isRequired: true,
    },
    message: {
      type: String,
      isRequired: true,
    },
    closeCallback: {
      type: Function,
      isRequired: true,
    },
    actionCallback: {
      type: Function,
      isRequired: true,
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss"></style>
