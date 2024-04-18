const User = require('../models/User');

// user creation
exports.createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, contact, address, pincode } = req.body;
        const newUser = new User({ firstName, lastName, email, contact, address, pincode });
        await newUser.save();
        res.send('User created successfully');
    } catch (error) {
        res.send('Failed to create user');
    }
};

//to get users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.send('Failed to fetch users');
    }
};


exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.send('User not found');
        } else {
            res.json(user);
        }
    } catch (error) {
        res.send('Failed to fetch user');
    }
};

//update a user
exports.updateUser = async (req, res) => {
    try {
        const { firstName, lastName, email, contact, address, pincode } = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { firstName, lastName, email, contact, address, pincode }, { new: true });
        if (!updatedUser) {
            res.send('User not found');

        } else {
            res.send('User updated successfully');

        }
    } catch (error) {
        res.send('Failed to update user');
    }
};


//delete a user
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            res.send('User not found');
        } else {
            res.send('User deleted successfully');
        }
    } catch (error) {
        res.send('Failed to delete user');
    }
};
