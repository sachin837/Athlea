import { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

export {};

// Move this to a separate file, e.g., types/global.d.ts

declare global {
  interface Window {
    handleKeywordClick?: (keyword: string) => void;
  }
}
