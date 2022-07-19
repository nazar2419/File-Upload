const path = require('path');

const {StatusCodes} = require('http-status-codes');

const uploadProductImage = async(req, res) => {
  //check if file exists
  //check format
  //check size
  console.log(req.files);
  if(!req.files){
    throw new CustomError.BadRequestError('No file Upload');
  }

  const productImage = req.files.image;

  if(!productImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please Upload Image');
  }

  const maxSize = 1024 * 1024; // 1mb

  if(!productImage.size > maxSize) {
    throw new CustomError.BadRequestError('Please upload image smaller 1KB');
  }

  const imagePath = path.join(__dirname, '../public/uploads/'+`${productImage.name}`);
  await productImage.mv(imagePath);
  return res
    .status(StatusCodes.OK)
    .json({image:{src:`/uploads/${productImage.name}`}})
};


module.exports = {
  uploadProductImage,
}