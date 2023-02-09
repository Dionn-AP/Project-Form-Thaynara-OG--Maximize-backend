const knex = require('../service/connectionDB');
const transporterMail = require("../service/smtp");

async function sendemail(req, res) {
    const {
        sender_name,
        email,
        phone,
        company,
        sender_message,
        contact_reference,
        message_read } = req.body;

    if (!sender_name || !email || !phone || !company || !sender_message || !contact_reference) {
        return res.status(422).json({ message: 'Você precisa preencher todos os campos obrigatórios' });
    }

    try {
        const dataEmail = {
            from: 'Contato <nao-responder@contato.com.br>',
            to: email,
            subject: `Olá ${sender_name}. É um prazer ter você aqui`,
            text: `Sua mensagem foi enviada com sucesso à acessoria e setor de comunicação. Em breve retornaremos o seu contato.`
        };

        transporterMail.sendMail(dataEmail);

        const messageSent = await knex('messages')
            .insert({
                sender_name,
                company,
                email,
                phone,
                contact_reference,
                sender_message,
                message_read
            })

        if (!messageSent) {
            return res.status(400).json({ message: "Mensagem não enviada" });
        }

        return res.status(201).json({ message: "Mensagem enviada com sucesso" });
    } catch (error) {
        return res.status(422).json(error);
    }
}

async function viewmessages(req, res) {

    try {
        const allMessages = await knex('messages').returning("*");

        if (allMessages.lenght === 0) {
            return res.status(400).json({ message: "Você não possui nenhuma mensagem a ser exibida" });
        }

        return res.status(201).json(allMessages);
    } catch (error) {
        return res.status(422).json(error.message);
    }
}

async function messageread(req, res) {
    const { id } = req.params;

    const messageExist = await knex("messages").where({ id: id }).first();

    if (!messageExist) {
        return res.status(400).json({ message: "Houve um erro ao ler os dados da mensagem" });
    }

    if (messageExist.message_read === true) {
        return res.status(400).json({ message: "Essa mensagem ja foi lida" });
    }

    const dataUpdated = { ...messageExist, message_read: true }

    try {
        const messageReade = await knex("messages")
            .update(dataUpdated)
            .where({ id: id }).returning("*");

        if (!messageReade) {
            return res.status(400).json({ message: "Não foi possível atualizar os dados da mensagem" });
        }

        return res.status(200).json({ message: "Dados atualizados com sucesso" });

    } catch (error) {
        return res.status(422).json(error.message);
    }
}


module.exports = {
    sendemail,
    viewmessages,
    messageread
}