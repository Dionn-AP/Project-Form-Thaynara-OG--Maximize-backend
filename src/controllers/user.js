const User = require('../models/Users');
const bcrypt = require('bcrypt');

class Usercontroller {
    async createuser(req, res) {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email: email });

        if (userExists) {
            return res.status(422).json({ message: "Por favor, utilize outro e-mail" });
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const dataUser = {
            name,
            email,
            password: passwordHash
        }

        try {
            await User.create(dataUser);
            return res.status(201).json({ message: "Cadastro concluído com sucesso" });
        } catch (error) {
            return res.status(404).json(error);
        }
    }

    async getuser(req, res) {
        const id = req.userId;

        try {
            const user = await User.findById(id, '-password');

            if (!user) {
                return res.status(422).json({ message: 'O usuário não foi encontrado!' });
            }

            res.status(200).json(user);
        } catch (error) {
            return res.status(422).json(error);
        }
    }

    async updateuser(req, res) {
        const id = req.userId;
        const { name, email } = req.body;

        const user = { name, email }

        try {
            const updatedUser = await User.updateOne({ _id: id }, user);

            if (updatedUser.matchedCount === 0) {
                return res.status(422).json({ message: 'Nenhuma dado foi atualizado' });
            }

            res.status(200).json(user);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        if (id !== req.userId) {
            return res.send({ message: "Você não pode apagar os dados de outros usuários" });
        }

        const user = await User.findOne({ _id: id });

        if (!user) {
            res.status(422).json({ message: 'O usuário não foi encontrado!' });
            return
        }

        try {
            await User.deleteOne({ _id: id });

            res.status(200).json({ message: "Usuário removido com sucesso." });
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

export default new Usercontroller();
