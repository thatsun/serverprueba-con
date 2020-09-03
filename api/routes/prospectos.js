const express= require('express');
const router = express.Router();
const checkAuth=require('../middleware/check-auth');
const ProspectosController=require('../controllers/prospectos_controller');
//pendiente extirpar logica de almacenamiento
const upload = require('../middleware/upload');

const multipleUpload = async (req, res,next) => {
  try {
    await upload(req, res);
    

    if (req.files.length <= 0) {
      return res.send(`You must select at least 1 file.`);
    }

    console.log("archivos subidos");
    next(); 

  } catch (error) {
    console.log(error);

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.send("Too many files to upload.");
    }
    return res.send(`Error when trying upload many files: ${error}`);
  }
};



router.get('/:userId',checkAuth,ProspectosController.prospectos_get_by_userid);

router.get('/',checkAuth,ProspectosController.prospectos_get_all);

router.post("/",checkAuth,multipleUpload,ProspectosController.prospectos_add_prospecto);

router.get('/:Id',checkAuth,ProspectosController.prospectos_get_prospecto);

router.patch('/status',checkAuth,ProspectosController.prospectos_change_status);

router.patch('/:Id',checkAuth,ProspectosController.prospectos_edit_prospecto);

router.delete('/:Id',checkAuth,ProspectosController.prospectos_delete_prospecto);
module.exports = router;