import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateMedCommand } from './update-med.command';
import { MedRepositoryInterface } from '../../domain/repositories/med.repository.interface';
import { Inject, NotFoundException } from '@nestjs/common';
import { ResponseDto } from 'src/common/presentation/dtos/response.dto';
import { MedEntity } from 'src/med/domain/entities/med.entity';

@CommandHandler(UpdateMedCommand)
export class UpdateMedHandler
  implements ICommandHandler<UpdateMedCommand>
{
  constructor(
    @Inject('MedRepository')
    private readonly medRepository: MedRepositoryInterface,
  ) {}

  async execute(command: UpdateMedCommand): Promise<ResponseDto<MedEntity>> {
    const { id, updateMedDto, updatedBy  } = command;

    // หา Med จาก ID
    const med = await this.medRepository.findById(id);

    Object.assign(med, updateMedDto);
    med.updatedAt = new Date();
    med.updatedBy = updatedBy.id;
    med.companyId = updatedBy.companySelected;
    // อัปเดตข้อมูลในฐานข้อมูล
    const updMed = await this.medRepository.update(med);
    return new ResponseDto<MedEntity>(updMed);
  }
}
