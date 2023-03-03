import { boot } from "quasar/wrappers";
import { LocalStorage } from "quasar";
import Notify from "boot/notification";
import { useAuthStore } from "src/stores/auth";
const store = useAuthStore()
export default boot(({ router }) => {
  router.beforeEach((to, from, next) => {
    if (
      to.matched.some((record) => record.meta.requiresAuth) &&
      !LocalStorage.getItem("access_token")
    ) {
      console.log("not authenticated");
      Notify.error("You must be logged in to view this page.");
      return next({
        name: "sign-in",
      });
    } else if (
      to.matched.some((record) => record.meta.requireGuest) &&
      LocalStorage.getItem("access_token")
    ) {
      // console.log(to.name == "doctor-dashboard");
      if (JSON.parse(LocalStorage.getItem("roles")) == "Doctor "
      ) {
        console.log(LocalStorage.getItem("roles"));
        return next({
          name: "doctor-dashboard",
        });
      } else if (
        JSON.parse(LocalStorage.getItem("roles")) == "Writer"
      ) {
        console.log(JSON.parse(LocalStorage.getItem("roles")));
        return next({
          name: "writer-dashboard",
        });
      } else {
        console.log(JSON.parse(LocalStorage.getItem("roles")));
        return next({
          name: "home",
        });
      }
    } else {
      next();
    }
    // next();
  });
});
