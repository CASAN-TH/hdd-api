import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { ResponseDto } from 'src/common/presentation/dtos/response.dto';
import { GetStoreByIdQuery } from './get-store-by-id.query';
import { StoreRepositoryInterface } from '../../domain/repositories/store.repository.interface';
import { StoreEntity } from '../../domain/entities/store.entity';

@QueryHandler(GetStoreByIdQuery)
export class GetStoreByIdHandler
  implements IQueryHandler<GetStoreByIdQuery>
{
  constructor(
    @Inject('StoreRepository')
    private readonly storeRepository: StoreRepositoryInterface,
  ) {}

  async execute(query: GetStoreByIdQuery): Promise<ResponseDto<StoreEntity>> {
    const { id } = query;

    // ดึงข้อมูลผู้สมัครตาม ID
    const store = await this.storeRepository.findById(id);
    if (!store) {
      throw new NotFoundException(`Store with ID ${id} not found`);
    }

    return new ResponseDto<StoreEntity>(store);
  }
}
