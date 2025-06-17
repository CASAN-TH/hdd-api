import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteMedCommand } from './delete-med.command';
import { MedRepositoryInterface } from '../../domain/repositories/med.repository.interface';
import { Inject, NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteMedCommand)
export class DeleteMedHandler
  implements ICommandHandler<DeleteMedCommand>
{
  constructor(
    @Inject('MedRepository')
    private readonly medRepository: MedRepositoryInterface,
  ) {}

  async execute(command: DeleteMedCommand): Promise<void> {
    const { id } = command;

    // ตรวจสอบว่าผู้สมัครที่ต้องการลบมีอยู่ในระบบหรือไม่
    const med = await this.medRepository.findById(id);
    if (!med) {
      throw new NotFoundException(`Med with ID ${id} not found`);
    }

    // ลบผู้สมัคร
    await this.medRepository.delete(id);
  }
}
