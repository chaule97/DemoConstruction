const serverUrl = "http://nhokproxmen.pythonanywhere.com";

export default {
    getListUser: serverUrl + "/api/user/",
    createUser: serverUrl + "/api/user/",
    getListTeam: serverUrl + "/api/team/",
    createTeam: serverUrl + "/api/team/",
    getListProject: serverUrl + "/api/project/",
    createProject: serverUrl + "/api/project/",
    submitProcess: serverUrl + "/api/submit/",
    getListSubmit: serverUrl + "/api/submit/",
}