import connectToDB from "@/database/connection";
import User from "@/models/users";
import { NextWeekTwoTone } from "@mui/icons-material";
import { hash } from "bcrypt";
import Joi from "joi";
import { NextResponse } from "next/server";

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(request) {
  await connectToDB();
  const { name, email, password, role } = await request.json();
  const { error } = schema.validate({ name, email, password, role });

  if (error) {
    return NextResponse.json({
      success: true,
      message: "Error ",
    });
  }

  try {
    const isUserExists = await User.findOne({ email });

    if (isUserExists) {
      return NextResponse.json({
        success: false,
        message: `User already exists. Please try again with different email`,
      });
    } else {
      console.log(email, name, "in else ---------");
      const hashPassword = await hash(password, 12);

      const newUser = await User.create({
        name,
        email,
        password: hashPassword,
        role,
      });

      if (newUser) {
        return NextResponse.json({
          success: true,
          message: "Account Created Successfully",
        });
      }
    }
  } catch (error) {
    console.log(`Error in new User Registration: ${error.message}`);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
}

