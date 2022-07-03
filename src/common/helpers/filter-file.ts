import { extname } from "path";

//Funcion para aeptar el tipo de extension en las imagenes
export const TypeFile = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};

//FUncionn para crear nombre de imagen unico
export const renameImages = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};