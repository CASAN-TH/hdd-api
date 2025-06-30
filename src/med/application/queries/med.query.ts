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
        $group: {
          _id: "$storeID",
          medicineCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "stores", // ชื่อ collection stores ใน MongoDB
          localField: "_id",
          foreignField: "storeID",
          as: "storeInfo",
        },
      },
      { $unwind: "$storeInfo" },
      {
        $project: {
          _id: 0,
          storeID: "$_id",
          medicineCount: 1,
          storeName: "$storeInfo.storeName",
          building: "$storeInfo.building",
          floor: "$storeInfo.floor",
        },
      },
    ]);
  }
}
