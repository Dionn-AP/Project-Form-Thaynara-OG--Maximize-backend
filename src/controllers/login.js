const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const knex = require('../service/connectionDB');

async function authenticate(req, res) {
    const { email, password } = req.body;

    if (!email && password) {
        return res.status(422).json({ message: 'Você precisa informar um email.' });
    }
    if (email && !password) {
        return res.status(422).json({ message: 'Você precisa informar uma senha.' });
    }
    if (!email && !password) {
        return res.status(422).json({ message: 'Você precisa informar um email e senha.' });
    }

    const userFound = await knex('users')
        .where({ email })
        .first();

    if (!userFound) {
        return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const dataUser = {
        id: userFound.id,
        name: userFound.name,
        email: userFound.email
    }

    const checkPassword = await bcrypt.compare(password, userFound.password);

    if (!checkPassword) {
        return res.status(422).json({ message: "Email ou senha inválidos" });
    }

    try {
        const secret = process.env.SECRET_KEY;
        const token = jwt.sign({ id: userFound.id, }, `${secret}`, { expiresIn: '5h' });

        res.status(200).json({ dataUser, token })
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {
    authenticate
}

