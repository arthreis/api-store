npm init -y
cria arquivo de conf nodejs

'use strict' 
Usado no arquivo JS (Deixa a interpretação do js mais criteriosa, não deixando interpretar caso haja erro or falta de ; e  etc)

npm install http express debug --save

pacote: express - cuida da parte do mvc
pacote: debug - serve para debugar a app
pacote: http - usado para criar o listener para ouvir uma porta e receber as requisicoes e respondelas.

const http = require('http')
Dessa forma a importação do pacote é buscada de dentro da pasta node_modules.

const xpto = require('./minhaaplicacao/xpto')
Dessa forma a importação do pacote é buscada da aplicacao levando em consideração as pastas.

npm install nodemon --save-dev
watcher para ficar observando quando os arquivos sao alterados e atualizar o servidor automaticamente.(OBS: o parametro -dev serve para que a dependencia nao seja enviado quando terminado desenvolvimento, fica em uma parte separada das dependencia da app)