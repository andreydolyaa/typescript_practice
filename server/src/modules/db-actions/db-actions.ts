import { Model, Document, FilterQuery, UpdateQuery } from "mongoose";

export async function create<T extends Document>(
  model: Model<T>,
  data: Partial<T>
): Promise<T> {
  try {
    const document = await model.create(data);
    return document;
  } catch (error) {
    throw new Error(`failed to create document: ${error}`);
  }
}

export async function update<T extends Document>(
  model: Model<T>,
  filter: FilterQuery<T>,
  updateData: UpdateQuery<T>
): Promise<T | null> {
  try {
    const updatedDocument = await model.findOneAndUpdate(filter, updateData, {
      new: true,
    });
    return updatedDocument;
  } catch (error) {
    throw new Error(`failed to update document: ${error}`);
  }
}
