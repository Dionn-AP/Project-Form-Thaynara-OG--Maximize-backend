
## 💻 Sobre o projeto

🎓 Desafio (Thaynara OG - Challenge), proposto pela empresa Maximize para concorrência à vaga de estágio (Frontend). Trata-se de um formulário para que qualquer pessoa possa enviar uma mesagem com proposta de contato à pessoa fictícia em questão (Thaynara OG). Após enviar sua mensagem o destintário recebe um email de confirmação e saudação. Também conta com um serviço de CMS/Manager, onde a "Thanara OG" poderá acessar o sistema e visualizar na sua caixa de entrada dentro da própria aplicação, as mensagem recebidas, bem como respondê-las. Abaixo segue algumas funcionalidades da aplicação: 

- Login de usuário (nessa etapa há apenas um usuário em questão, então trata-se de um login administrativo)
- Usuário externo poderá enviar mensagens ao proprietário do site (pessoa fictícia em questão)
- Visualizar mensagens recebidas
- Responder ao email recebido

---

## Endpoints

### URL principal
```
https://contact-forms-qgj8.onrender.com/
```
### Abaixo estão listadas as URLs que serão utilizadas para acessar a API.

#### Obs1: O formato de comunicação dos dados é JSON. Toda request com payload em JSON deverá conter o header **Content-Type: application/json**

#### Obs2: O **token** de acesso obtido é o token que você precisa passar no header de algumas das requests subsequentes.
```
Authorization: Bearer {accessToken}
```
---
### /user (post)

Essa rota posibilita criar um novo usuário através do fornecimento de nome, email e senha. Não precisa de autenticação.

#### Body Parameters


| Parameters | Type | Description |
| -------- | -------- | -------- |
| name     | string     | name do usuário     |
| email    | string   | email do usuário|
| password | string | senha do usuário |

#### Request

```
{
    "name": "Fulano de Tal",
    "email": "fulanodetal@email.com",
    "password": "12345678"
}
```

#### Response (201)
```
{
    message: "Usuário cadastrado com sucesso"
}


Obs: São retornado os dados cadastros
```
### Possíveis erros de cadastro de usuário
#### Error (400) - O email escolhido para cadastro já existe

```
{
    "message": "Este email ja foi cadastrado. Favor escolha outro email"
}
```

#### Error (400) - Erro ao se cadastrar

```
{
    "message": "Não foi possivel cadastrar o usuário"
}
```


---
### /login (post)

Essa rota permite logar no sistema, informando email e senha cadastrados anteriormente. Não precisa de autenticação.

#### Body Parameters


| Parameters | Type | Description |
| -------- | -------- | -------- |
| id     | number   |  id único do usuário |
|  name  |  string  |   nome do usuário  |
| email    | string   | email do usuário|
| password | string | senha do usuário |
| token   | string  | token de autenticação |

#### Request

```
{
    "email": "fulanodetal@email.com",
    "password": "12345678"
}
```

#### Response (200)
```
{
    
    "id": 1,
    "name": "Fulano de Tal",
    "email": "fulanodetal@email.com"
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc1ODgyODgzLCJleHAiOjE2NzU5MDA4ODN9.hZMnv0GdrYtuRVCQgEdySdDps2Vqx_TfNOIyiv04qbw"
}

```
### Possíveis erros de login de usuário
#### Error (422) - Email não informado na requisição

```
{
    "message": "Você precisa informar um email"
}
```

#### Error (422) - Senha não informado na requisição

```
{
    "message": "Você precisa informar uma senha"
}
```

#### Error (422) - Email e senha não informados na requisição

```
{
    "message": "Você precisa informar um email e senha"
}
```

#### Error (404) - Não foi possível localizar os dados do usuário

```
{
    "message": "Usuário não encontrado"
}
```

#### Error (404) - Email ou senha inválidos

```
{
    "message": "Email ou senha inválidos"
}
```


---
### /user (get)

Essa rota serve para resgatar os dados do usuário. Necessita de autenticação.

#### No Body Parameters


| Parameters | Type | Description |
| -------- | -------- | -------- |
| id     | number   |  id único do usuário |
|  name  |  string  |   nome do usuário  |
| email    | string   | email do usuário|

#### Request

```
Os dados do usuário logado são resgatados através das informações extraídas do Headers pelo (token)
```

#### Response (200)
```
{
    "id": 1,
    "name": "Fulano de Tal",
    "email": "fulanodetal@email.com"
}
```

---
### /sendmail (post)

Nessa rota, o usuário poderá enviar um email, que seria consumido por um forms no frontend. Não precisa de autenticação.

#### Body Parameters


| Parameters | Type | Description |
| -------- | -------- | -------- |
| sender_name  | string   |  nome do remetente |
|  email  |  string  |   email do remetente  |
| phone    | string   | telefone do remetente|
| company    | string   | nome da empresa do remetente|
| sender_message    | string   | conteúdo da mensagem|
| contact_reference    | string   | assunto da mensagem|
| message_read    | boolean   | toda mensagem enviada tem seu valor *default* como *false*, significa que essa mensagem ainda não foi lida pelo destinatário |

#### Request

```
{
    "sender_name": "Fulano de Tal",
    "email": "fulano@email.com", 
    "phone": "98912345678",
    "company": "Empresa",
    "sender_message": "Olá, eu sou o Fulano de Tal. Gostaria de conversar     sobre empreendimentos.",
    "contact_reference": "Négócios",
    "message_read": false
}
```

#### Response (201)
```
{
    "message": "Mensagem enviada com sucesso"
}
```

### Exemplo de mensagem automática recebida pelo remetente após enviar uma mensagem. Email do tipo *hotmail*
![](https://i.imgur.com/dNXtEsS.png)



### Possíveis erros de envio de mensagem no formulário
#### Error (422) - Quando existe algum campo em branco na requisição

```
{
    "message": "Você precisa preencher todos os campos obrigatórios"
}
```

#### Error (422) - Houve um erro ao tentar enviar a mensagem

```
{
    "message": "Mensagem não enviada"
}
```

---
### /viewmessages (get)

Com essa rota o usuário poderá listar todas as mensagens recebidas. Necessita de autenticação.

#### No Body Parameters


| Parameters | Type | Description |
| -------- | -------- | -------- |
| id  | number   |  id único da mensagem recebida |
|  sender_name  |  string  |   nome do remetente  |
| company    | string   | nome da empresa do remetente|
| email    | string   | email do remetente|
| phone    | string   | telefone do remetente|
| contact_reference    | string   | assunto da mensagem|
| message_read    | boolean   | *false* se o destinatário ainda não tiver lido a mensagem ou *true* caso ele ja tenha lido a mensagem |

#### Request

```
Sem dados enviado no body da requisição
```

#### Response (201)

```
{
    "sender_name": "Fulano de Tal",
    "email": "fulano@email.com", 
    "phone": "98912345678",
    "company": "Empresa",
    "sender_message": "Olá, eu sou o Fulano de Tal. Gostaria de conversar     sobre empreendimentos.",
    "contact_reference": "Négócios",
    "message_read": true
}
```

#### Não é exatamente um *erro*

#### Error (404) - Quando não há mensagens recebidas a serem resgatadas na requisição

```
{
    "message": "Você não possui nenhuma mensagem a ser exibida"
}
```


---
### /messageread/:id (patch)

Essa rota serve para mudar o valor do campo *message_read* da tabela *messages*. A mudança só ocorre uma única vez. Quando o usuário abre a mensagem recebida, ela muda seu valor de *false* para *true*.

#### Request

```
O id da mensagem é enviado pelo parâmetro da rota.

Exemplo: https://contact-forms-qgj8.onrender.com/messageread/1
```
#### Response (200)

```
{
    "message": "Dados atualizados com sucesso"
}
```

### Possíveis erros ao tentar mudar o *status* da mensagem para *lida (true)* 
#### Error (400) - Erro ao carregar os dados solicitados

```
{
    "message": "Houve um erro ao ler os dados da mensagem"
}
```



#### Error (422) - Quando a mensagem já foi lida, ela não pode voltar ao *status* de *não lida (false*)

```
{
    "message": "Essa mensagem ja foi lida"
}
```

#### Error (400) - Houve um erro ao tentar alterar o *status* da mensagem de *não lida (false)* para *lida (true)*

```
{
    "message": "Não foi possível atualizar os dados da mensagem"
}
```

---
### /replay (post)

Nessa rota é possível responder à uma mensagem recebida. Necessita de autenticação.

#### Body Parameters


| Parameters | Type | Description |
| -------- | -------- | -------- |
| id_message  | number   |  id único da mensagem recebida |
|  receiver_email  |  string  |   email do remetente da mensagem à ser respondida  |
| message    | string   | conteúdo da mensagem|

#### Request

```
{
    "id_message": 1,
    "receiver_email": "fulanodetal@email.com",
    "message": "Oi. Entro em contato assim que possível, estou viajando no momento."
}
```
#### Response (200)

```
{
    "message": "Mensagem enviada com sucesso"
}
```

### Exemplo de mensagem respondida à email do tipo *hotmail*

![](https://i.imgur.com/ZX9zhYm.png)



### Possíveis erros ao tentar responder uma mensagem recebia 
#### Error (400) - Erro ao tentar enviar a mensagem em branco

```
{
    "message": "Você esta tentando enviar uma resposta em branco ou não informou o destinatário correto"
}
```

#### Error (400) - Erro ao tentar enviar a mensagem

```
{
    "message": "Mensagem não enviada"
}
```

---

    
---
## 🚀 Como executar o projeto

```bash

# Clone este repositório
$ git clone https://github.com/Dionn-AP/Project-Form-Thaynara-OG--Maximize-backend.git

# Acesse a pasta do projeto no seu terminal/cmd
$ cd Project-Form-Thaynara-OG--Maximize-backend

# Instale as dependências
$ npm install

ou

$ yarn install

# Execute a aplicação
$ npm run dev

ou

$ yarn start

```
---
## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### **Website**  
- **[Node](https://nodejs.org/en/)**
- **[Express](https://expressjs.com/pt-br/)**
- **[Knex](https://knexjs.org/)**
- **[PostgresSQL](https://www.postgresql.org/)**
- **[Dotenv](https://www.npmjs.com/package/dotenv)**
- **[Bcrypt](https://www.npmjs.com/package/bcrypt)**
- **[Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)**
- **[Javascript](https://www.javascript.com/)**
- **[Cors](https://www.npmjs.com/package/cors)**
- **[Nodemailer](https://nodemailer.com/about/)**
- **[Nodemon](https://www.npmjs.com/package/nodemon)**    

> Veja o arquivo  [package.json](https://github.com/Dionn-AP/Project-Form-Thaynara-OG--Maximize-backend/blob/main/package.json)

#### **Utilitários**

- Protótipo:  **[Figma](https://www.figma.com/)**
- Banco de Dados:  **[Supabase](https://supabase.com/)**
- Deploy da Aplicação: **[Render](https://dashboard.render.com/)**
- Editor:  **[Visual Studio Code](https://code.visualstudio.com/)**
- Markdown:  **[HackMD](https://hackmd.io/)**
- Teste de API:  **[Postman](https://www.postman.com/)**
---
## 👨‍💻 Desenvolvedor

👏 Esse que vos fala!

<table>
  <tr>
    <td align="center" style="padding: "><a href="https://portifolio-dionnatan.netlify.app/"><img style="border-radius: 50%;" src="https://github.com/Dionn-AP.png" width="100px;" alt=""/><br /><sub><b>Dionnatan Alves</b></sub></a><br />
        <h4>Portifólio</h4>        
      </td>
    
  </tr>
</table>
