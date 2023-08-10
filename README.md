# Como rodar o projeto localmente

- Clone ou baixe diretamente o repositório
- Entre na pasta do projeto e no terminal, seja no do sistema ou do seu editor de código, digite npm install para instalar as dependências
- Ao finalizar a instalação, digite npm run dev para rodar localmente o projeto

# Itens obrigatórios para a aplicação 

- [x] Adicionar, editar e excluir uma transação; 
- [x] Visualizar as transações em uma tabela; 
- [x] Visualizar o total das transações de entrada, saída e o total da conta (entradas - saídas); 
- [x] Os filtros citados devem estar funcionando; 
- [x] Persistir os dados (salvar a lista de transações no localStorage ou algum banco de dados); 
- [x] Usar ContextAPI; 

# Itens opcionais 
- [ ] Realizar testes unitários; 
- [ ] Mais filtros; 
- [ ] Mostrar subtotal de entradas / saídas de acordo com o filtro de categoria. 
- [x] A entrega deve ser feita em um repositório público do GitHub e um link com a aplicação rodando. 


# Desafios encontrados

- Tive um problema com o uso de hooks no lado do servidor na versão na qual iniciei o projeto com o
  uso do 'use client'. Depois delongas buscas inclusive no rpositório do própio Nextjs tive como solução
  setar uma versão anterior a qual eu estava usando e o erro foi corrigido.

- A inicializalçao do local storage como vazia foi um problema na hora de buildar para isso resolvi da seguinte maneira: Desacoplando o acesso ao local storage,  ao invés de acessar o localStorage em todos os lugares do seu aplicativo, você o acessa apenas uma vez em um lugar específico (antes de mostrar os dados aos usuários). Isso garante que você não tenha problemas quando estiver construindo (fazendo o build) do seu aplicativo, pois o localStorage não existe nesse momento. Em vez disso, você só o acessa quando está pronto para mostrar os dados aos usuários. Tinha também a opção de fazer a verificação if (typeof window !== 'undefined') mas não consegui implementar de forma efetiva.

# Tecnologias Utilizadas

- NextJS 13.x.x
- SASS
- Visual Code para edição de código
- Vercel para deploy da aplicação
- Git e Github como repositório do código e controle de versão

# Preview

<img src="" alt="Preview da aplicação"/>

# Aplicação Live

- Optei por uma versão live da aplicação para melhor visualização, e para isso utilizei a Vercel.

Segue link da aplicação: <a href="" title="Link para a aplicação" target="_blank"> SenseData Frontend Challenger </a>
