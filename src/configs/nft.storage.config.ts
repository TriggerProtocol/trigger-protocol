import { NFTStorage, File, Blob } from "nft.storage";

export const getNftStorageClient = () => {
  const NFT_STORAGE_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGZiQzBjQzVBODJBRDVkMGQzZGE4M0NhODcwQWI4ZjM2NEFhMzZCMzMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0ODM3OTk0MTczNywibmFtZSI6IlRyaWdnZXJQcm90b2NvbCJ9.2ctoezqgsWai4ydxDoRasQEnrKnM4ot7GPGqx203kug";
  const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
  return client;
};
