import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json();
    const { username, password } = body;

    if (username !== "admin" || password !== "123456") {
        return NextResponse.json({
            message: "email hoac mat khau khong chinh xac"
        }, {status: 401}) // 401 Unauthorized
    }

    const accessToken = "fake-token-string-for-example"
    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1 * 60 * 60,
        path: '/'
    })

    return NextResponse.json({ message: "Login thanh cong" })
}