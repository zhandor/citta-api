# citta-api

CittaApi

Construir uma API REST com as seguintes operações:

Cadastrar Cidade
Editar Cidade
Remover Cidade
Consultar Cidade por Id
Pesquisar Cidades (nome)


A Cidade deve obedecer os seguintes campos:

nome (string) – Mínimo 3 e máximo 250 caracteres
uf (string) – 2 caracteres
area (number) -
população (number) -
ativo (boolean) – default true
timestamps – createdAt (date) e updatedAt (date)

OBS: 
Todos os campos são obrigatórios ok
O campo ativo não será informado no cadastro ok
Deve ser possível atualizar qualquer campo da cidade ok
As operações devem estar no path /cidades ok
A pesquisa deve sempre considerar as cidades ativas ok
Os campos createdAt e  updatedAt não serão atualizados via REST ok
A pesquisa de cidades deve considerar parte do nome, e sem considerar caracteres especiais ok
Ex: Buscar por pelo termo “Sao” deveria trazer por exemplo as cidades  “São Paulo”, “São Carlos”


Tecnologias

Express - https://expressjs.com/
Typescript (opcional) - https://www.typescriptlang.org/
MongoDB - https://www.mongodb.com/3
mongoose - https://mongoosejs.com/

