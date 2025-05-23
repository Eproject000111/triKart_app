const multer  = require('multer')

module.exports = function(app,middlewareAuth){
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
      },
      filename: function (req, file, cb) {
        let uploadFile = file.originalname.split('.')
        let name = `${uploadFile[0]}-${Date.now()}.${uploadFile[uploadFile.length-1]}`
        cb(null, name)
      }
    })

    const upload = multer({ storage: storage })

    app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {  
        // req.files is array of `photos` files
      
        try{
          let files = req.files;
          if(!files.length){
            return res.status(400).json({ err:'Please upload an image', msg:'Please upload an image' })
          }
          let file = req.files[0]
          if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
              return res.json({"image" : file.filename}) 
          }
        }
        catch(error){
          return res.send(error.message)
        }
    })

}