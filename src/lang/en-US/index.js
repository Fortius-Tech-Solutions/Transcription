import auth from "./auth.js";
import user from "./user.js";
import hospital from "./hospital.js";

export default {
  button: {
    create: "Add",
    cancel: "Cancel",
    submit: "Save",
    continue: "Continue",
  },
  authentication: auth,
  user: user,
  hospital: hospital,
  mainLayout: {
    profileDropdown: {
      label1: "Change Password",
      label2: "Change Two Factor",
      label3: "Sign out",
    },
    sidebar: {
      home: "Home",
      user: "Admin User Access Control",
      users: "Users",
      hospital: "Hospital",
      doctor: "Doctor",
      receptionist: "Receptionist",
      reports: "Reports",
      libraryReport: "Behavioral Library Report",
      login: "Patients Login Report",
      vibe: "Vibe O Meter",
      allVibe: "Vibe O Meter (All)",

    },
  },
  homepage: {
    list: {
      title1: "Name",
      title2: "Actions",
    },
  },
  create: {
    title1: "Edit/Update",
    title2: "Create",
  },
  wellness: {
    tips: "Wellness Tips",
    category: "Wellness Tips Category",
  },
  stress: {
    management: "Stress Management",
    category: "Stress Management Category",
    platform: "Platform Master",
  },
  quote: {
    title: "Inspiration of the Day",
  },
  music: {
    title: "Music as Therapy",
  },
  behavioral: {
    article: "Behavioral Article",
    category: "Behavioral Category",
  },
  riddle: {
    title: "Riddle",
  },
  doodle: {
    title: "Doodle",
  },
  vibe: {
    title: "Vibe O Meter",
  },
  readiness: {
    title: "Readiness Ruler",
  },
  phqQuestion: {
    title: "PHQ-9 Problems",
  },
  phqAnswer: {
    title: "PHQ-9 Answer",
  },
};
