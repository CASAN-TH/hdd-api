import { RequestUserDto } from 'src/common/presentation/dtos/request-user.dto';
import { CreateMedDto } from '../dtos/create-med.dto';

export class CreateMedCommand {
  constructor(
    public readonly createMedDto: CreateMedDto,
    public readonly createdBy: RequestUserDto,
  ) {}
}
