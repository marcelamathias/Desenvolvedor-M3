# Catálogo de Produtos

Este é um projeto de catálogo de produtos em TypeScript, que permite aos usuários visualizar produtos, adicioná-los ao carrinho e ver a contagem de itens no carrinho. O projeto também inclui funcionalidades de filtragem e ordenação.

## Funcionalidades

- Visualizar a lista de produtos a partir de uma API.
- Adicionar produtos ao carrinho.
- Atualizar a contagem de itens no carrinho.
- Filtrar produtos por várias opções.
- Ordenar produtos.

### Dependências

O projeto possui um setup pronto no qual há a necessidade de possuir o nodejs instalado na versão 14 ou superior.

Para instalar as dependências só é preciso executar o comando: `npm install`

O dar start no server e nos processos para desenvolvimento é necessário rodar o comando: `npm start `

Uma ver que o comando é dado ele irá levantar 2 servidores, sendo eles:

- um para acessar o front-end que roda na porta 3000. No qual pode ser acessado pela url: http://localhost:3000
- um para o json-server que irá export uma api com a lista de produtos que roda na porta 5000. Para acessar os produtos é na url: http://localhost:5000/products

## Como Usar

1. Clone este repositório.
2. use o `npm start`.

## Estrutura do Código

- `index.ts`: O ponto de entrada do aplicativo que inicializa as funcionalidades.
- `types.ts`: Define os tipos de dados usados no projeto.
- `main.scss`: Arquivo que chama todo os arquivos SCSS.

## Desenvolvimento

Para fazer alterações ou desenvolver novos recursos, você pode seguir as seguintes etapas:

1. Instale as dependências usando `npm install`.
2. Faça suas alterações no código.
3. Execute `npm run build` para compilar o código TypeScript.
4. Abra o arquivo `index.html` em seu navegador para testar as alterações.

## Autor

Marcela Mathias

## Licença

Este projeto é de código aberto e está disponível sob a Licença MIT.
