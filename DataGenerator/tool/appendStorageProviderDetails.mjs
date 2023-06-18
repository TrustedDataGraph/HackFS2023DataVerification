import { program } from "commander";
import * as fs from "node:fs/promises";
import { execSync } from 'child_process';
import util from 'util';
//import { spawn } from "child_process";
//import  process from "process";

//const pexec = util.promisify(exec);

program.parse(process.argv);
const filePath = program.args[0];
const findTabbedKeyValue = (strs, key)=>{
    for(let i=0; i<strs.length; i++){
        const kv = strs[i].split("\t");
        if(kv[0]==key){
            return kv[1];
        }
    }
    return "";
}
const appendSP = async(datas, key)=>{
    const items = datas[key];
    const success = [];
    for(let i=0; i<items.length; i++){
        const cmd = `lotus state miner-info ${items[i].miner_id}`
        console.log(key,cmd);
        try{
            const stdout = execSync(cmd,{timeout:10000});
            const spinfo = stdout.toString().split("\n");
            const miner_peer = findTabbedKeyValue(spinfo,"PeerID:")
            const miner_multi_addrs = findTabbedKeyValue(spinfo,"Multiaddrs:")
            console.log(miner_multi_addrs,miner_peer);
            const obj = Object.assign({
                ...items[i],
                miner_peer,
                miner_multi_addrs,
            })
            success.push(obj);
            return success;
        } catch(error){
            console.log(items[i].miner_id,"skip");
            console.log(error);            
        }

    }
    const clean = 'bash cancel-retrieval.sh'            
    const stdout = execSync(clean,{timeout:15000});
    console.log("cleaned:",stdout.toString());
    return [];
};
//lotus client retrieve --miner f03223 bafybeigt5igxvpe2uq7p4kipz4dnzapcw4tnq43zlu7e6mocmxfprz4wzi TFDS-main-16851
const main =  () => {
    // ファイルを非同期で読み込む
    fs.readFile(filePath, { encoding: "utf8" }).then(async (file) => {
        const datas = JSON.parse(file);
        const keys = Object.keys(datas);
        console.log("dataset has:", keys.length);
        const successObj = {};
        let i=0;
        //for(;keys[i] != "bafybeielt6cevxh4v32oscimbpcevd6f2smilq56oj64wwn55aif57cmnm";i++);
        i=0;
        //const j = i+25;
        const j=keys.length;
        console.log("start:",i," end:",j);
        for(; i<j; i++){
            try{
                const s = await appendSP(datas,keys[i]);
                if(s.length){
                    successObj[keys[i]]=s;
                }
            } catch(error) {
                console.log("error await",error);
            }
        }
        console.log(successObj);
        fs.writeFile(filePath + ".sp.json",JSON.stringify(successObj)).then(()=>{
            console.log("write finished");
        });
    }).catch(err => {
        console.log("some error");
        console.error(err);
        // 終了ステータス 1（一般的なエラー）としてプロセスを終了する
        process.exit(1);
    });
}

main();
