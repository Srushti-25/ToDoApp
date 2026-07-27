
const authModel = require("../models/auth.model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const validator = require('validator');
const isProduction = process.env.NODE_ENV === "production";
console.log("isprd", isProduction);

console.log("isProduction:", isProduction);
exports.userRegister = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(422).json({
            success: false,
            message: "All fields are required!"
        });
    }
    try {
        const isEmail = validator.isEmail(email);
        if (!isEmail) {
            return res.status(400).json({
                success: false,
                message: "This email is Invalid "
            });
        }
        const existingUser = await authModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "This email is already registered. Please login."
            });
        }
        const strongPassword = validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        });
        if (!strongPassword) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters and include uppercase, lowercase, number, and symbol."
            });
        }
        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(password, salt)
        const user = await authModel.create({ name, email, password: hashPassword });
        const { password: pwd, ...safeUser } = user._doc;
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "2d" });

        res.cookie("token", token
            , {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 2 * 24 * 60 * 60 * 1000
            }
        )
        return res.status(200).json({
            success: true,
            message: "Registered successfully!",
            data: safeUser,
            token
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({
            success: false,
            message: "All fields are required!"
        });
    }
    try {
        const isEmail = validator.isEmail(email);
        if (!isEmail) {
            return res.status(409).json({
                success: false,
                message: "This email is Invalid "
            });
        }
        const user = await authModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "This email not register plase register first"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Password Not match"
            })
        }
        const { password: pwd, ...safeUser } = user._doc
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "2d" });
        res.cookie("token", token
            , {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 2 * 24 * 60 * 60 * 1000
            }
        )
        return res.status(200).json({
            success: true,
            message: "Login successfully!",
            data: safeUser,
            token
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.profile = async (req, res) => {
    try {
        const user = await authModel.findById(req.userId).select("-password");
        return res.status(200).json({
            success: true,
            message: "User profile fetched successfully",
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
exports.logOut = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    return res.status(200).json({
        success: true,
        message: "Logout successfully"
    });
}