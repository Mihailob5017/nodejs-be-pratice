/* 
Note: The reason why 'mongodb://localhost:27107/foodapp' was not working is beacuase 
since node v17.x you need to use 'mongodb://127.0.0.1:27017' instaed. The reason is currently 
unknown but it this helped resolve the problem
*/
export const MONGO_URI =
  "mongodb+srv://mixailo146:jsmv4183@cluster0.8yum2.mongodb.net/foodapp";
export const JWT_SECRET_KEY = "super-but-no-so-secret-key";
