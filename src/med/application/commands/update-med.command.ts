import { RequestUserDto } from 'src/common/presentation/dtos/request-user.dto';
import { UpdateMedDto } from '../dtos/update-med.dto';

export class UpdateMedCommand {
  constructor(
    public readonly id: string,
    public readonly updateMedDto: UpdateMedDto,
    public readonly updatedBy: RequestUserDto,
  ) {}
}
