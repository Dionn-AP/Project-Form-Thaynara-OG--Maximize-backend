const jwt = require('jsonwebtoken');
const knex = require('../service/connectionDB');

const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: "Usuário não autenticado" });
    }

    try {
        const token = authorization.replace('Bearer ', "").trim();

        const { id } = jwt.verify(token, process.env.SECRET_KEY);

        const userLogged = await knex('users')
            .where({ id })
            .first();

        if (!userLogged) {
            return res.status(404).json({ "mensagem": "Usuário não encontrado." })
        }

        req.user = userLogged;

        next();

    } catch {
        return res.status(400).json({message: "O token é inválido."})
    }
};

module.exports = authMiddleware;