const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const showController = require("../controllers/show");
const uploadController = require("../controllers/upload");
const upload = require("../middleware/upload");
const upload0 = require("../middleware/upload0");
const upload1 = require("../middleware/upload1");
const isAdmin = require("../middleware/isAdmin")


let routes = (app) => {

  // ===============================================
  // ================= USER ========================
  // ===============================================

  router.get("/",isAdmin.isUser, homeController.getHomeUser);

  router.get("/login", homeController.getLogin);

  router.post("/login", upload.single("file"), homeController.postLogin);

  router.get("/register", homeController.getRegister);

  router.post("/register", upload.single("file"), homeController.postRegister);

  router.get("/form",isAdmin.isUser, homeController.getForm);

  router.post("/form",isAdmin.isUser, upload.array("file", 10), homeController.postForm);

  router.get("/delete/:id" , homeController.getUserDelete);

  router.get("/table",isAdmin.isUser, homeController.getTable);

  // ===============================================
  // ================ ADMIN ========================
  // ===============================================

  router.get("/admin/", isAdmin.isAdmin, homeController.getHome);

  router.get("/admin/login", homeController.getAdminLogin);

  router.post("/admin/login", upload.single("file"), homeController.postAdminLogin);

  router.get("/admin/register", homeController.getAdminRegister);

  router.post("/admin/register", upload.single("file"), homeController.postAdminRegister);

  router.get("/admin/formUser", homeController.getFormUser);

  router.post("/admin/formUser", upload.single("file"), homeController.postFormUser);

  router.get("/admin/tableUser", homeController.getTableUser);

  router.get("/admin/deleteUser/:id", homeController.getDeleteUser);

  router.get("/admin/formDoctor", homeController.getFormDoctor);

  router.post("/admin/formDoctor",upload.single("file"), homeController.postFormDoctor);

  router.get("/admin/tableDoctor", homeController.getTableDoctor);

  router.get("/admin/deleteDoctor/:id", homeController.getDeleteDoctor);

  router.get("/admin/traning", homeController.getTraning);

  router.get("/admin/traning/train", homeController.postTraning);
  
  router.post("/admin/traning/upload0", upload0.array("file", 10), homeController.postTraningUpload0);

  router.post("/admin/traning/upload1", upload1.array("file", 10), homeController.postTraningUpload1);

  // ===============================================
  // =============== DOCTOR ========================
  // ===============================================

  router.get("/doctor/", isAdmin.isDoctor, homeController.getHoneDoctor);

  router.get("/doctor/form", homeController.getDoctorForm);

  router.get("/doctor/table", homeController.getDoctorTable);

  router.get("/doctor/check/:array", homeController.getDoctorCheck);

  router.post("/doctor/edit", upload.single("file"), homeController.getDoctorEdit);

  router.get("/doctor/delete/:id", homeController.getDoctorDelete);



  router.get("/updata", homeController.getUpdata);

  router.get("/edit", homeController.getEdit);

  // router.get("/delete", homeController.getDelete);


  router.get("/python", upload.single("file"), homeController.getPython);

  // hien anh
  router.get("/show", showController.showImage);

  // hien form up anh
  router.get("/upload", uploadController.getIndex);
  
  // post anh len db 
  router.post("/upload", upload.array("file", 10), uploadController.uploadFiles);

  router.get("/logout", homeController.getLogout)

  return app.use("/", router);
};

module.exports = routes;
