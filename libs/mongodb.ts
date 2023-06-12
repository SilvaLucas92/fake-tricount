import mongose from "mongoose";

export const connectMongoDB = async () => {
  if (mongose.connection.readyState === 1) {
    return mongose.connection.asPromise();
  }

  return await mongose.connect(process.env.MONGO_URI as string);
};
