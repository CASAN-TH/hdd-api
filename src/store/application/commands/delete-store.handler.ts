import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteStoreCommand } from './delete-store.command';
import { StoreRepositoryInterface } from '../../domain/repositories/store.repository.interface';
import { Inject, NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteStoreCommand)
export class DeleteStoreHandler
  implements ICommandHandler<DeleteStoreCommand>
{
  constructor(
    @Inject('StoreRepository')
    private readonly storeRepository: StoreRepositoryInterface,
  ) {}

  async execute(command: DeleteStoreCommand): Promise<void> {
    const { id } = command;

    // ตรวจสอบว่าผู้สมัครที่ต้องการลบมีอยู่ในระบบหรือไม่
    const store = await this.storeRepository.findById(id);
    if (!store) {
      throw new NotFoundException(`Store with ID ${id} not found`);
    }

    // ลบผู้สมัคร
    await this.storeRepository.delete(id);
  }
}
