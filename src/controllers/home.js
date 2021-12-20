const path = require("path");
const db = require("../models");
const spawn = require("await-spawn");
const { array } = require("../middleware/upload");

const Image = db.images;
const Admins = db.admins;
const Users = db.users;
const UserImage = db.userimage;


// ve ra view home
  // ===============================================
  // ================= USER ========================
  // ===============================================

  const homeUser = (req, res) => {
    return res.render(path.join(`${__dirname}/../views/index`));
  };

  const getLogin = (req, res) => {
    return res.render(path.join(`${__dirname}/../views/login`));
  }
  
  const postLogin = async (req, res) => {
    // console.log(req);
    const users = await Users.findAll({
      where: {phone: req.body.phone}
    })
  
    if(users.length)
      if (users[0].password == req.body.password) {
        req.session.User = {
          username: users[0].phone,
        }
          return res.redirect("/");
      }
      return res.render(path.join(`${__dirname}/../views/login`), { err_msg: "Tài khoản hoặc mật khẩu không đúng" });
  
  }
  
  const getRegister = (req, res) => {
    return res.render(path.join(`${__dirname}/../views/register`));
  }
  
  const postRegister = async (req, res) => {
    await Users.create({
      phone: req.body["phone"],
      password: req.body["password"],
      email: req.body["email"],
      name: req.body["name"],
      cmnd: req.body["cmnd"],
    })
    return res.redirect("/login");
  }

  const form = (req, res) => {
    return res.render(path.join(`${__dirname}/../views/form`));
  };

  const postForm = async(req, res) => {
    // console.log(req.files)
    // console.log(req.session.User.username)
    try {
      for (const iterator of req.files) {
        const python = await spawn('python3.8', ['main.py', iterator.filename]);
          dataToSend = python.toString();
          await UserImage.create({
            phone: req.session.User.username,
            nameimage: iterator.filename,
            infer_ai: parseInt(dataToSend, 10)
          });
        }
      } catch (e) {
          console.log(e.stderr.toString())
        }

    return res.redirect(`back`);
    // return res.render(path.join(`${__dirname}/../views/form`));
  };

  const table = async (req, res) => {
    const data = await UserImage.findAll({
      where: {
        phone: req.session.User.username
      }
    });
    console.log(data)
    return res.render(path.join(`${__dirname}/../views/table`), {datas : data});
  };

  const userDelete = async (req, res) => {
    await UserImage.destroy({
      where: { id: req.params.id }
    });
    return res.redirect("back");
  };

  // ===============================================
  // ================ ADMIN ========================
  // ===============================================

const home = (req, res) => {
  return res.render(path.join(`${__dirname}/../views/admin/admin`));
};

const getAdminLogin = (req, res) => {
  return res.render(path.join(`${__dirname}/../views/admin/login`));
}

const postAdminLogin = async (req, res) => {
  // console.log(req);
  const users = await Admins.findAll({
    where: {username: req.body.username}
  })

  if(users.length)
    if (users[0].password == req.body.password) {
      req.session.User = {
        username: users[0].username,
        role: users[0].role
      }
      if (users[0].role == 1)
        return res.redirect("/admin");
      else if (users[0].role == 2)
        return res.redirect("/doctor");
    }
    return res.render(path.join(`${__dirname}/../views/admin/login`), { err_msg: "Tài khoản hoặc mật khẩu không đúng" });

}

const getAdminRegister = (req, res) => {
  return res.render(path.join(`${__dirname}/../views/admin/register`));
}

const postAdminRegister = async (req, res) => {
  await Admins.create({
    username: req.body.username,
    password: req.body.password,
    role: 2,
  })
  return res.redirect("/admin/login");
}

const formUser = (req, res) => {
  return res.render(path.join(`${__dirname}/../views/admin/formUser`));
};

const postFormUser = async(req, res) => {
  await Users.create({
    phone: req.body["val-phone"],
    password: req.body["val-password"],
    email: req.body["val-email"],
    name: req.body["val-username"],
    cmnd: req.body["val-cmnd"],
  })
  return res.render(path.join(`${__dirname}/../views/admin/formUser`), {err_msg: "Đã tạo tài khoản"});
};

const tableUser = async (req, res) => {
  const data = await Users.findAll();

  return res.render(path.join(`${__dirname}/../views/admin/tableUser`), {datas : data});
};

const deleteUser = async (req, res) => {
  await Users.destroy({
    where: { id: req.params.id }
  });
  return res.redirect("back");
};

const formDoctor = (req, res) => {
  return res.render(path.join(`${__dirname}/../views/admin/formDoctor`));
};

const postFormDoctor = async (req, res) => {
  await Admins.create({
    username: req.body["val-username"],
    password: req.body["val-password"],
    email: req.body["val-email"],
    role: 2,
  })
  return res.render(path.join(`${__dirname}/../views/admin/formDoctor`));
};

const tableDoctor = async (req, res) => {
  const data = await Admins.findAll();

  return res.render(path.join(`${__dirname}/../views/admin/tableDoctor`), {datas : data});
};

const deleteDoctor = async (req, res) => {
  await Admins.destroy({
    where: { id: req.params.id }
  });
  return res.redirect("back");
};

const traning = (req, res) => {
  return res.render(path.join(`${__dirname}/../views/admin/traning`));
}

const postTraning = async (req, res) => {
    try {
        const python = await spawn('python3.8', ['trainModels.py']);
      } catch (e) {
          console.log(e.stderr.toString())
        }

    return res.redirect(`back`);
}

const traningUpload0 = (req, res) => {
  return res.redirect(`back`);
}

const traningUpload1 = (req, res) => {  
  return res.redirect(`back`);
}

  // ===============================================
  // =============== DOCTOR ========================
  // ===============================================

  const homeDoctor = (req, res) => {
    return res.render(path.join(`${__dirname}/../views/doctor/index`));
  };

  const doctorForm = (req, res) => {

    return res.render(path.join(`${__dirname}/../views/doctor/form`));
  };
  
  const doctorTable = async (req, res) => {
    const data = await Image.findAll();
  
    return res.render(path.join(`${__dirname}/../views/doctor/table`), {datas : data});
  };

  const doctorEdit = async (req, res) => {
    // console.log(req);
    // await Admins.create({
    //   username: req.body.username,
    //   password: req.body.password,
    //   role: 1,
    // })
    let data = {}
    if(req.file)
      data.nameimage = req.file.filename;
    if(req.body.username)
      data.name = req.body.username;
    if(req.body.infer_doctor)
      data.infer_doctor = req.body.infer_doctor;
    console.log(data);
    await Image.update(data, {
      where : {id: req.body.id}
    })
    return res.redirect("/doctor/table");
  };

  const doctorDelete = async (req, res) => {
    await Image.destroy({
      where: { id: req.params.id }
    });
    const data = await Image.findAll();
    // res.send("123");
    return res.render(path.join(`${__dirname}/../views/doctor/table`), {datas : data});
  };

  const doctorCheck = async(req, res) => {
    const array = await req.params.array.split(",");
    console.log(array);
    // var dataToSend;
    try {
      for (const iterator of array) {
        const python = await spawn('python3.8', ['main.py', iterator]);
      //     console.log('Pipe data from python script ...');
      //     dataToSend = data.toString();
      //     console.log(dataToSend);
        dataToSend = python.toString();
          await Image.update({
            status: 1,
            infer_ai: parseInt(dataToSend, 10)
          }, {
            where: { nameimage: iterator }
          });
        }
      } catch (e) {
          console.log(e.stderr.toString())
        }
    // try {
    //   const bl = await spawn('venv\\Scripts\\python.exe', ['main.py', array[0]]);
    //   console.log(bl.toString())
    // } catch (e) {
    //   console.log(e.stderr.toString())
    // }

    return res.redirect(`back`);
  };



const updata = async (req, res) => {
  await Image.update({
    sick: parseInt(req.query.sick, 10)
  }, {
    where: { id: req.query.id }
  });

  return res.redirect("/table");;
};

const python = (req, res) => {

  var dataToSend;
 // spawn new child process to call the python script
 console.log(req)
  const python = spawn('python3.8', ['main.py',req.query.nameimage]);
 // collect data from script
  python.stdout.on('data', function (data) {
  console.log('Pipe data from python script ...');
  dataToSend = data.toString();
  });
 // in close event we are sure that stream from child process is closed
  python.on('close', (code) => {
  console.log(`child process close all stdio with code ${code}`);
 // send data to browser
  return res.redirect("/updata?id=" + req.query.id + "&sick=" + dataToSend);
 });
};

const getEdit = async (req, res) => {

  
  return res.redirect("/table");;
};

const getDelete = async (req, res) => {
  await Image.destroy({
    where: { id: req.query.id }
  });
  return res.redirect("/table");
};

const getLogout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
}


module.exports = {
  // user
  getHomeUser: homeUser,
  getForm: form,
  postForm: postForm,
  getTable: table,
  getUserDelete: userDelete,

  // admin
  getHome: home,  
  getAdminLogin: getAdminLogin,
  postAdminLogin: postAdminLogin,
  getAdminRegister: getAdminRegister,
  postAdminRegister: postAdminRegister,
  getFormUser: formUser,
  postFormUser: postFormUser,
  getTableUser: tableUser,
  getDeleteUser: deleteUser,

  getFormDoctor: formDoctor,
  postFormDoctor: postFormDoctor,
  getTableDoctor: tableDoctor,
  getDeleteDoctor: deleteDoctor,

  getTraning: traning,
  postTraning: postTraning,
  postTraningUpload0: traningUpload0,
  postTraningUpload1: traningUpload1,
  // doctor
  getHoneDoctor: homeDoctor,
  getDoctorForm: doctorForm,
  getDoctorTable: doctorTable,
  getDoctorCheck: doctorCheck,
  getDoctorEdit: doctorEdit,
  getDoctorDelete: doctorDelete,

  getPython: python,
  getUpdata: updata,
  getEdit,
  getDelete,
  getLogin,
  postLogin,
  getRegister,
  postRegister,

  getLogout
};
