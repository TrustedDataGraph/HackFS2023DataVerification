import { Web3Storage } from 'web3.storage'

const URL_POST = ".ipfs.w3s.link/";
const token = `${import.meta.env.VITE_WEB3STORAGE_TOKEN}`;

function makeStorageClient () {
  return new Web3Storage({ token })
}

export async function storeFiles (files:any) {
  try{
    const client = makeStorageClient()
    const cid = await client.put(files)
    console.log('stored files with cid:', cid)
    return "https://" + cid + URL_POST + files[0].name;
  } catch(error){
    console.error(error);
  }
}

