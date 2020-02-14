import { getTableName, InputModelTypeContext } from "@graphback/core"
import { execSync } from 'child_process';
import { AdvancedFilter, GraphbackDataProvider } from './GraphbackDataProvider';
import { NoDataError } from './NoDataError';



export class MongoDBDataProvider<Type = any, GraphbackContext = any> implements GraphbackDataProvider<Type, GraphbackContext>{

  constructor() {

  }

  public async create(name: string, data: any): Promise<Type> {
      const result = await data.save();
      if(result){
        return result;
      }
      throw new NoDataError(`Cannot create name`);
  }

  public async update(name: any, id: string, data: Type): Promise<Type> {
    const result = await name.updateOne({_id:id},data)
    if(result){
      return name.findOne({_id:id});
    }
    throw new NoDataError(`Cannot update name`);
  }

  // tslint:disable-next-line: no-reserved-keywords
  public async delete(name: any, id: string, data?: Type): Promise<string> {
    const dbResult = await name.deleteOne({_id:id});
    if (dbResult) {
      return id;
    }
    throw new NoDataError(`Cannot delete name}`);

  }

  public async read(name: any, id: string): Promise<Type> {
    const dbResult = await name.findOne({"_id":id});
    if (dbResult) {
      return dbResult[0]
    }
    throw new NoDataError(`Cannot read ${id}`);
  }

  public async findAll(name: any): Promise<Type[]> {

    const dbResult = await name.find();
    if (dbResult) {
      return dbResult;
    }
    throw new NoDataError(`Cannot find all results for name`);
  }

  public async findBy(name: any, filter: Type | AdvancedFilter): Promise<Type[]> {
    let dbResult;
    if(filter.id){
      dbResult = await name.find({_id:filter.id});
    }else{
      dbResult=await name.find(filter);
    }
    if (dbResult) {
      return dbResult;
    }
    throw new NoDataError(`No results for name query and filter: ${JSON.stringify(filter)}`);
  }

  public async batchRead(name: string, relationField: string, ids: string[]): Promise<Type[][]> {
    // const dbResult = await this.db.select().from(name).whereIn(relationField, ids);

    // if (dbResult) {

    //   const resultsById = ids.map((id: string) => dbResult.filter((data: any) => {
    //     return data[relationField].toString() === id.toString();
    //   }))

    //   return resultsById as [Type[]];
    // }

    throw new NoDataError(`No results for ${name} and id: ${JSON.stringify(ids)}`);
  }

}
