import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@Schema({ timestamps: true })
export class Movie extends Document {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true, unique: true })
  episode_id: number;

  @Prop({ required: true })
  opening_crawl: string;

  @Prop({ required: true })
  director: string;

  @Prop({ required: true })
  producer: string;

  @Prop({ required: true })
  release_date: string;

  @Prop({ type: [String] })
  characters: string[];

  @Prop({ type: [String] })
  planets: string[];

  @Prop({ type: [String] })
  starships: string[];

  @Prop({ type: [String] })
  vehicles: string[];

  @Prop({ type: [String] })
  species: string[];

  @Prop({ required: true, default: Date.now })
  created: Date;

  @Prop({ required: true })
  edited: Date;

  @Prop({ required: true })
  url: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
