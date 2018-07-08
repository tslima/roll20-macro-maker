## Sinopse

Aplicação para facilitar o desenvolvimento de macros de ataque para **monstros** e **NPCs** no Roll20


## Executando o código

Apos clonar o código será necessário executar um ``` npm install ``` para instalar as dependências

O facebook exige que a url de autenticação seja feita via https mesmo para quando se esta utilizando o servidor no modo localhost. Para isso é necessário gerar os arquivos de certificado o procedimento está descrito abaixo

### Criando os certificados para utilizar https local

Retirei um passo a passo para realizar o procedimento deste [site](https://medium.freecodecamp.org/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec)

Primeiro é necessário gerar uma key utilizando o openssl

```
openssl genrsa -des3 -out rootCA.key 2048
```

Depois o root SSL Certificate
```
openssl req -x509 -new -nodes -key rootCA.key -sha256 -days 1024 -out rootCA.pem
```
Depois é necessário criar um arquivo chamado ```server.csr.cnf``` Com as seguintes configurações

```
[req]
default_bits = 2048
prompt = no
default_md = sha256
distinguished_name = dn

[dn]
C=US
ST=RandomState
L=RandomCity
O=RandomOrganization
OU=RandomOrganizationUnit
emailAddress=hello@example.com
CN = localhost
```

Depois um arquivo ``` v3.ext```
```
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
```
Depois um arquivo ``` server.key```
```
openssl req -new -sha256 -nodes -out server.csr -newkey rsa:2048 -keyout server.key -config <( cat server.csr.cnf )
```
Outro arquivo ```server.crt ```
```
openssl x509 -req -in server.csr -CA rootCA.pem -CAkey rootCA.key -CAcreateserial -out server.crt -days 500 -sha256 -extfile v3.ext
```

Por fim basta copiar os arquivos ``` server.key``` e ```server.crt ``` para a mesma pasta do ```server.js ```

### Script de Inicialização
Para que aplicação funcione é necessário definir algumas variáveis de ambiente o mais simples
é utilizar um script como abaixo

```bash
#!/bin/bash
export CALLBACK_URL=<URL de Callback para autorização do facebook>
export CLIENT_ID=<Seu client id obtido no facebook>
export CLIENT_SECRET=<Seu client secret obtido no facebook>
export MONGODB_URI=<URI do Mongo DB>
export ENV=development
export PORT=8443
node server.js
```

### Acessando a aplicação

Por fim basta acessar a url

```
https://localhost:8443
```

## Licença
### MIT License

Copyright (c) [2018] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
