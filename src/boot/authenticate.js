import { boot } from "quasar/wrappers";
import { LocalStorage } from "quasar";
import Notify from "boot/notification";
import { useAuthStore } from "src/stores/auth";
import { useMasterStore } from "src/stores/master";

const store = useAuthStore();
const master = useMasterStore();

export default boot(({ router }) => {
  router.beforeEach((to, from, next) => {
    const accessToken = LocalStorage.getItem("access_token");
    const roles = JSON.parse(LocalStorage.getItem("roles"));

    const redirectTo = (routeName) => next({ name: routeName });

    const checkRolesAndRedirect = () => {
      if (roles == "Doctor ") {
        return redirectTo("doctor-dashboard");
      } else if (roles == "Writer") {
        return redirectTo("writer-dashboard");
      } else {
        return redirectTo("home");
      }
    };

    if (to.matched.some((record) => record.meta.requiresAuth) && !accessToken) {
      Notify.error("You must be logged in to view this page.");
      return redirectTo("sign-in");
    } else if (to.matched.some((record) => record.meta.requireGuest) && accessToken) {
      return checkRolesAndRedirect();
    } else {
      if (to.name == "transcription-pdf" && master.getPdfData.length == 0) {
        return checkRolesAndRedirect();
      } else {
        next();
      }
    }
  });
});
