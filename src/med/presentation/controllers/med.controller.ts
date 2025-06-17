import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SetMetadata } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { CreateMedDto } from '../../application/dtos/create-med.dto';
import { UpdateMedDto } from '../../application/dtos/update-med.dto';
import { CreateMedCommand } from '../../application/commands/create-med.command';
import { UpdateMedCommand } from '../../application/commands/update-med.command';
import { GetAllMedsQuery } from '../../application/queries/get-all-meds.query';
import { RolesAndScopesGuard } from '../../../common/presentation/guards/roles-and-scopes.guard';
import { DeleteMedCommand } from '../../application/commands/delete-med.command';
import { GetMedByIdQuery } from '../../application/queries/get-med-by-id.query';

@ApiTags('meds')
@Controller('meds')
@ApiBearerAuth() // ใช้ Bearer Token ในการเข้าถึง API นี้
@UseGuards(RolesAndScopesGuard) // ใช้ RolesGuard กับทั้ง controller
export class MedController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @SetMetadata('roles', ['owner', 'admin']) // กำหนดว่าเฉพาะ admin ที่สามารถเรียกใช้งานได้
  @ApiOperation({ summary: 'Create a new med' })
  @ApiResponse({ status: 201, description: 'Med successfully created' })
  async createMed(
    @Body() createMedDto: CreateMedDto,
    @Req() req,
  ) {
    const command = new CreateMedCommand(
      createMedDto,
      req.user,
    );
    return await this.commandBus.execute(command);
  }

  @Get()
  @ApiOperation({ summary: 'Get all meds with pagination' })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number',
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page',
    type: Number,
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description: 'sort by field name',
    type: String,
  })
  @ApiQuery({
    name: 'sortType',
    required: false,
    description: 'sort type order by asc desc',
    type: String,
  })
  @ApiQuery({
    name: 'keyword',
    required: false,
    description: 'keyword for search',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'List of all meds' })
  async getAllMeds(
    @Query('page') page = 1, 
    @Query('limit') limit = 10,
    @Query('sortBy') sortBy: string,
    @Query('sortType') sortType: 'asc' | 'desc',
    @Query('keyword') keyword: string,
    @Req() req,
  ) {
    sortBy = sortBy && sortBy.trim() !== '' ? sortBy : 'createdAt';
    return await this.queryBus.execute(new GetAllMedsQuery(page, limit, sortBy, sortType, keyword, req.user));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a med by ID' })
  @ApiResponse({ status: 200, description: 'Med details' })
  async getMedById(@Param('id') id: string) {
    return await this.queryBus.execute(new GetMedByIdQuery(id));
  }

  @Put(':id')
  @SetMetadata('roles', ['owner', 'admin']) // กำหนดว่าเฉพาะ admin ที่สามารถเรียกใช้งานได้
  @ApiOperation({ summary: 'Update a med by ID' })
  @ApiResponse({ status: 200, description: 'Med successfully updated' })
  async updateMed(
    @Param('id') id: string,
    @Body() updateMedDto: UpdateMedDto,
    @Req() req,
  ) {
    const command = new UpdateMedCommand(
      id, 
      updateMedDto,
      req.user,
    );
    return await this.commandBus.execute(command);
  }

  @Delete(':id')
  @SetMetadata('roles', ['owner', 'admin']) // กำหนดว่าเฉพาะ admin ที่สามารถเรียกใช้งานได้
  @ApiOperation({ summary: 'Delete a med by ID' })
  @ApiResponse({ status: 200, description: 'Med successfully deleted' })
  async deleteMed(@Param('id') id: string): Promise<void> {
    await this.commandBus.execute(new DeleteMedCommand(id));
  }
}
