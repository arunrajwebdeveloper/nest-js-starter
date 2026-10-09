import { UserRole } from '@/common/enum/user.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, type: String })
  name!: string;

  @Prop({ type: Number })
  age!: number;

  @Prop({ type: Boolean })
  isPremium!: boolean;

  @Prop({
    type: String, // Use the JS String constructor
    required: true,
    enum: Object.values(UserRole),
    default: UserRole.USER,
  })
  role!: UserRole;

  // @Prop([String]) // Shorter
  @Prop({ type: [String], default: [] })
  hobbies!: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

// Create a compound index for optimized lookups
UserSchema.index({ name: 1, age: 1, isPremium: 1 });
