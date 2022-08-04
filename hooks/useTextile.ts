import { Buckets } from "@textile/hub";

import { parseIndex } from "../lib/storage";

export default function useTextile() {
  const getBuckets = async () =>
    Buckets.withKeyInfo({
      key: process.env.NEXT_PUBLIC_HUB_API_KEY as string,
      secret: process.env.NEXT_PUBLIC_HUB_API_SECRET as string,
    });

  const getCampaignsBucket = async (buckets: Buckets): Promise<string> => {
    const { root } = await buckets.getOrCreate("ecofund-campaigns", {
      encrypted: false,
    });
    if (!root) throw new Error("bucket not created");
    return root.key;
  };

  const getCampaignIndex = async (buckets: Buckets, key: string) => {
    const metadata = buckets.pullPath(key, "index.json");
    const { value } = await metadata.next();
    return parseIndex(value);
  };

  return {
    getBuckets,
    getCampaignIndex,
    getCampaignsBucket,
  };
}
