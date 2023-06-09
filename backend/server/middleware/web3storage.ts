import { Web3Storage, File } from 'web3.storage'

const URL_POST = ".ipfs.w3s.link/";

function getAccessToken () {
  return process.env.WEB3STORAGE_TOKEN ||  "";
}

function makeStorageClient () {
  return new Web3Storage({ token: getAccessToken() })
}


export function makeFileObjects (obj:any, name:string) {
  // You can create File objects from a Buffer of binary data
  // see: https://nodejs.org/api/buffer.html
  // Here we're just storing a JSON object, but you can store images,
  // audio, or whatever you want!
  const buffer = Buffer.from(JSON.stringify(obj))

  const files = [
    new File([buffer], name)
  ]
  return files
}

export async function storeFiles (files : Array<File>) {
  const client = makeStorageClient()
  const cid = await client.put(files)
  console.log('stored files with cid:', cid)
  return "https://" + cid + URL_POST + files[0].name;
}
