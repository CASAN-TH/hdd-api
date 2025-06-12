import { RequestUserDto } from 'src/common/presentation/dtos/request-user.dto';
import { CreateStoreDto } from '../dtos/create-store.dto';

export class CreateStoreCommand {
  constructor(
    public readonly createStoreDto: CreateStoreDto,
    public readonly createdBy: RequestUserDto,
  ) {}
}
