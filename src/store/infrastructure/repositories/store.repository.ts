import { StoreRepositoryInterface } from '../../domain/repositories/store.repository.interface';
import { StoreEntity } from '../../domain/entities/store.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Store } from '../persistence/store.schema';
import { plainToInstance } from 'class-transformer';
import { CommonUtil } from 'src/common/presentation/utils/common.util';

export class StoreRepository implements StoreRepositoryInterface {
  constructor(
    @InjectModel('Store')
    private readonly storeModel: Model<Store>,
  ) {}

  async save(store: StoreEntity): Promise<StoreEntity> {
    const createdStore = new this.storeModel(store);

    const savedStore = await createdStore.save();
    return this.mapToEntity(savedStore);
  }

  async findById(id: string): Promise<StoreEntity | null> {
    // แปลง id ที่รับเข้ามาให้เป็น ObjectId ก่อนใช้ในการค้นหา
    if (!Types.ObjectId.isValid(id)) {
      return null; // หรือสามารถโยนข้อผิดพลาดกลับไปได้เช่นกัน
    }
    const objectId = new Types.ObjectId(id);
    const store = await this.storeModel.findById(objectId).exec();
    return store ? this.mapToEntity(store) : null;
  }

  async findByName(name: string): Promise<StoreEntity | null> {
    const store = await this.storeModel.findOne({ name }).exec();
    console.log('store', store);
    return store ? this.mapToEntity(store) : null;
  }

  async findAllPaginated(
    page: number,
    limit: number,
    sortBy: string,
    sortType: string,
    keyword: string,
    companyId: string,
  ): Promise<{ data: StoreEntity[]; totalCount: number }> {
    const skip = (page - 1) * limit;
    const sortOption: { [key: string]: 1 | -1 } = {
      [sortBy]: sortType === 'asc' ? 1 : -1,
    }; // การจัดเรียงตามฟิลด์ที่ระบุ

    const filter: any = { companyId: companyId};

    // Add keyword filter if provided
    if (keyword) {
      filter.$or = [
        {
          name: {
            $regex: CommonUtil.escapeRegExp(keyword),
            $options: 'i',
          },
        },
      ];
    }

    // Fetch total count
    const totalCount = await this.storeModel.countDocuments(filter);

    const stores = await this.storeModel
      .find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .exec();
    
    return {
      data: stores.map((t) => this.mapToEntity(t)),
      totalCount,
    };
  }

  async count(): Promise<number> {
    return this.storeModel.countDocuments().exec();
  }

  async update(store: StoreEntity): Promise<StoreEntity> {
    const updatedStore = await this.storeModel.findByIdAndUpdate(store.id, store);

    return this.mapToEntity(updatedStore);
  }

  async delete(id: string): Promise<void> {
    await this.storeModel.findByIdAndDelete(id);
  }

  private mapToEntity(store: any): StoreEntity {
    const plainObject = store.toObject();
    const entity = plainToInstance(StoreEntity, plainObject, {
      excludeExtraneousValues: true,
    });

    return entity;
  }
}
