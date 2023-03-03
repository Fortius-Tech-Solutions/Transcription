import { boot } from "quasar/wrappers";
import { LocalStorage } from "quasar";
import Notify from "boot/notification";

export default boot(({ router }) => {
  router.beforeEach((to, from, next) => {
    if (LocalStorage.getItem("roles") == 'Doctor'
    ) {
      return next({
        name: "writer-dashboard",
      });
    } else if (
      LocalStorage.getItem("roles") == 'Writer'
    ) {
      return next({
        name: "doctor-dashboard",
      });
    } else {
      return next({
        name: "home",
      });
    }
    // next();
  });
});
