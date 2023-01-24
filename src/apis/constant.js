const userPrefix = "/user";
const hospitalPrefix = "/hospital";
const writerPrefix = "/writer";
const doctorPrefix = '/doctor';
const receptionistPrefix = '/receptionist'
const adminTranscription = '/admin/transcript-list'

export const USER = {
  LIST: userPrefix,
  SAVE: userPrefix,
  UPDATE: `${userPrefix}/:id`,
  SHOW: `${userPrefix}/:id`,
  DELETE: `${userPrefix}/:id`,
};

export const HOSPITAL = {
  LIST: hospitalPrefix,
  SAVE: hospitalPrefix,
  UPDATE: `${hospitalPrefix}/:id`,
  SHOW: `${hospitalPrefix}/:id`,
  DELETE: `${hospitalPrefix}/:id`,
  ASSIGN: `${hospitalPrefix}/assign-list`,
};

export const TRANSCRIPTION = {
  LIST: writerPrefix,
  LIST_AUDIO: `${writerPrefix}/audio-list`,
  SAVE: `${writerPrefix}/:id`,
  UPDATE: `${writerPrefix}/:id`,
  SHOW: `${writerPrefix}/:id`,
  DELETE: `${writerPrefix}/:id`,
  AUDIO_Delete: `/doctor/:id`,
};



export const DOCTOR = {
  LIST: doctorPrefix,
  LIST_HOSPITAL: `${doctorPrefix}/hospital-list`,
  LIST_SCRIPT: `${doctorPrefix}/script-list`,
  CONFIRM: `${doctorPrefix}/confirmed-transcripting/:id`,
  DOWNLOAD: `${doctorPrefix}/pdf-data`,
  SAVE: `${doctorPrefix}/:id`,
  UPDATE: `${doctorPrefix}/:id`,
  SHOW: `${doctorPrefix}/:id`,
  DELETE: `${doctorPrefix}/:id`,
};

export const RECEPT = {
  LIST_HOSPITAL: `${receptionistPrefix}/hospital-list`,
  LIST_SCRIPT: `${receptionistPrefix}/:id`,
  DOWNLOAD: `${receptionistPrefix}/pdf-data`,
};

export const ADMIN_TRANS = {
  LIST: adminTranscription,
}
