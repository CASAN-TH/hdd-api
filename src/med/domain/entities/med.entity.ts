import { Prop } from '@nestjs/mongoose';
import { Expose, Transform } from 'class-transformer';

export class MedEntity {
  @Expose({ name: 'id' })
  @Transform(({ obj }) => (obj._id ? obj._id.toString() : null), {
    toClassOnly: true,
  })
  public id: string;

  @Expose()
  @Prop({ type: String, unique: true, required: true })
  medID: string;
  
  @Expose()
  @Prop({ type: String, required: true })
  medName: string;

  @Expose()
  @Prop({ type: String, required: true})
  storeID: string;

  @Expose()
  @Prop({ type: String, required: true })
  location: number;

   @Expose()
  @Prop({ type: String, required: false })
  companyId: string;
  
  @Expose()
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Expose()
  @Prop({ type: Date })
  updatedAt: Date;

  @Expose()
  @Prop({ type: Object })
  createdBy: any;

  @Expose()
  @Prop({ type: Object })
  updatedBy: any;
}
