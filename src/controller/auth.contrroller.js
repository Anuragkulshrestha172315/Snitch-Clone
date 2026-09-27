import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import {
  createAccessToken,
  createRefreshToken,
  readRefreshToken,
} from "../utils/auth.utils.js";

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    const isExist = await userModel.findOne({ email });

    if (isExist) {
      return res.status(400).json({
        message: "User already exist with this email address",
        errors: [
          {
            path: "email",
            message: "User already exist with this email address",
          },
        ],
      });
    }

    const user = await userModel.create({
      name,
      email,
      passwordHash: await bcrypt.hash(password, 10),
    });

    const accessToken = await createAccessToken({
      userId: user._id,
      role: user.role,
    });
    const refreshToken = await createAccessToken({
      userId: user._id,
      role: user.role,
    });

    (res.cookie("refreshToken", refreshToken),
      {
        httpOnly: true,
      });
    await userModel.findByIdAndUpdate(user._id, {
      refreshToken: refreshToken,
    });
    return res.status(201).json({
      message: "User registered successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        accessToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: `Internal server error ${error}`,
    });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid Email or Password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid Email or Password",
    });
  }

  const accessToken = createAccessToken({
    userId: user._id,
    role: user.role,
  });
  const refreshToken = createRefreshToken({
    userId: user._id,
    role: user.role,
  });

  await userModel.findOneAndUpdate(
    {
      email,
    },
    {
      refreshToken,
    },
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  });

  res.status(200).json({
    message: "User LoggedIn Successfully",
    data: {
      user: {
        userId: user._id,
        email: user.email,
        name: user.name,
      },
      accessToken,
    },
  });
}

export async function refresh(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;

    const decoded = readRefreshToken(refreshToken);

    const { userId, role } = decoded;

    const user = await userModel.findById(userId);

    if (refreshToken != user.refreshToken) {
      await userModel.findByIdAndUpdate(user._id, {
        refreshToken: null,
      });
      return (
        res.status(401),
        json({
          message: "Refresh token mismatch",
        })
      );
    }

    const accessToken = createAccessToken({
      userId,
      role,
    });

    const newRefreshToken = createRefreshToken({
      userId,
      role,
    });

    await userModel.findByIdAndUpdate(user._id, {
      refreshToken: newRefreshToken,
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
    });

    res.status(200).json({
        message :"Token roteted successfully",
        data : {
            user :{ 
                email : user.email,
                name : user.name,
                id : user.id,
            },
            accessToken
        }
    })
  } catch (error) {
    return res.status(401).json({
      message: `Invalid Token ${error}`,
    });
  }
}

export async function getMe(req,res){
    const {userId, role} = req.user;

    const user = await userModel.findById(userId)


    res.status(200).json({
        message : "User data fetch successfullty",
        data : {
            user :{
                email : user.email,
                name : user.name,
                id : user._id
            }
        }
    })
}