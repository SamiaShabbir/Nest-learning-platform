import { Types } from 'mongoose';

export function convertStringsToObjectIds(stringIds: string[]): Types.ObjectId[] {
    console.log("steing",stringIds)
    const objectIds: Types.ObjectId[] = [];

    for (const id of stringIds) {
      const trimmedId = id;
      console.log(trimmedId);
      if (!Types.ObjectId.isValid(trimmedId)) {
        throw new Error(`Invalid ObjectId: ${trimmedId}`);
      }
      objectIds.push(new Types.ObjectId(trimmedId));
    }
  
    return objectIds;
}   