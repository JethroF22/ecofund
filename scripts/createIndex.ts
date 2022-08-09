import fleekStorage from "@fleekhq/fleek-storage-js";

import * as dotenv from "dotenv";

dotenv.config();

const main = async () => {
  await fleekStorage.upload({
    apiKey: process.env.NEXT_PUBLIC_FLEEK_STORAGE_KEY as string,
    apiSecret: process.env.NEXT_PUBLIC_FLEEK_STORAGE_SECRET as string,
    key: "campaignsIndex.json",
    data: JSON.stringify([]),
    httpUploadProgressCallback: (event) => {
      console.log(Math.round((event.loaded / event.total) * 100) + "% done");
    },
  });
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
