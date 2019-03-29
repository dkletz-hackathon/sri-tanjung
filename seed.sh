ts-node ./node_modules/.bin/typeorm schema:drop -c seed
ts-node ./node_modules/.bin/typeorm schema:sync -c seed
ts-node ./node_modules/.bin/typeorm migration:run -c seed
