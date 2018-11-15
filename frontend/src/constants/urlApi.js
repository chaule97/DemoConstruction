//const serverUrl = "http://nhokproxmen.pythonanywhere.com";
//const serverUrl = "http://localhost:8002";
const serverUrl = window.location.host.includes('localhost')
	? 'http://localhost:8002'
	: `${window.location.protocol}//${window.location.host}`
export default {
  getListUser: serverUrl + "/api/user/",
  getSupervisors: serverUrl + "/api/supervisors/",
  createUser: serverUrl + "/api/user/",
  getListTeam: serverUrl + "/api/team/",
  createTeam: serverUrl + "/api/team/",
  getListProject: serverUrl + "/api/project/",
  createProject: serverUrl + "/api/project/",
  submitProcess: serverUrl + "/api/submit/",
  getListSubmit: serverUrl + "/api/submit/",
  login: serverUrl + "/api/login/",
  logout: serverUrl + "/api/logout/",
  adminLogin: serverUrl + "/api/admin/login/"
};
