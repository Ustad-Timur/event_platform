import mongoose from 'mongoose'
import { cache } from 'react';
const MONGODB_URI = process.env.MONGODB_URI;

// mongodb database username FinalYearProject pass Project123
//creating connection to database
let cached = (global as any ).mongoose || {con: null, promise: null};
//  we are using cached connection to connect once to the database 
// if we don't use use this then for every request made to server new connection will be required which is inefficient 
export const connectToDatabase = async () => {
    if(cached.conn) return cached.connect;
    if(!MONGODB_URI) throw new Error('MONGODB_URI is missing');
    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
        dbName: 'evently',
        bufferCommands: false,
    })

    cached.con = await cached.promise;
    return cached.conn;

}