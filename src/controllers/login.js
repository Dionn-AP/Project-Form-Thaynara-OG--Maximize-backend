import User from '../models/Users';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class Login {
    async authenticate(req, res) {
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

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        const dataUser = {
            id: user._id,
            name: user.name,
            email: user.email
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        
        if (!checkPassword) {
            return res.status(422).json({ message: "Email ou senha inválidos" });
        }

        try {
            const secret = process.env.SECRET_KEY;
            const token = jwt.sign({ id: user._id, }, `${secret}`, { expiresIn: '5h' });

            res.status(200).json({ ...dataUser, token })
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}


export default new Login();

