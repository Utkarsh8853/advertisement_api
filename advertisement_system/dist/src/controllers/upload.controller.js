"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        // Specify the destination folder where the uploaded files will be stored
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        // Generate a unique filename for the uploaded file
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `file${file.fieldname}-${uniqueSuffix}.txt`);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
exports.default = upload;
// import multer from 'multer'
// //multer
// export const upload = multer({
//     storage:multer.diskStorage({
//         destination:function(req,file,cb){
//             cb(null,"uploads")
//         },
//         filename:function(req,file,cb){
//             cb(null,file.originalname)
//         }
//     })
// }).single("profile");
// export const caller=(req:Request,res:Response,next:()=>void)=>{
//     console.log(req.body)
// }
