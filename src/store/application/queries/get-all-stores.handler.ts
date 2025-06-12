import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllStoresQuery } from './get-all-stores.query';
import { StoreRepositoryInterface } from '../../domain/repositories/store.repository.interface';
import { Inject } from '@nestjs/common';
import { StoreEntity } from '../../domain/entities/store.entity';
import { PaginatedResponseDto } from 'src/common/presentation/dtos/paginated-response.dto';

@QueryHandler(GetAllStoresQuery)
export class GetAllStoresHandler
  implements IQueryHandler<GetAllStoresQuery>
{
  constructor(
    @Inject('StoreRepository')
    private readonly storeRepository: StoreRepositoryInterface,
  ) {}

  async execute(
    query: GetAllStoresQuery,
  ): Promise<PaginatedResponseDto<StoreEntity>> {
    const { page, limit, sortBy, sortType, keyword, queryBy } = query;

    // คำนวณและดึงรายการผู้สมัครงานตาม page และ limit
    const stores = await this.storeRepository.findAllPaginated(
      page,
      limit,
      sortBy,
      sortType,
      keyword,
      queryBy.companySelected,
    );

    // ดึงจำนวนรายการทั้งหมด
    const totalItems = stores.totalCount;

    // ส่งข้อมูลแบบแบ่งหน้า
    return new PaginatedResponseDto(stores.data, totalItems, limit, page);
  }
}
