const UploadService = require("../services/upload.service");

exports.uploadImage = async (req, res) => {
  try {
    const { MA_NTD, type } = req.body;
    const filename = req.file ? req.file.filename : null;

    const response = await UploadService.uploadImage(MA_NTD, type, filename);

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.uploadCV = async (req, res) => {
  try {
    const { MA_NLD } = req.params;
    const filename = req.file ? req.file.filename : null;
    const originalname = req.file.originalname;
    // console.log(SDT, MA_TTD);
    const response = await UploadService.upload_CV(MA_NLD,originalname, filename);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
