import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllMedsQuery } from './get-all-meds.query';
import { MedRepositoryInterface } from '../../domain/repositories/med.repository.interface';
import { Inject } from '@nestjs/common';
import { MedEntity } from '../../domain/entities/med.entity';
import { PaginatedResponseDto } from 'src/common/presentation/dtos/paginated-response.dto';

@QueryHandler(GetAllMedsQuery)
export class GetAllMedsHandler
  implements IQueryHandler<GetAllMedsQuery>
{
  constructor(
    @Inject('MedRepository')
    private readonly medRepository: MedRepositoryInterface,
  ) {}

  async execute(
    query: GetAllMedsQuery,
  ): Promise<PaginatedResponseDto<MedEntity>> {
    const { page, limit, sortBy, sortType, keyword, queryBy } = query;

    // คำนวณและดึงรายการผู้สมัครงานตาม page และ limit
    const meds = await this.medRepository.findAllPaginated(
      page,
      limit,
      sortBy,
      sortType,
      keyword,
      queryBy.companySelected,
    );

    // ดึงจำนวนรายการทั้งหมด
    const totalItems = meds.totalCount;

    // ส่งข้อมูลแบบแบ่งหน้า
    return new PaginatedResponseDto(meds.data, totalItems, limit, page);
  }
}
