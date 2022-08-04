import { Buckets } from "@textile/hub";
import * as dotenv from "dotenv";

dotenv.config();

const main = async () => {
  const buckets = await Buckets.withKeyInfo({
    key: process.env.NEXT_PUBLIC_HUB_API_KEY as string,
    secret: process.env.NEXT_PUBLIC_HUB_API_SECRET as string,
  });
  const { root } = await buckets.getOrCreate("ecofund-campaigns", {
    encrypted: false,
  });
  if (!root) throw new Error("bucket not created");
  const index = JSON.stringify([]);
  const buffer = Buffer.from(index);
  await buckets.pushPath(root.key, `index.json`, buffer);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
