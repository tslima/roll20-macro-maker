## SINOPSE

Aplicação para facilitar o desenvolvimento de macros de ataque para **monstros** e **NPCs** no Roll20

## COMO RODAR

Para que aplicação funcione é necessário definir algumas variáveis de ambiente o mais simples
é utilizar um script como abaixo

```bash
#!/bin/bash
export CALLBACK_URL=<URL de Callback para autorização do facebook>
export CLIENT_ID=<Seu client id obtido no facebook>
export CLIENT_SECRET=<Seu client secret obtido no facebook>
export MONGODB_URI=<URI do Mongo DB>
node server.js
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
