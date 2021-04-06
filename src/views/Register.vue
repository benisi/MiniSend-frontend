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
            <v-card class="py-8">
              <v-row>
                <v-col cols="10" offset="1">
                  <v-form
                    ref="form"
                    v-model="isFormValid"
                    @submit.prevent="register"
                  >
                    <h4 class="pb-5">Register on MiniSend</h4>
                    <v-text-field
                      v-model="email"
                      label="Email Address"
                      :rules="rules.email"
                      required
                      ref="email"
                    />
                    <v-text-field
                      v-model="fullName"
                      label="Fullname"
                      :rules="rules.fullname"
                      required
                    />
                    <v-text-field
                      v-model="password"
                      label="Password"
                      :rules="rules.password"
                      required
                      type="password"
                    />
                    <v-text-field
                      v-model="passwordConfirmation"
                      label="Confirm
                    Password"
                      :rules="[
                        (v) =>
                          (v && v === password) ||
                          'Confirm password and password don\'t match',
                      ]"
                      required
                      type="password"
                    />
                    <v-btn
                      class="register-btn mt-3 text-none"
                      :disabled="!isFormValid || (formDirty && !isFormValid)"
                      type="submit"
                      >Register</v-btn
                    >
                  </v-form>
                </v-col>
                <v-col cols="10" offset="1" class="login">
                  Already registered?
                  <router-link to="/login">Login</router-link>
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
      fullName: "",
      passwordConfirmation: "",
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
        fullName: [(v) => (v && v.trim().length > 0) || "Fullname is required"],
      },
      isFormValid: false,
      formDirty: false,
    };
  },
  mounted() {
    this.$refs.email.focus();
  },
  methods: {
    async register() {
      if (this.$refs.form.validate()) {
        eventBus.$emit("show-loader", "Registering...");

        let response = await this.$store.dispatch("auth/register", {
          email: this.email,
          password: this.password,
          password_confirmation: this.passwordConfirmation,
          name: this.fullName,
        });
        if (response && response.data) {
          eventBus.$emit("hide-loader");
          if (response.data.data.token) {
            this.$notify({
              group: "notification",
              type: "success",
              text: "Registration was successful",
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
    password_confirmation(newVal, oldVal) {
      if (newVal != oldVal) {
        this.formDirty = true;
      }
    },
    fullName(newVal, oldVal) {
      if (newVal != oldVal) {
        this.formDirty = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

.register-btn {
  background-color: $mariner2 !important;
  color: $white;
  width: 100%;
}
</style>
