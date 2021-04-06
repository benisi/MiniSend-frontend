<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" divider="/"></v-breadcrumbs>
    <v-card class="mx-auto px-8 py-4" v-if="!loading">
      <v-card-text>
        <p class="display-1 text--primary">{{ mail.subject }}</p>
        <p class="faint my-0">
          From: {{ mail.sender_email }}&#60;{{ mail.sender_name }}&#62;
        </p>
        <p class="faint my-0">To: {{ mail.email }}&#60;{{ mail.name }}&#62;</p>
        <p class="faint my-0 mb-4">
          Date: {{ mail.created_at | dateTimeFilter }}
        </p>
        <hr />
        <div class="text--primary mt-8" v-if="mail.text">
          {{ mail.text }}
        </div>
        <div
          class="text--primary mt-8"
          v-if="mail.html"
          v-html="scriptStrippedHtml"
        ></div>
      </v-card-text>
    </v-card>
    <div v-if="attachmentData">
      <span
        v-for="attachment in attachmentData"
        :key="attachment.filename"
        class="ml-4 mt-4 px-4 py-4 attachment"
        @click="downloadBase64Data(attachment.content, attachment.filename)"
      >
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
              <font-awesome-icon
                icon="paperclip"
                class="mr-4"
              ></font-awesome-icon>
              {{ attachment.filename }}
            </span>
          </template>
          <span>click to download</span>
        </v-tooltip>
      </span>
    </div>
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
    attachmentData() {
      if (this.mail && this.mail.attachments) {
        return JSON.parse(this.mail.attachments);
      }
      return null;
    },
    scriptStrippedHtml() {
      const html = this.mail.html;
      if (html) {
        const div = document.createElement("div");
        div.innerHTML = html;
        const scripts = div.getElementsByTagName("script");
        let scriptCount = scripts.length;
        while (scriptCount--) {
          scripts[scriptCount].parentNode.removeChild(scripts[scriptCount]);
        }
        return div.innerHTML;
      }
      return null;
    },
  },
  methods: {
    downloadBase64Data(content, filename) {
      const signatures = {
        JVBERi0: "application/pdf",
        R0lGODdh: "image/gif",
        R0lGODlh: "image/gif",
        iVBORw0KGgo: "image/png",
      };

      let selectedSignature = null;

      for (let signature in signatures) {
        if (content.indexOf(signature) === 0) {
          selectedSignature = signatures[signature];
        }
      }

      if (!selectedSignature) {
        this.$notify({
          group: "notification",
          type: "info",
          text: "We don't currently support downloading this file type",
        });

        return;
      }
      const base64URL = `data:${selectedSignature};base64,${content}`;
      const element = document.createElement("a");
      element.setAttribute("href", base64URL);
      element.setAttribute("download", filename);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
  },
};
</script>
<style scoped lang="scss">
@import "@/styles/_variables.scss";

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

.attachment {
  display: inline-block;
  cursor: pointer;
  color: $mariner2;
}
</style>
