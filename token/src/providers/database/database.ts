import { Document, Model } from 'mongoose';

export abstract class DatabaseService<T extends Document> {
  private Model: Model<T>;

  constructor(model: Model<T>) {
    this.Model = model;
  }

  public async findAll(): Promise<T[]> {
    try {
      return await this.Model.find({}).exec();
    } catch (error) {
      console.log('[DataBaseService - findAll]: ', error);
      throw error;
    }
  }

  public async add(document: T): Promise<T> {
    try {
      return await this.Model.create(document);
    } catch (error) {
      console.log('[DataBaseService - add]: ', error);
      throw error;
    }
  }

  public async findById(id: string): Promise<T | null> {
    try {
      return await this.Model.findById(id).exec();
    } catch (error) {
      console.log('[DataBaseService - findById]: ', error);
      throw error;
    }
  }

  public update(id: string, document: T): Promise<T | null> {
    try {
      return this.Model.findByIdAndUpdate(
        { _id: id },
        { $set: document },
        { new: true }
      ).exec();
    } catch (error) {
      console.log('[DataBaseService - update]: ', error);
      throw error;
    }
  }

  public remove(id: string) {
    try {
      return this.Model.remove({ _id: id }).exec();
    } catch (error) {
      console.log('[DataBaseService - remove]: ', error);
      throw error;
    }
  }

  public findByParams(params: any): Promise<T[]> {
    try {
      return this.Model.find(params).exec();
    } catch (error) {
      console.log('[DataBaseService - findByParams]: ', error);
      throw error;
    }
  }

  public get model(): Model<T> {
    return this.Model;
  }
}
