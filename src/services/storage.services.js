import ImageKit, { toFile } from '@imagekit/nodejs';
import { config } from 'dotenv';

const client = new ImageKit({
  privateKey: config.IMAGE_KIT_PRIVATE_KEY   // This is the default and can be omitted
});

export async function uploadFile({buffer, fileName}){
    const response = await client.files.upload({
        file : await toFile(buffer),
        fileName : fileName
    })
    return response
}