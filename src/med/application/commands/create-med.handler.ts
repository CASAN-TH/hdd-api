import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMedCommand } from './create-med.command';
import { MedRepositoryInterface } from '../../domain/repositories/med.repository.interface';
import { BadRequestException, Inject } from '@nestjs/common';
import { MedEntity } from '../../domain/entities/med.entity';
import { ResponseDto } from 'src/common/presentation/dtos/response.dto';

@CommandHandler(CreateMedCommand)
export class CreateMedHandler
  implements ICommandHandler<CreateMedCommand>
{
  constructor(
    @Inject('MedRepository')
    private readonly medRepository: MedRepositoryInterface,
  ) {}

  async execute(command: CreateMedCommand): Promise<ResponseDto<MedEntity>> {
    const { createMedDto, createdBy } = command;
    
    const today = new Date();
    const med = new MedEntity();
    Object.assign(med, createMedDto);
    med.companyId = createdBy.companySelected;
    med.createdBy = createdBy.id;
    med.createdAt = today;
    const newMed = await this.medRepository.save(med);
    return new ResponseDto<MedEntity>(newMed);
  }
}
