import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;
}

export const AuthSchema = SchemaFactory.createForClass(User);
