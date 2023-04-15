
// const BASE_SERVER_URL = "http://portal.koreanika.ru:8080"
const BASE_SERVER_URL = "http://localhost:8080"
export const Endpoints={
    AUTH:{
        ME:BASE_SERVER_URL + "/me",
        AUPDATE_ATOKEN:BASE_SERVER_URL + "/token",
        RUPDATE_ATOKEN:BASE_SERVER_URL + "/api/refreshToken",
        LOGIN:BASE_SERVER_URL + "/auth"

    },
    API:{
        USER_ACIVITIES:BASE_SERVER_URL + "/api/allActivities",
        APP_START_TIME:BASE_SERVER_URL + "/api/getApplicationStart",
        APP_WORK_TIME:BASE_SERVER_URL + "/api/getApplicationWorkingTime",
        APP_MEM_INFO:BASE_SERVER_URL + "/api/getMemoryInfo",
        USERS_STATS: BASE_SERVER_URL + "/api/showUserStats",
        ALL_USERS: BASE_SERVER_URL + "/api/users/getAllUsers",
        USER_INFO: BASE_SERVER_URL + "/api/users/getUser/", //  /api/users/getUser/{id}
        USER_EDIT: BASE_SERVER_URL + "/api/users/editUser",
        GET_ALL_CALC_EVENTS: BASE_SERVER_URL + "/api/app/allCalcActivities ",
        FILTERED_CALC_EVENTS: BASE_SERVER_URL + "/api/app/calcActivityFilter",
        FILTERED_CALC_EVENTS_FILE: BASE_SERVER_URL + "/api/app/calcActivityFilterFile",
        UPDATE_FILES_ALL: BASE_SERVER_URL + "/api/updatefiles/allFiles",
        UPDATE_FILE_EDIT: BASE_SERVER_URL + "/api/updatefiles/editFileInfo/", // /api/updatefiles/editFileInfo/{id}
        UPDATE_FILE_DELETE: BASE_SERVER_URL + "/api/updatefiles/deleteFile/", // deleteFile/{id}
        UPDATE_FILE_UPLOAD: BASE_SERVER_URL + "/api/updatefiles/uploadFile",
        PRICES_FILES_ALL: BASE_SERVER_URL + "/api/pricelists/allFiles",
        PRICES_FILE_EDIT: BASE_SERVER_URL + "/api/pricelists/editFileInfo/", // /api/pricelists/editFileInfo/{id}
        PRICES_FILE_DELETE: BASE_SERVER_URL + "/api/pricelists/deleteFile/", // deleteFile/{id}
        PRICES_FILE_DOWNLOAD: BASE_SERVER_URL + "/api/pricelists/downloadFile/", ///api/pricelists/downloadFile/{fileName}
        PRICES_FILE_UPLOAD: BASE_SERVER_URL + "/api/pricelists/uploadFile",

        USER_OWN_INFO: BASE_SERVER_URL + "/api/getUserInfo",
        USER_OWN_EDIT_INFO: BASE_SERVER_URL + "/api/editOwnInfo",
        USER_CHANGE_OWN_PASSWORD: BASE_SERVER_URL + "/api/changeOwnPassword",

        REGISTER: BASE_SERVER_URL + "/register",
        FORGOT_PASSWORD: BASE_SERVER_URL + "/forgottenPassword",
        RESTORE_PASSWORD: BASE_SERVER_URL + "/resetPassword"
    }
}