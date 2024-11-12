import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@Schema({ timestamps: true })
export class Movie extends Document {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  title: string;

  @Prop()
  director: string;

  @Prop()
  producer: string;

  @Prop()
  release_date: string;

  @Prop({ type: [String] })
  characters: string[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
