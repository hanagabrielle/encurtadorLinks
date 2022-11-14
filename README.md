# Exemplo pratico de sequelize ORM e sqlite com NodeJs
<p align="left">
<img src="http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge"/>
</p>
Servidor nodejs usado para criar, salvar e gerenciar links encurtados.

Esse projeto e um exemplo pratico para demostrar o uso de sequelize como ORM juntamente com sqlite.
Alem disso, demonstrar na pratica o uso de clean architecture e clean code. Cada camada do software e minimamente acoplada a camada abaixo, deixando facil com que mudancas sejam feitas com o minimo de impacto no codigo.

As camadas sao facilmente perceptiveis atraves dos controllers, services e models.

# :link: Funcionalidades do projeto

- `Criar links encurtados`: A partir de uma url qualquer, gerar um encurtamento para acessar essa mesma url de forma mais pratica.
- `Liberar ou bloquear links`: Esses mesmos links podem ser desabilitados e recriados de forma simples e rapida.
- `Listar encurtamentos`: Servir uma lista de todos os encurtamentos ativos, facilitando ainda mais o acesso aos links registrados.

# Utilizacao do servico
Para a instalacao de todos os pacotes:
```
npm i 
```

Inicializacao do servidor node:
```
npm start
```

Servidor ligado, acesse o swagger com todos os endpoints e instrucoes detalhadas de uso:
```
http://localhost:3000/api-docs
```

# Tecnologias utilizadas

- `NodeJs`
- `Sequlize ORM`
- `SQLite`
- `Swagger`