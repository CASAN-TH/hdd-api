import { StoreEntity } from '../entities/store.entity';

export interface StoreRepositoryInterface {
  // บันทึกข้อมูลใหม่
  save(store: StoreEntity): Promise<StoreEntity>;

  // ค้นหาโดยใช้ ID
  findById(id: string): Promise<StoreEntity | null>;

  // ค้นหาโดยใช้ Name
  findByName(name: string): Promise<StoreEntity | null>;

  // ดึงข้อมูลทั้งหมด (แบบแบ่งหน้า)
  findAllPaginated(
    page: number,
    limit: number,
    sortBy: string,
    sortType: string,
    keyword: string,
    companyId: string,
  ): Promise<{ data: StoreEntity[]; totalCount: number }>

  // นับจำนวนทั้งหมด
  count(): Promise<number>;

  // อัปเดตข้อมูล
  update(store: StoreEntity): Promise<StoreEntity>;

  // ลบตาม ID
  delete(id: string): Promise<void>;
}
