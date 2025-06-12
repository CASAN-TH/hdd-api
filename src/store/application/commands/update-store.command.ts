import { RequestUserDto } from 'src/common/presentation/dtos/request-user.dto';
import { UpdateStoreDto } from '../dtos/update-store.dto';

export class UpdateStoreCommand {
  constructor(
    public readonly id: string,
    public readonly updateStoreDto: UpdateStoreDto,
    public readonly updatedBy: RequestUserDto,
  ) {}
}
