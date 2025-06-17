import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';
import { MedEntity } from 'src/med/domain/entities/med.entity';

@Schema()
export class Med extends MedEntity {}

export const MedSchema = SchemaFactory.createForClass(Med);
