import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Role {
  @Prop({ required: true })
  role_name: string;
  @Prop({ required: true })
  permissions: string;
}
export const RoleSchema = SchemaFactory.createForClass(Role);
