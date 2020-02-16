import { AdvancedFilter, GraphbackDataProvider } from './GraphbackDataProvider';
import { NoDataError } from './NoDataError';
const {ObjectId} = require('mongodb');


export class MongoDBDataProvider<Type = any, GraphbackContext = any> implements GraphbackDataProvider<Type, GraphbackContext>{
  private db:any;

  constructor(client:any) {
    client.connect((result:any) => {
      this.db = client.db("graphql_practice");
    });
  }

  public async create(name: string, data: any): Promise<Type> {
    const result = await this.db.collection(name).insertOne(data);
    console.log(result);
      if(result){
        return {
          ...result.ops[0],
          id:result.ops[0]._id
        }
      }
      throw new NoDataError(`Cannot create ${name}`);
  }

  public async update(name: any, id: string, data: Type): Promise<Type> {
    const result =  await this.db.collection(name).updateOne({_id:ObjectId(id)},{$set:data});
    if(result){
      const dbResult = await this.db.collection(name).find({_id:ObjectId(id)}).toArray();
      if (dbResult) {
        return {
          ...dbResult[0],
          id:dbResult[0]._id
        }
      }else{
        throw new NoDataError(`Cannot update ${name}`);
      }
    }
    throw new NoDataError(`Cannot update ${name}`);
  }

  // tslint:disable-next-line: no-reserved-keywords
  public async delete(name: any, id: string, data?: Type): Promise<string> {
    const dbResult = await name.deleteOne({_id:ObjectId(id)});
    if (dbResult) {
      return id;
    }
    throw new NoDataError(`Cannot delete ${name}`);

  }

  public async read(name: any, id: string): Promise<Type> {
    const data =  await this.db.collection(name).find({_id:ObjectId(id)}).toArray();
     if(data){
       return data.map((one:any)=>{
         return {
           ...one,
           id:one._id
         }
       });
      }
    throw new NoDataError(`Cannot read ${id}`);
  }

  public async findAll(name: any): Promise<Type[]> {   
     const data =  await this.db.collection(name).find({}).toArray();
     if(data){
       return data.map((one:any)=>{
         return {
           ...one,
           id:one._id
         }
       });
      }
    throw new NoDataError(`Cannot find all results for ${name}`);
  }

  public async findBy(name: any, filter: Type | AdvancedFilter): Promise<Type[]> {
    let dbResult;
    if(filter.id){
      dbResult = await this.db.collection(name).find({_id:ObjectId(filter.id)}).toArray();
    }else{
      dbResult=await this.db.collection(name).find({title:filter.title}).toArray();
    }
    if (dbResult) {
      return dbResult.map((one:any)=>{
        return {
          ...one,
          id:one._id
        }
      });
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
