import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateStoreCommand } from './create-store.command';
import { StoreRepositoryInterface } from '../../domain/repositories/store.repository.interface';
import { BadRequestException, Inject } from '@nestjs/common';
import { StoreEntity } from '../../domain/entities/store.entity';
import { ResponseDto } from 'src/common/presentation/dtos/response.dto';

@CommandHandler(CreateStoreCommand)
export class CreateStoreHandler
  implements ICommandHandler<CreateStoreCommand>
{
  constructor(
    @Inject('StoreRepository')
    private readonly storeRepository: StoreRepositoryInterface,
  ) {}

  async execute(command: CreateStoreCommand): Promise<ResponseDto<StoreEntity>> {
    const { createStoreDto, createdBy } = command;
    const today = new Date();
    const store = new StoreEntity();
    Object.assign(store, createStoreDto);
    store.companyId = createdBy.companySelected;
    store.createdBy = createdBy.id;
    store.createdAt = today;
    const newStore = await this.storeRepository.save(store);
    return new ResponseDto<StoreEntity>(newStore);
  }
}
