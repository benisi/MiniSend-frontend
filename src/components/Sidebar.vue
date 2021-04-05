<template>
  <div class="col-md-2 p-0 sidebar">
    <v-navigation-drawer
      v-model="drawer"
      :mobile-break-point="1200"
      app
      class="mx-0 px-0"
    >
      <v-row
        class="logo m-0 center-ver hide-on-mobile mt-2 hide-on-small-screens hide-on-medium-screens"
      >
        <v-col cols="10" class="px-0">
          <router-link to="/dashboard">
            <img
              class="img-fluid logo-img ml-4"
              src="@/assets/text-logo.png"
              alt="logo"
            />
          </router-link>
        </v-col>
        <v-btn
          class="hide-on-mobile-screens hide-on-small-screens hide-on-desktop"
          icon
          @click.stop="drawer = !drawer"
        >
          <font-awesome-icon
            icon="align-right"
            @click.stop="drawer = !drawer"
            class="text-mulled-wine"
          ></font-awesome-icon>
        </v-btn>
      </v-row>
      <div class="sidebar-menu-only">
        <div class="hide-on-desktop">
          <div class="user-info-mobile">
            <v-list class="center-ver">
              <v-list-item class>
                <v-list-item-avatar class>
                  <div class>
                    <span class="rounded-letter">{{
                      fullName.substring(0, 1) | firstLetterToUpper
                    }}</span>
                  </div>
                </v-list-item-avatar>
                <v-list-item-content class>
                  <v-list-item-title>
                    <span class="full-name">{{
                      truncateText(fullName, 20)
                    }}</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
          <!-- Sidebar menu list -->
          <v-list class="py-0">
            <template v-for="(item, key) in menuList">
              <div :key="key">
                <v-list-group
                  :key="item.title"
                  prepend-icon
                  append-icon
                  no-action
                  v-model="item.active"
                  class="menu-list-item group"
                  :class="highlightTitle[item.title] ? 'gin-bg' : ''"
                >
                  <template v-slot:activator class="menu-list-item">
                    <router-link :to="item.path">
                      <v-list-item
                        class="item-title"
                        v-model="item.active"
                        :class="
                          highlightTitle[item.title] ? 'highlight-title' : ''
                        "
                      >
                        <v-list-item-content>
                          <v-list-item-title>
                            <span class="menu-icon">
                              <font-awesome-icon
                                class
                                :icon="item.icon"
                              ></font-awesome-icon>
                            </span>
                            <span class="item-title">
                              {{ item.title }}
                            </span>
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </router-link>
                  </template>
                </v-list-group>
              </div>
            </template>
          </v-list>
        </div>

        <hr class="hide-on-desktop" />
        <div class="sign-out hide-on-desktop">
          <v-list-item class="menu-list-item" @click="logout">
            <v-list-item-content class>
              <v-list-item-title>
                <span class="menu-icon">
                  <font-awesome-icon
                    class
                    icon="sign-out-alt"
                    @click="logout"
                  ></font-awesome-icon>
                </span>
                <span class="sign-out-text">Sign Out</span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </div>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { eventBus } from "@/eventBus";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      drawer: true,
      mini: "",
      highlightTitle: {},
      route: document.location.href.split("//")[1],
    };
  },
  created() {
    this.handleResize();

    eventBus.$on("toggle-side-bar", () => {
      this.drawer = !this.drawer;
    });

    if (!this.route) {
      return;
    }
    this.setActiveMenuGroup(this.route);
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    },
    handleResize() {
      if (window.innerWidth <= 700) {
        this.mini = true;
        return;
      }
      this.mini = false;
    },
    truncateText(str, length, ending = null) {
      if (length == null) {
        length = 100;
      }
      if (ending == null) {
        ending = "...";
      }
      if (str.length > length) {
        return str.substring(0, length - ending.length) + ending;
      } else {
        return str;
      }
    },
    setActiveMenuGroup(route) {
      let fullPath = route.split("/");
      let matchedPath = "";
      for (let i = 1; i < fullPath.length; i++) {
        matchedPath += `/${fullPath[i]}`;
      }

      for (const menu in this.menuList) {
        if (this.menuList[menu].hasOwnProperty("items")) {
          for (const matched in this.menuList[menu]["items"]) {
            if (
              this.menuList[menu]["items"][matched].path == matchedPath ||
              matchedPath.includes(this.menuList[menu]["items"][matched].path)
            ) {
              this.menuList[menu].active = true;
              this.highlightTitle = {};
              this.highlightTitle[this.menuList[menu].title] = true;
              return;
            }
          }
        } else {
          if (matchedPath.includes(this.menuList[menu].path)) {
            this.menuList[menu].active = true;
            this.highlightTitle = {};
            this.highlightTitle[this.menuList[menu].title] = true;
            return;
          }
        }
      }
    },
  },
  watch: {
    $route() {
      this.route = document.location.href.split("//")[1];
      this.setActiveMenuGroup(this.route);
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
    menuList() {
      return [
        {
          icon: "th-large",
          title: "Dashboard",
          path: "/dashboard",
          exact: true,
          showInSidebar: true,
        },
        {
          icon: "suitcase",
          title: "Batches",
          path: "/batches",
          exact: true,
          showInSidebar: true,
        },
        {
          icon: "layer-group",
          title: "Mails",
          path: "/mails",
          exact: true,
          showInSidebar: true,
        },
        {
          icon: "money-check-alt",
          title: "Api Token",
          path: "/token",
          exact: true,
          showInSidebar: true,
        },
      ];
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/_variables.scss";

.logo-img.img-fluid {
  max-width: 80% !important;
}
.logo {
  height: 64px;
  background: $white;
  border-bottom: 1px solid $mystic;

  a.router-link-active,
  .img {
    display: inline-block !important;
    width: 100%;
    height: 100%;
  }

  .septa {
    margin-top: 18px;
    color: $red;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 0.06px;
    line-height: 24px;
    width: 62.13px;
  }
}
.menu-list {
  @media only screen and (max-width: 1199px) {
    padding: 20px 0;
  }
}
.hamburger {
  cursor: pointer;
}
.sign-out {
  padding: 0 6px;
}
.sign-out {
  .v-list-item {
    padding-left: 24px;
  }
  .sign-out-text {
    color: $persimmon;
    font-size: 14px;
    letter-spacing: 0.12px;
    line-height: 20px;
  }
}
.location-mobile {
  font-size: 10px;
  letter-spacing: 0.03px;
  line-height: 14px;
  padding: 7px 18px 7px 24px;
}
.location-info {
  height: 60px;
}
.v-avatar.v-list-item__avatar.location-icon {
  margin: 0;
  height: unset !important;
  min-width: unset !important;
  width: 30px !important;
  display: inline-block;
  border-radius: unset;

  .svg-inline--fa.fa-w-20 {
    align-content: center;
    color: $mulled-wine;
    height: 12px !important;
    min-width: unset !important;
    width: 15px !important;
  }
}
.location-info.v-list-item.theme--light {
  .v-list-item__icon {
    margin: 0;
    padding: 22px 0;

    .svg-inline--fa {
      height: 12px;
      width: 12px;
      color: $mulled-wine;
    }
  }
}
.location-info .title.location-name {
  color: $mulled-wine;
  font-size: 14px !important;
  letter-spacing: 0.03px !important;
  line-height: 14px !important;
  color: #48446f;
}
.theme--light.v-list-item .v-list-item__subtitle.location-address {
  margin-top: 5px;
  color: $amethyst-smoke;
  font-size: 12px !important;
  letter-spacing: 0.02px !important;
  line-height: 11px !important;
}
hr.location-info-divider {
  border-top: 2px solid $concrete;
  margin-top: 0;
}
.menu-icon {
  width: 30px;
  display: inline-block;
  color: $mulled-wine;
  opacity: 0.5;
}
.menu-list-item .v-list-item .item-title.highlight-title {
  .menu-icon {
    color: $mariner !important;
    opacity: 1;
  }
}
.v-list-group.menu-list-item.group.v-list-group--no-action {
  margin: 0 5px;
  @media only screen and (max-width: 1199px) {
    margin: 0;
  }
}
.v-application--is-ltr
  .v-list-group--no-action
  > .v-list-group__items
  > .v-list-item {
  padding-left: 58px;
}
.location-list {
  position: relative;
}
.show-locations {
  position: absolute;
  left: 400px;
}
.user-info-mobile {
  min-height: 100px;
  background-color: $mariner;
  padding: 10px 18px 10px 24px;

  .full-name {
    color: $white;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.04px;
    line-height: 20px;
  }
  .company-name {
    color: #fff;
    font-size: 12px;
    font-weight: 300;
    letter-spacing: 0.03px;
    line-height: 17px;
  }
}
.rounded-letter {
  align-content: center;
  padding: 50px;
  background-color: $mystic;
  border-radius: 50%;
  height: 50px;
  width: 50px;
}
.inline-block {
  display: inline-block !important;
}

.beta {
  display: inline-block;
  position: absolute;
  left: 20px;
  font-size: 9px;
  color: white;
  background: $tree-poppy;
  padding: 2px;
}

.bg {
  background-color: $mariner;
}
</style>
