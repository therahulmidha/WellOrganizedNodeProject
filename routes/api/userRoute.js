const router = require('express').Router();
const { User, validateUser } = require('../../model/User');
const bcrypt = require('bcryptjs');
router.post('/login', async (req, res, next) => {
    try {
        const { error } = validateUser(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message, data: null });
        }

        let user = await User.findOne({email: req.body.email});
        if (!user) {
            // 400; not 404 to show user if there is no user
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword){
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = user.generateAuthToken();
        res.send(token);

    } catch (error) {
        next(error);
    }
});

router.post('/register', async (req, res, next) => {
    try {
        const { error } = validateUser(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message, data: null });
        }

        const {email, password} = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({
            email,
            password
        });

        // more the rounds, more it takes for generate; use 10 which is default
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        const token = user.generateAuthToken();
        res.header('x-auth-token', token).json({
            message: `User created successfully`,
            data: user
        });


    } catch (error) {
        next(error);
    }
});


module.exports = router;