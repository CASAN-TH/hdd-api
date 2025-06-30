import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Med } from '../../infrastructure/persistence/med.schema';

@Injectable()
export class MedQuery {
  constructor(
    @InjectModel(Med.name) private readonly medModel: Model<Med>,
  ) {}

  async getMedicineCountByStore() {
return this.medModel.aggregate([
  {
    $lookup: {
      from: "stores",
      localField: "storeID",
      foreignField: "storeID",
      as: "storeInfo",
    },
  },
  { $unwind: "$storeInfo" },
  {
    $group: {
      _id: {
        storeID: "$storeID",
        storeName: "$storeInfo.storeName",
        building: "$storeInfo.building",
        floor: "$storeInfo.floor",
      },
      medicines: {
        $push: {
          id: "$_id",
        },
      },
      medicineCount: { $sum: 1 },
    },
  },
  { $unwind: "$medicines" },
  {
    $project: {
      id: "$medicines.id", // ✅ ได้ _id ของยาแต่ละตัว
      medicineCount: 1,
      storeID: "$_id.storeID",
      storeName: "$_id.storeName",
      building: "$_id.building",
      floor: "$_id.floor",
      _id: 0,
    },
  },
]);
  }
}
