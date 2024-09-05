// import { model, Schema } from "mongoose";
// import { TService } from "./service.interface";

// const serviceSchema = new Schema<TService>(
//   {
//     name: { type: String, required: true },
//     description: { type: String, required: true },
//     price: { type: Number, required: true },
//     duration: { type: Number, required: true },
//     isDeleted: { type: Boolean, default: false },
//   },
//   {
//     timestamps: true,
//   }
// );

// const ServiceModel = model<TService>("service", serviceSchema);
// export default ServiceModel;

import { model, Schema } from "mongoose";
import { TService } from "./service.interface";

const serviceSchema = new Schema<TService>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true }, // duration in minutes
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const ServiceModel = model<TService>("Service", serviceSchema);
export default ServiceModel;
