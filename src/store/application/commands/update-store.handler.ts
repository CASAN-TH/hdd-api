import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateStoreCommand } from './update-store.command';
import { StoreRepositoryInterface } from '../../domain/repositories/store.repository.interface';
import { Inject, NotFoundException } from '@nestjs/common';
import { ResponseDto } from 'src/common/presentation/dtos/response.dto';
import { StoreEntity } from 'src/store/domain/entities/store.entity';

@CommandHandler(UpdateStoreCommand)
export class UpdateStoreHandler
  implements ICommandHandler<UpdateStoreCommand>
{
  constructor(
    @Inject('StoreRepository')
    private readonly storeRepository: StoreRepositoryInterface,
  ) {}

  async execute(command: UpdateStoreCommand): Promise<ResponseDto<StoreEntity>> {
    const { id, updateStoreDto, updatedBy  } = command;

    // หา Store จาก ID
    const store = await this.storeRepository.findById(id);
    if (!store) {
      throw new NotFoundException(`Store with ID ${id} not found`);
    }

    Object.assign(store, updateStoreDto);
    store.updatedAt = new Date();
    store.updatedBy = updatedBy.id;
    store.companyId = updatedBy.companySelected;
    // อัปเดตข้อมูลในฐานข้อมูล
    const updStore = await this.storeRepository.update(store);
    return new ResponseDto<StoreEntity>(updStore);
  }
}
