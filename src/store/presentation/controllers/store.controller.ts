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
import { CreateStoreDto } from '../../application/dtos/create-store.dto';
import { UpdateStoreDto } from '../../application/dtos/update-store.dto';
import { CreateStoreCommand } from '../../application/commands/create-store.command';
import { UpdateStoreCommand } from '../../application/commands/update-store.command';
import { GetAllStoresQuery } from '../../application/queries/get-all-stores.query';
import { RolesAndScopesGuard } from '../../../common/presentation/guards/roles-and-scopes.guard';
import { DeleteStoreCommand } from '../../application/commands/delete-store.command';
import { GetStoreByIdQuery } from '../../application/queries/get-store-by-id.query';

@ApiTags('stores')
@Controller('stores')
@ApiBearerAuth() // ใช้ Bearer Token ในการเข้าถึง API นี้
@UseGuards(RolesAndScopesGuard) // ใช้ RolesGuard กับทั้ง controller
export class StoreController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @SetMetadata('roles', ['owner', 'admin']) // กำหนดว่าเฉพาะ admin ที่สามารถเรียกใช้งานได้
  @ApiOperation({ summary: 'Create a new store' })
  @ApiResponse({ status: 201, description: 'Store successfully created'
   })
  async createStore(
    @Body() createStoreDto: CreateStoreDto,
    @Req() req,
  ) {
    const command = new CreateStoreCommand(
      createStoreDto,
      req.user,
    );
    return await this.commandBus.execute(command);
  }

  @Get()
  @ApiOperation({ summary: 'Get all stores with pagination' })
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
  @ApiResponse({ status: 200, description: 'List of all stores' })
  async getAllStores(
    @Query('page') page = 1, 
    @Query('limit') limit = 10,
    @Query('sortBy') sortBy: string,
    @Query('sortType') sortType: 'asc' | 'desc',
    @Query('keyword') keyword: string,
    @Req() req,
  ) {
    sortBy = sortBy && sortBy.trim() !== '' ? sortBy : 'createdAt';
    return await this.queryBus.execute(new GetAllStoresQuery(page, limit, sortBy, sortType, keyword, req.user));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a store by ID' })
  @ApiResponse({ status: 200, description: 'Store details' })
  async getStoreById(@Param('id') id: string) {
    return await this.queryBus.execute(new GetStoreByIdQuery(id));
  }

  @Put(':id')
  @SetMetadata('roles', ['owner', 'admin']) // กำหนดว่าเฉพาะ admin ที่สามารถเรียกใช้งานได้
  @ApiOperation({ summary: 'Update a store by ID' })
  @ApiResponse({ status: 200, description: 'Store successfully updated' })
  async updateStore(
    @Param('id') id: string,
    @Body() updateStoreDto: UpdateStoreDto,
    @Req() req,
  ) {
    const command = new UpdateStoreCommand(
      id, 
      updateStoreDto,
      req.user,
    );
    return await this.commandBus.execute(command);
  }

  @Delete(':id')
  @SetMetadata('roles', ['owner', 'admin']) // กำหนดว่าเฉพาะ admin ที่สามารถเรียกใช้งานได้
  @ApiOperation({ summary: 'Delete a store by ID' })
  @ApiResponse({ status: 200, description: 'Store successfully deleted' })
  async deleteStore(@Param('id') id: string): Promise<void> {
    await this.commandBus.execute(new DeleteStoreCommand(id));
  }
}
