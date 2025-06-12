import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Reflector } from '@nestjs/core';
import { RolesAndScopesGuard } from 'src/common/presentation/guards/roles-and-scopes.guard';
import { StoreController } from './presentation/controllers/store.controller';
import { CreateStoreHandler } from './application/commands/create-store.handler';
import { UpdateStoreHandler } from './application/commands/update-store.handler';
import { DeleteStoreHandler } from './application/commands/delete-store.handler';
import { GetAllStoresHandler } from './application/queries/get-all-stores.handler';
import { GetStoreByIdHandler } from './application/queries/get-store-by-id.handler';
import { StoreRepository } from './infrastructure/repositories/store.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreSchema } from './infrastructure/persistence/store.schema';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: 'Store', schema: StoreSchema }])
  ],
  controllers: [StoreController],
  providers: [
    Reflector,
    RolesAndScopesGuard,
    CreateStoreHandler,
    UpdateStoreHandler,
    DeleteStoreHandler,
    GetAllStoresHandler,
    GetStoreByIdHandler,
    {
      provide: 'StoreRepository',
      useClass: StoreRepository,
    },
  ],
})
export class StoreModule {}
