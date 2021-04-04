<template>
  <div class="d-flex justify-content-between hide-on-print">
    <v-toolbar flat class="header header-row m-o">
      <div v-if="user" class="hide-hamburger-on-desktop hamburger">
        <font-awesome-icon
          @click.stop="toggleSideBar"
          icon="align-left"
        ></font-awesome-icon>
      </div>
      <v-spacer></v-spacer>
      <div class="hide-on-desktop">
        <router-link to="/">
          <img class="img-fluid mobile-logo" src="" alt="logo" to="/" />
        </router-link>
      </div>

      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-list class="p-0 user-profile hide-on-mobile">
          <v-list-item class="p-0 px-2 user-name" @click="toggleDropdown">
            <v-list-item-avatar>
              <div class>
                <span class="rounded-letter">
                  {{ fullName.substring(0, 1) | firstLetterToUpper }}
                </span>
              </div>
            </v-list-item-avatar>
            <v-list-item-content class="hide-on-mobile">
              <div class="nav-link text-primary hide-on-mobile">
                <v-list-item-title>
                  <span class="full-name">
                    {{ truncateText(fullName) | firstLetterToUpper }}
                  </span>
                </v-list-item-title>
              </div>
            </v-list-item-content>
            <font-awesome-icon
              class="header-icon hide-on-mobile"
              v-if="showActions"
              icon="chevron-up"
            ></font-awesome-icon>
            <font-awesome-icon
              class="header-icon hide-on-mobile"
              v-if="!showActions"
              icon="chevron-down"
            ></font-awesome-icon>
          </v-list-item>
          <div v-if="showActions" class="show-actions">
            <v-list class="p-0">
              <v-list-item
                class="user-profile-dropdown"
                to="/profile"
                @click="showActions = !showActions"
              >
                <v-list-item-avatar class="dropdown-icon">
                  <font-awesome-icon icon="user-alt"></font-awesome-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <span>View Profile</span>
                </v-list-item-content>
              </v-list-item>
              <v-list-item class="user-profile-dropdown" @click="logout">
                <v-list-item-avatar class="dropdown-icon">
                  <font-awesome-icon icon="power-off"></font-awesome-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <span>Sign Out</span>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
        </v-list>
        <v-list
          class="p-0 standalone-user-profile hide-on-medium-screens hide-on-desktop"
          to="/profile"
        >
          <v-list-item class="p-0">
            <v-list-item-avatar>
              <div>
                <span class="rounded-letter">{{
                  fullName.substring(0, 1) | firstLetterToUpper
                }}</span>
              </div>
            </v-list-item-avatar>
          </v-list-item>
        </v-list>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import { eventBus } from "@/eventBus";
import { mapGetters } from "vuex";
import { textTruncate } from "@/store/helpers";

export default {
  data() {
    return {
      drawer: null,
      showActions: false,
    };
  },
  methods: {
    toggleSideBar() {
      eventBus.$emit("toggle-side-bar");
    },
    truncateText(text) {
      return textTruncate(text, 20);
    },
    logout() {
      this.$store.dispatch("auth/logout");
    },
    toggleDropdown(event) {
      this.showActions = !this.showActions;
      event.stopPropagation();
    },
  },
  computed: {
    ...mapGetters({
      user: "auth/getUser",
    }),
    fullName() {
      if (!this.user) {
        return "";
      }
      return `${this.user.name}`;
    },
  },
  created() {
    window.onclick = (event) => {
      if (!event.target.matches(".show-actions")) {
        if (this.showActions) {
          this.showActions = false;
        }
      }
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";
$user-profile-width: 250px;
.header {
  background-color: $white !important;
  border-bottom: 1px solid $mystic !important;
  height: 76px;
  z-index: 1;
  position: relative;

  .header-title {
    color: $mulled-wine;
    font-size: 24px;
    font-weight: 500;
    line-height: 29px;
    text-align: left;
  }
}
.header-row {
  padding-left: 30px;
  padding-right: 45px;
  @media screen and (max-width: 768px) {
    padding: 0 !important;
  }
}
.hamburger {
  cursor: pointer;
}
.rounded-letter {
  align-content: center;
  padding: 50px;
  background-color: $mystic;
  border-radius: 50%;
  height: 50px;
  width: 50px;
}
.v-list-item {
  height: 100%;
}

.full-name {
  color: $mulled-wine;
  font-size: 14px;
  letter-spacing: 0.04px;
  line-height: 17px;
  text-transform: capitalize;
}
.show-actions {
  position: absolute;
  width: $user-profile-width;
  top: 70px;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.06);
}
.user-profile {
  width: $user-profile-width;
  padding: 0 10px;
  margin-bottom: 1px !important;
  position: relative;
  @media screen and (max-width: 600px) {
    width: unset;
    max-width: $user-profile-width;
  }
}
.v-list.user-profile.v-sheet.v-sheet--tile.theme--light {
  background-color: unset;
}
.user-profile-dropdown span {
  color: $mine-shaft;
  font-size: 14px;
  letter-spacing: 0.03px;
  line-height: 14px;
}
.standalone-user-profile .v-avatar.v-list-item__avatar {
  margin-right: unset;
}
.v-list-item__content .nav-link {
  padding: unset;
}
.dropdown-icon {
  color: $mulled-wine;
  width: 12px;
}
.no-top-margin {
  @media screen and (max-width: 768px) {
    margin-top: 0 !important;
    padding-top: 0 !important;
  }
}
.v-toolbar__content {
  padding: 4px 0 !important;
}
@media screen and (max-width: 600px) {
  .hide-on-mobile {
    display: none !important;
  }
  .mobile-padding {
    padding: 10px !important;
  }
  .mobile-spacing {
    float: right;
  }
}
.mobile-logo {
  width: 150px;
}

@media screen and (min-width: 1200px) {
  .hide-on-desktop {
    display: none !important;
  }
}
@media screen and (max-width: 600px) {
  .hide-on-mobile {
    display: none;
  }
}

@media screen and (max-width: 1200px) and (min-width: 600px) {
  .hide-on-medium-screens {
    display: none;
  }
}

.header {
  .user-profile-dropdown:not(:first-child) {
    border-top: 1px solid $mystic2;
  }
}
</style>
