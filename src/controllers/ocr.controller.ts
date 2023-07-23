import path from "path";
import * as vision from "@google-cloud/vision";

const rootPath = path.resolve(__dirname, "../../");

export const inbody_result_OCR = async (): Promise<any> => {
  const keyPath = path.join(rootPath, "iron-potion-393208-29d8e7c7deed.json");
  const picturePath = path.join(rootPath, "contentful.png");
  const options = {
    keyFilename: keyPath,
    projectId: "iron-potion-393208",
  };
  return new Promise(async (resolve, reject) => {
    const client = new vision.ImageAnnotatorClient(options);

    const [result] = await client.textDetection(picturePath);
    const labels: any = result.textAnnotations;
    //   console.log(typeof labels);
    // labels.forEach((label: any) => console.log(label.description));
    resolve(labels);
  });
};
