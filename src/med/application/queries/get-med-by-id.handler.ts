import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { ResponseDto } from 'src/common/presentation/dtos/response.dto';
import { GetMedByIdQuery } from './get-med-by-id.query';
import { MedRepositoryInterface } from '../../domain/repositories/med.repository.interface';
import { MedEntity } from '../../domain/entities/med.entity';

@QueryHandler(GetMedByIdQuery)
export class GetMedByIdHandler
  implements IQueryHandler<GetMedByIdQuery>
{
  constructor(
    @Inject('MedRepository')
    private readonly medRepository: MedRepositoryInterface,
  ) {}

  async execute(query: GetMedByIdQuery): Promise<ResponseDto<MedEntity>> {
    const { id } = query;

    // ดึงข้อมูลผู้สมัครตาม ID
    const med = await this.medRepository.findById(id);
    if (!med) {
      throw new NotFoundException(`Med with ID ${id} not found`);
    }

    return new ResponseDto<MedEntity>(med);
  }
}
