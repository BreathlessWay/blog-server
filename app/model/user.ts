import { Application } from "egg";

export default (app: Application) => {
  const { Schema, model } = app.mongoose;

  const UserSchema = new Schema({
    userName: { type: String },
    password: { type: String }
  });

  return model("User", UserSchema);
};
