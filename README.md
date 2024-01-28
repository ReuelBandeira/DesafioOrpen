<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Tecnologias usadas <br></br>
-[NodeJS]
-[Nestjs]
-[mongodb]
-[Swagger]


## Clone o Projeto para o ambiente local <br></br>

✔️ Para clonagem do projeto:

```sh
git clone https://github.com/ReuelBandeira/DesafioOrpen.git
```
Adicione usuário e senha do git para clonar o repositório.

------------------------------------------------

### Sobre o .env <br></br>

 ✔️ Seu arquivo .env já esta configurado e esse acesso ao banco de dados mongodb é um serviço online criado para o projeto;

------------------------------------------------
## Inicializar com docker <br></br>
✔️ É preciso ter instalado  o docker e o Docker-compose, recomendações:
  Docker versão 24.0.2 LTS (ou versão superior LTS)
  Docker-compose versão 1.29.2 LTS (ou versão superior LTS)

Na raiz do backend você deve executar :

```sh
docker-compose up --build
```
ou se tiver erro de permissões
```sh
sudo docker-compose up --build
```
OBS:Se você está enfrentando problemas relacionados ao cache no Docker,pode utilizar esse comando para limpeza e refazer o passo anterior:

```sh
docker system prune --all --force --volumes
```

Se tudo ocorreu bem o projeto já esta estartado com sucesso!!

----------------------------------

## Visualizar a documentação das Rotas <br></br>

✔️ Você pode acessar em seu navegador após iniciar o projeto, as documentações do Swagger em:

```sh
http://localhost:3007/api#/
```

## Testes das Rotas <br></br>

✔️ Sobre as rotas do backend,podem ser testadas pela aplicação Insomnia ou Postman;
✔️ Caso utilize o Insomnia, na raiz do projeto dentro da pasta Insomnia tem o arquivo (rotas_desafio_orpen.json), que pode ser importado no insomnia;

1- Consulta dados meteorológicos e salva no banco de Dados:

✅Metodo GET

```sh
http://localhost:3007/orpen/weather
```

Parâmetros- (city) e (country) são obrigatórios do tipo:Headeres

2- Consulta o historico de dados meteorológicos pesquisados na rota anterior:

✅Metodo GET

```sh
http://localhost:3007/orpen/history
```

3- Consulta o historico de dados meteorológicos porém com paginação e filtro,somente dados não deletados

✅Metodo GET

```sh
http://localhost:3007/orpen/history/pagination
```

Parâmetros-page(number-ex:1),limit(number-ex:10),filter( Object-ex:{"city":"manaus"})

4-Edição de dados consultados:

✅Metodo PATCH

```sh
http://localhost:3007/orpen/id/:_id
```

Parâmetros:

```sh
{
			"city": "Gotham",
			"country": "BR",
			"weatherData": {
        "id": 1000,
				"main": "Clouds",
				"description": "broken clouds",
				"icon": "04d"}
}
```

5-Exclusão de dados consultados mudando o delete de false para true:

✅Metodo Delete

```sh
http://localhost:3007/orpen/id/:_id  
```

## Opcional Instalação e configurações de pacotes <br></br>

Caso deseje estartar sem o docker, no diretório do projeto execute os seguintes comandos para instalar os pacotes

```shestartar
sudo yarn install
```
Após instalação dos pacotes rode o projeto com o comando:

```sh
yarn start
```
Se tudo ocorreu bem o projeto já esta estartado com sucesso!!

