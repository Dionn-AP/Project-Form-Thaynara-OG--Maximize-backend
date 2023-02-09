const bcrypt = require('bcrypt');
const transporterMail = require("../service/smtp");
const knex = require('../service/connectionDB');

const createuser = async (req, res) => {
    const { name, email, password } = req.body;

    try {

        const emailExists = await knex('users')
            .where({ email })
            .first();

        if (emailExists) {
            return res.status(400).json({ message: "Este email ja foi cadastrado. Favor escolha outro email" })
        };

        const hashPass = await bcrypt.hash(password, 10);

        const dataUser = await knex('users')
            .insert({
                name,
                email,
                password: hashPass
            });

        const newUser = await knex('users')
            .where({ email })
            .first();

        if (!newUser) {
            return res.status(400).json({ message: "Não foi possivel cadastrar o usuário" });
        }

        return res.status(201).json({ message: "Usuário cadastrado com sucesso" });

    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const getuser = async (req, res) => {
    return res.status(200).json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
};

const replaymessage = async (req, res) => {
    const { message, receiver_email, id_message } = req.body;
    const { user } = req;

    if (!message || !receiver_email) {
        return res.status(400).json({ message: "Você esta tentando enviar uma resposta em branco ou não informou o destinatário correto" });
    }

    const dataReplay = {
        sender_name: user.name,
        sender_email: user.email,
        receiver_email,
        message
    }

    try {

        const receiverExist = await knex("messages").where({ id: id_message }).first();

        if (!receiverExist) {
            return res.status(400).json({ message: "Mensagem não enviada" });
        }

        const dataEmail = {
            from: `${user.name} ${user.email}`,
            to: receiver_email,
            subject: `Oi ${receiverExist.sender_name}. É um prazer ter você aqui`,
            text: `${message}`
        };

        transporterMail.sendMail(dataEmail);

        const replay = await knex("replay").insert(dataReplay);

        if (replay.rowCount < 1) {
            return res.status(400).json({ message: "Mensagem não enviada" });
        }

        return res.status(200).json({ message: "Mensagem enviada com sucesso" });
    } catch (error) {
        return res.status(400).json(error.message);
    }
}


const updateuser = async (req, res) => {
    const { user } = req;
    const { name, email, password } = req.body;

    try {

        const emailExists = await knex('users')
            .where({ email })
            .first();

        if (emailExists) {
            if (emailExists.id !== user.id) {
                return res.status(400).json({
                    message: "O e-mail informado já está sendo utilizado por outro usuário"
                })
            }
        };

        const dataUpdateUser = {
            name: !name ? user.name : name,
            email: !email ? user.email : email,
            password: !password ? user.password : await bcrypt.hash(password, 10)
        }

        const userUpdated = await knex('users')
            .update(dataUpdateUser)
            .where({ id: user.id }).returning("*");

        if (!userUpdated) {
            return res.status(400).json({ message: "Não foi possível atualizar os dados do usuario" });
        }

        return res.status(200).json({ message: "Dados atualizados com sucesso" });

    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = {
    createuser,
    getuser,
    updateuser,
    replaymessage
}
