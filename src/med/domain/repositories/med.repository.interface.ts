import { MedEntity } from '../entities/med.entity';

export interface MedRepositoryInterface {
  // บันทึกข้อมูลใหม่
  save(med: MedEntity): Promise<MedEntity>;

  // ค้นหาโดยใช้ ID
  findById(id: string): Promise<MedEntity | null>;

  // ค้นหาโดยใช้ Name
  findByName(name: string): Promise<MedEntity | null>;

  // ดึงข้อมูลทั้งหมด (แบบแบ่งหน้า)
  findAllPaginated(
    page: number,
    limit: number,
    sortBy: string,
    sortType: string,
    keyword: string,
    companyId: string,
  ): Promise<{ data: MedEntity[]; totalCount: number }>

  // นับจำนวนทั้งหมด
  count(): Promise<number>;

  // อัปเดตข้อมูล
  update(med: MedEntity): Promise<MedEntity>;

  // ลบตาม ID
  delete(id: string): Promise<void>;
}
