import { Prop } from '@nestjs/mongoose';
import { Expose, Transform } from 'class-transformer';

export class StoreEntity {
  @Expose({ name: 'id' })
  @Transform(({ obj }) => (obj._id ? obj._id.toString() : null), {
    toClassOnly: true,
  })
  public id: string;

  @Expose()
  @Prop({ type: String, required: true })
  name: string;

  @Expose()
  @Prop({ type: String, required: false })
  location: string;

  @Expose()
  @Prop({ type: String, required: false })
  type: string;

  @Expose()
  @Prop({ type: Boolean, required: false, default: true })
  active: boolean;

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
