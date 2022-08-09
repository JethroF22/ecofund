import fleekStorage from "@fleekhq/fleek-storage-js";

export default function useStorage() {
  const get = async (fileKey: string) => {
    return fleekStorage.get({
      apiKey: process.env.NEXT_PUBLIC_FLEEK_STORAGE_KEY as string,
      apiSecret: process.env.NEXT_PUBLIC_FLEEK_STORAGE_SECRET as string,
      key: fileKey,
    });
  };

  const upload = async (fileKey: string, fileData: any) => {
    return fleekStorage.upload({
      apiKey: process.env.NEXT_PUBLIC_FLEEK_STORAGE_KEY as string,
      apiSecret: process.env.NEXT_PUBLIC_FLEEK_STORAGE_SECRET as string,
      key: fileKey,
      data: fileData,
      httpUploadProgressCallback: (event) => {
        console.log(Math.round((event.loaded / event.total) * 100) + "% done");
      },
    });
  };

  return {
    get,
    upload,
  };
}
