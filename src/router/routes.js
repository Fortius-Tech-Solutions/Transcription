function masterRoutes(path, pathname, folder, createFile, dashboardFile) {
  return {
    path: `/${path}`,
    meta: {
      requiresAuth: true,
      transition: "slide-right",
    },
    children: [
      {
        path: "",
        name: `${pathname}-dashboard`,
        component: () =>
          import(
            /* webpackChunkName:  "[request]" */
            /* webpackMode: "lazy" */
            /* webpackInclude: /\.vue$/ */
            `src/pages/${folder}/${dashboardFile}.vue`
          ),
      },
      {
        path: "create",
        name: `create-${pathname}`,
        component: () =>
          import(
            /* webpackChunkName:"[request]" */
            /* webpackMode: "lazy" */
            /* webpackInclude: /\.vue$/ */
            `src/pages/${folder}/${createFile}.vue`
          ),
        meta: {
          requiresAuth: true,
          transition: "slide-left",
        },
      },
      {
        path: "edit/:slug",
        name: `edit-${pathname}`,
        component: () =>
          import(
            /* webpackChunkName: "[request]" */
            /* webpackMode: "lazy" */
            /* webpackInclude: /\.vue$/ */
            `src/pages/${folder}/${createFile}.vue`
          ),
        meta: {
          requiresAuth: true,
          transition: "slide-left",
        },
      },
    ],
  };
}

function reportRoutes(path, pathname, folder, dashboardFile) {
  return {
    path: `/${path}`,
    meta: {
      requiresAuth: true,
      transition: "slide-right",
    },
    children: [
      {
        path: "",
        name: `${pathname}-dashboard`,
        component: () =>
          import(
            /* webpackChunkName:  "[request]" */
            /* webpackMode: "lazy" */
            /* webpackInclude: /\.vue$/ */
            `src/pages/${folder}/${dashboardFile}.vue`
          ),
      },
    ],
  };
}

const routes = [
  {
    path: "/",
    component: () =>
      import(
        /* webpackChunkName: "default-layout" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        "layouts/DefaultLayout.vue"
      ),
    children: [
      {
        path: "/",
        name: "sign-in",
        component: () =>
          import(
            /* webpackChunkName: "sign-in" */
            /* webpackMode: "lazy" */
            /* webpackInclude: /\.vue$/ */
            "src/pages/auth/LoginPage.vue"
          ),
        meta: {
          requireGuest: true,
        },
      },


    ],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      // User Routes
      masterRoutes("user", "user", "user", "CreateUserPage", "UserDashboard"),
      // Hospital Routes
      masterRoutes("hospital", "hospital", "hospital", "CreateHospitalPage", "HospitalDashboard"),
      // Transcription Routes
      masterRoutes("transcription", "transcription", "transcription", "CreateTranscriptionPage", "TranscriptionDashboard"),
      {
        path: "/",
        name: "home",
        component: () =>
          import(
            /* webpackChunkName: "home" */
            /* webpackMode: "lazy" */
            /* webpackInclude: /\.vue$/ */
            "src/pages/HomePage.vue"
          ),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/change-password",
        name: "change-password",
        component: () =>
          import(
            /* webpackChunkName: "change-password" */
            /* webpackMode: "lazy" */
            /* webpackInclude: /\.vue$/ */
            "src/pages/auth/ChangePassword.vue"
          ),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/writer-dashboard",
        name: "writer-dashboard",
        component: () =>
          import(
            /* webpackChunkName: "writer-dashboard" */
            /* webpackMode: "lazy" */
            /* webpackInclude: /\.vue$/ */
            "src/pages/writer/writer-dashboard.vue"
          ),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/doctor-dashboard",
        name: "doctor-dashboard",
        component: () =>
          import(
            /* webpackChunkName: "doctor-dashboard" */
            /* webpackMode: "lazy" */
            /* webpackInclude: /\.vue$/ */
            "src/pages/doctor/doctor-dashboard.vue"
          ),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/:slug",
        name: "component",
        component: () =>
          import(
            /* webpackChunkName: "[request]"  */
            /* webpackMode: "lazy" */
            /* webpackInclude: /\.vue$/ */
            "src/pages/dynamicComponents.vue"
          ),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/audio-list/:slug",
        name: "audio-list",
        component: () =>
          import(
            /* webpackChunkName: "audio-list" */
            /* webpackMode: "lazy" */
            /* webpackInclude: /\.vue$/ */
            "src/pages/writer/audioList.vue"
          ),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/write-script/:slug",
        name: "write-script",
        component: () =>
          import(
            /* webpackChunkName: "write-script" */
            /* webpackMode: "lazy" */
            /* webpackInclude: /\.vue$/ */
            "src/pages/writer/writeScript.vue"
          ),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/script-view",
        name: "script-view",
        component: () =>
          import(
            /* webpackChunkName: "script-view" */
            /* webpackMode: "lazy" */
            /* webpackInclude: /\.vue$/ */
            "src/pages/transcription/script-view.vue"
          ),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/confirm-transcript/:slug",
        name: "confirm-transcript",
        component: () =>
          import(
            /* webpackChunkName: "confirm-transcript" */
            /* webpackMode: "lazy" */
            /* webpackInclude: /\.vue$/ */
            "src/pages/doctor/confirmTranscription.vue"
          ),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/confirm-script/:slug",
        name: "confirm-script",
        component: () =>
          import(
            /* webpackChunkName: "write-script" */
            /* webpackMode: "lazy" */
            /* webpackInclude: /\.vue$/ */
            "src/pages/writer/writeScript.vue"
          ),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "transcription/:slug",
        name: "transcription-list",
        component: () =>
          import(
            /* webpackChunkName: "transcription" */
            /* webpackMode: "lazy" */
            /* webpackInclude: /\.vue$/ */
            "src/pages/receptionist/listScript.vue"
          ),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },


  // Always leave this as last one,
  // but you can also remove it

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
