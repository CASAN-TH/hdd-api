import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';
import { StoreEntity } from 'src/store/domain/entities/store.entity';

@Schema()
export class Store extends StoreEntity {}

export const StoreSchema = SchemaFactory.createForClass(Store);
