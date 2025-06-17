import { MedRepositoryInterface } from '../../domain/repositories/med.repository.interface';
import { MedEntity } from '../../domain/entities/med.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Med } from '../persistence/med.schema';
import { plainToInstance } from 'class-transformer';
import { CommonUtil } from 'src/common/presentation/utils/common.util';

export class MedRepository implements MedRepositoryInterface {
  constructor(
    @InjectModel('Med')
    private readonly medModel: Model<Med>,
  ) {}

  async save(med: MedEntity): Promise<MedEntity> {
    const createdMed = new this.medModel(med);

    const savedMed = await createdMed.save();
    return this.mapToEntity(savedMed);
  }

  async findById(id: string): Promise<MedEntity | null> {
    // แปลง id ที่รับเข้ามาให้เป็น ObjectId ก่อนใช้ในการค้นหา
    if (!Types.ObjectId.isValid(id)) {
      return null; // หรือสามารถโยนข้อผิดพลาดกลับไปได้เช่นกัน
    }
    const objectId = new Types.ObjectId(id);
    const med = await this.medModel.findById(objectId).exec();
    return med ? this.mapToEntity(med) : null;
  }

  async findByName(name: string): Promise<MedEntity | null> {
    const med = await this.medModel.findOne({ name }).exec();
    return med ? this.mapToEntity(med) : null;
  }

  async findAllPaginated(
    page: number,
    limit: number,
    sortBy: string,
    sortType: string,
    keyword: string,
    companyId: string,
  ): Promise<{ data: MedEntity[]; totalCount: number }> {
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
    const totalCount = await this.medModel.countDocuments(filter);

    const meds = await this.medModel
      .find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .exec();
    
    return {
      data: meds.map((t) => this.mapToEntity(t)),
      totalCount,
    };
  }

  async count(): Promise<number> {
    return this.medModel.countDocuments().exec();
  }

  async update(med: MedEntity): Promise<MedEntity> {
    const updatedMed = await this.medModel.findByIdAndUpdate(med.id, med);

    return this.mapToEntity(updatedMed);
  }

  async delete(id: string): Promise<void> {
    await this.medModel.findByIdAndDelete(id);
  }

  private mapToEntity(med: any): MedEntity {
    const plainObject = med.toObject();
    const entity = plainToInstance(MedEntity, plainObject, {
      excludeExtraneousValues: true,
    });

    return entity;
  }
}
