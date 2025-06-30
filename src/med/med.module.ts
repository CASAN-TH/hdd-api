import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Reflector } from '@nestjs/core';
import { RolesAndScopesGuard } from 'src/common/presentation/guards/roles-and-scopes.guard';
import { MedController } from './presentation/controllers/med.controller';
import { CreateMedHandler } from './application/commands/create-med.handler';
import { UpdateMedHandler } from './application/commands/update-med.handler';
import { DeleteMedHandler } from './application/commands/delete-med.handler';
import { GetAllMedsHandler } from './application/queries/get-all-meds.handler';
import { GetMedByIdHandler } from './application/queries/get-med-by-id.handler';
import { MedRepository } from './infrastructure/repositories/med.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { MedSchema } from './infrastructure/persistence/med.schema';
import { MedQuery } from './application/queries/med.query';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: 'Med', schema: MedSchema }])
  ],
  controllers: [MedController],
  providers: [
    Reflector,
    RolesAndScopesGuard,
    CreateMedHandler,
    UpdateMedHandler,
    DeleteMedHandler,
    GetAllMedsHandler,
    GetMedByIdHandler,
    MedQuery,
    {
      provide: 'MedRepository',
      useClass: MedRepository,
    },
  ],
})
export class MedModule {}
