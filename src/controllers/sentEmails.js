const transporterMail = require("../service/smtp");

class SentEmails {
    async sendemail(req, res) {
        const {
            sender_name,
            email, phone,
            sender_message,
            contact_refence,
            message_read } = req.body;

        if (!sender_name || !email || !phone || !sender_message || !contact_refence || !message_read) {
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

            return res.status(201).json({ message: "Menssagem enviada com sucesso" });
        } catch (error) {
            return res.status(422).json(error);
        }
    }
}

export default new SentEmails();