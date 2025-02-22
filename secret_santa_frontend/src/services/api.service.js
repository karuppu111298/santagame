import http from "../http-common";

class Auth {

  

  login(data) {
    return http.post("/login", data);
  }

  register(data) {
    return http.post("/register", data);
  }
  file_upload(data) {
    return http.post("/file_upload", data);
  }
  employee_assign_list(data) {
    return http.post("/employee_assign_list", data);
  }
  employee_assign_export(data) {
    return http.post("/employee_assign_export", data);
  }
}

export default new Auth();