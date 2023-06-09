# backend for DataTrustedGraph+

## preaparation

* install mongo
   * https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/
```shell
brew tap mongodb/brew
brew install mongodb-community@6.0
mongod -f /opt/homebrew/etc/mongod.conf
#  log dir : /opt/homebrew/var/log/mongodb/mongo.log
```


## need to set web3 storage token
Get your own token on https://web3.storage/account/
or ask to kozayupapa

## create .env
copy dotenv.example to .env
and set WEB3STORAGE_TOKEN

## run  develop
`npm run serve`

## example
* simple review post
```shell
(base) backend % curl -X POST -H 'Content-Type: application/json; charset=UTF-8' http://localhost:4000/api/v1/review -d '{"title":"hogehoge","contents":"fugafuga","user": "kozayupapa"}'
{"url":"https://bafybeiafgae7xlwgkjrm6gjaibse7vn5cxwh5m7vc3paumoohm4mekdpj4.ipfs.w3s.link/review.json"}%      
```
