# Histórico do Desenvolvimento do Projeto (Front/Backend)


## **Frontend**

Para desenvolver a parte de frontend, eu escolhi uma biblioteca do Javascript chamada React.
A escolha dessa biblioteca foi devido à sua performance de produção usando o método de componentização de elementos e controle de estados.
O projeto foi criado com o comando ***cra***, o qual ja trás as estruturas de pastas pronta para execução e implementação de um projeto.

### Sobre o método de estilização 
Eu utilizei um framework CSS chamado **[Tailwind CSS](https://tailwindcss.com/docs/installation)**.
Apesar de deixar o *html* do projeto um pouco *verboso*, essa ferramenta garante mais produtividade, pois ela usa o método de estilização por *classes*. E como esse não é um projeto de grande porte, que não necessitará de muitas manutenções futuras, a escolha da ferramento foi baseada na produtividade.
Outro motivo da minha escolha, foi o fato de eu estar aprendendo a usar esse *framework*, então eu queria por em prática.
Uma *lib* muito interessante que eu usei na estilização foi o ***[clsx](https://www.npmjs.com/package/clsx)***. Com ela, podemos fazer estilizações condicionais diretamente na *className* do elemento.

### Algumas dificuldades na estilização
#### Tailwind (Responsividade)
Bom, como não sou um profundo conhecedor da ferramenta **[Tailwind](https://tailwindcss.com/docs/installation)**, tive alguns atrasos em determinados momentos, mas especificamente na hora de fazer a responsividade das páginas. Mas o bom é que esse *framework* conta com uma documentação bem clara e completa, o que me ajudou muito.

#### Design System (Datatable)
Infelizmente não consegui utilizar um *Datatable* que pretendia, pois esta com muita dificuldade para a estilização da tabela. Tentei usa uam tabela do **[Material UI](https://mui.com/material-ui/getting-started/installation/)**, porém não obtive sucesso. Pensei em usar o **[Radix](https://www.radix-ui.com/docs/primitives/overview/introduction)**, porém ele não possui DataTables, e como ja havia perdido um bom tempo tentando usar a ferramenta do *MUI*, resolvi fazer eu mesmo, sem ajuda de *DesignSystem*.

### Sobre a API de requsiçoes

Eu utilizei o **[Axios](https://axios-http.com/ptbr/docs/intro)** por ja conhecer e ter usado em outros projetos meu. É um ótimo cliente *HTTP*, pois ele roda com a mesma base de código tanto no servidor quanto on lado do cliente.

### Sobre o deploy da aplicação
Eu utilizei para deploy da aplicação, o site da **[Netlify](https://www.netlify.com/)**. É fácil de executar, não precisa de muito comando ou etapas, e possui *auto-deploy* baseado no *push* para o repositório raiz do projeto. Houveram apenas algumas falhas devido à regras de *ESLint*, mas que foram corrigidas e a aplicação já está rodando no seguinte link:  **[Acesse aqui](https://contact-thayog.netlify.app/)**

---

## **Backend**

Para o backend do projeto eu escolhi o **[Node](https://nodejs.org/en/)** e mais algumas dependências que irei falar a seguir.

### Sobre requisições
O framework que eu utilizei para gerencias as requisições do servidor foi o **[Express](https://expressjs.com/pt-br/4x/api.html)**.

### Sobre o serviço de email

Eu escolhi essa biblioteca **[Nodemailer](https://nodemailer.com/about/)** pela sua simplicidade de configuração.

Para o servidor de emails eu utilezei um domínio configurado no **[Mailgun](https://www.mailgun.com/es/)**

### Sobre o Banco de Dados

Inicialmente eu escolhi o **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)**, pois queria trazer algo diferente para o projeto, do que o convencional *SQL*. Ele é um banco de dados *Não relacional*, o que serviria muito bem para esse tipo de aplicação, porém tive problemas. Após ter feito alguns dos *Schemas* de cada *collection*, quando tentei estabelecer a conexão com o servidor e não obtive sucesso. Eu já utilizo esse serviço em um outro projeto *mobile* que estou desenvolvendo chamado **[Minha Agenda - *version client*](https://github.com/Dionn-AP/minha-agenda-server)**, porém, mesmo aplicando as mesma configurações, e após muita pesquisa para solucionar o problema, de alguma forma, não funcionava, nem mesmo utilizando as mesma credenciais do banco do meu projeto *mobile* para tentar estabelecer conexão, não otive sucesso. Então resolvi mudar o tipo de banco.

Usei o servidor chamado **[Supabase](https://supabase.com/)**, com linguagem *SQL* utilizando sistema Postgres do próprio **Supabase**. Eu gosto de hospedar minhas aplicações *backend* no **Supabase** pois é extremamente fácil e rápido de configurar, e em poucos minutos, você já pode fazer suas requisições.

### Sobre as Query da aplicação

Eu utilizei um *query-builder* para bancos relacionais chamado **[Knex](https://knexjs.org/)**. Ele facilita na construção das query de forma simples e com pouquíssimas linhas de código você faz uma consulta ou criação no banco de dado.

### Sobre o deploy da aplicação

Eu fiz o deploy da aplicação em um servidor que conheci a pouco tempo, mas que tem me atendido bem, o **[Render](https://render.com/)**. Eu já tenho 3 aplicações rodando nele. Tem um plano *free* limitado, e dar pra testar aplicações em desenvolvimento tranquilamente. É simples de configurar, só demora um pouco o processo de build e deploy.

---

## Melhorias
### Editar dados do usuário
Será possível editar o *nome, email e senha* do usuário.

### Notificações
Quando o usuário estiver logado e receber um email, uma notificação aparecerá no navegador.

### Design System
Melhorar o estilo de exibição das mensagens de erro e sucesso e carregamento de dados, bem como o tipo de tabela utilizado.

### Design de telas
Recriar o *design* das páginas de **login** e **inbox**.

---
---
## **Fim...** 
