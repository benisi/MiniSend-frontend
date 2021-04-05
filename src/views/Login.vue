<template>
  <div>
    <v-row class="login-form">
      <div class="col-md-4 offset-md-4">
        <v-row>
          <v-col cols="12">
            <img src="@/assets/text-logo.png" class="col-6 offset-3" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card class="login py-8">
              <v-row>
                <v-col cols="10" offset="1">
                  <v-form
                    ref="form"
                    v-model="isFormValid"
                    @submit.prevent="login"
                  >
                    <h4 class="pb-5">Login to Minisend</h4>
                    <v-text-field
                      v-model="email"
                      label="Email Address"
                      :rules="rules.email"
                      required
                      ref="email"
                    />
                    <v-text-field
                      v-model="password"
                      label="Password"
                      :rules="rules.password"
                      required
                      type="password"
                    />
                    <v-btn
                      class="login-btn mt-3 text-none"
                      :disabled="!isFormValid || (formDirty && !isFormValid)"
                      type="submit"
                      >Login</v-btn
                    >
                  </v-form>
                </v-col>
                <v-col cols="10" offset="1" class="register">
                  <router-link to="/register">Register</router-link>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-row>
  </div>
</template>

<script>
import { eventBus } from "@/eventBus";

export default {
  data() {
    return {
      email: "",
      password: "",
      rules: {
        email: [
          (v) => (v && v.trim().length > 0) || "Email is required",
          (v) => {
            return (
              // eslint-disable-next-line
              /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                v
              ) || "Email is invalid"
            );
          },
        ],
        password: [(v) => (v && v.trim().length > 0) || "Password is required"],
      },
      isFormValid: false,
      formDirty: false,
    };
  },
  mounted() {
    this.$refs.email.focus();
  },
  methods: {
    async login() {
      if (this.$refs.form.validate()) {
        eventBus.$emit("show-loader", "Logging in...");

        let response = await this.$store.dispatch("auth/login", {
          email: this.email,
          password: this.password,
        });

        if (response && response.data) {
          if (response.data.data.token) {
            this.$notify({
              group: "notification",
              type: "success",
              text: "Login successful",
            });

            let redirectTo = this.$route.query.redirect;
            if (redirectTo) {
              this.$router.push(redirectTo);
              return;
            } else {
              this.$router.push("dashboard");
            }
          }
        }
      }
    },
  },
  watch: {
    email(newVal, oldVal) {
      if (newVal != oldVal) {
        this.formDirty = true;
      }
    },
    password(newVal, oldVal) {
      if (newVal != oldVal) {
        this.formDirty = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

.login-btn {
  background-color: $mariner2 !important;
  color: $white;
  width: 100%;
}

.login-form {
  margin-top: 15vh;
  @media screen and (max-width: 600px) {
    margin-top: 5vh;
  }
}

.register {
  text-align: center;

  a {
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;

    &:hover {
      text-decoration: none;
    }
  }
}

.alt-login {
  text-align: center;
  color: $regent-gray;
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;

  p {
    color: $regent-gray;
    font-size: 16px;
    font-weight: 600;
    line-height: 19px;
    text-align: center;
  }

  .mdi {
    color: $regent-gray !important;
    margin-right: 10px;
    font-size: 24px;
    font-weight: 600px;
  }

  button {
    background-color: $white-lilac !important;
    border-radius: 3px;
    width: 150px;
    height: 36px;
  }

  .v-btn__content {
    justify-content: start !important;
  }
}

.login {
  box-shadow: 0 1px 3px 0 $mischka;

  h4 {
    color: $shark;
    font-size: 20px;
    font-weight: 500;
    line-height: 22px;
    text-align: left;
  }

  .v-label--active {
    color: $black !important;
  }
}
.text-none.google {
  color: $river-bed;
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  text-align: left;
}
</style>
