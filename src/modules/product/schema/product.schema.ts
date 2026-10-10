import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  name!: string;

  @Prop({ required: true, type: Number })
  price!: number;

  @Prop({ required: true, type: Number })
  stock!: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.index({ name: 1 });
