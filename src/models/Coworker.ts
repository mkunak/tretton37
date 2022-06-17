import { Schema, Document, Model, model } from 'mongoose';

// An interface that describes the properties that are required to create a new Coworker
export interface ICoworker {
  id: number;
  name: string;
  city: string;
  country: string;
  text: string;
  imagePortraitUrl: string;
  imageFullUrl: string;
}

// An interface that describes the properties that a Coworker Model has
export interface ICoworkerModel extends Model<ICoworkerDocument> {
  build(attrs: ICoworker): ICoworkerDocument;
}
// or with type
export type TCoworkerModel = Model<TCoworkerDocument> & {
  build(attrs: ICoworker): TCoworkerDocument;
};

// An interface that describes the properties that a Coworker Document has
export interface ICoworkerDocument extends Document {
  id: number;
  name: string;
  city: string;
  country: string;
  text: string;
  imagePortraitUrl: string;
  imageFullUrl: string;
}
// or with type
export type TCoworkerDocument = ICoworker & Document;

const coworkerSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    uppercase: true,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  imagePortraitUrl: {
    type: String,
    required: true,
  },
  imageFullUrl: {
    type: String,
    required: true,
  },
});

coworkerSchema.statics.build = (attrs: ICoworker) => {
  return new Coworker(attrs);
};

const Coworker = model<TCoworkerDocument, TCoworkerModel>('Coworker', coworkerSchema);

export { Coworker };
