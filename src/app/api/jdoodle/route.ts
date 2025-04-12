// src/app/api/jdoodle/route.ts
import { NextResponse } from "next/server";

const JDOODLE_ENDPOINT = "https://api.jdoodle.com/v1/execute";
const LANGUAGE = "csharp";
const VERSION_INDEX = "0"; // JDoodle のドキュメントを参照

export async function POST(request: Request) {
  try {
    // リクエストボディを JSON でパース
    const { source_code } = await request.json();
    // サーバーサイドの環境変数から認証情報を取得
    const clientId = process.env.JDOODLE_CLIENT_ID;
    const clientSecret = process.env.JDOODLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        { error: "JDoodle API の認証情報が設定されていません。" },
        { status: 500 }
      );
    }

    // JDoodle API へ POST リクエスト
    const response = await fetch(JDOODLE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId,
        clientSecret,
        script: source_code,
        language: LANGUAGE,
        versionIndex: VERSION_INDEX,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("JDoodle API エラー:", error);
    return NextResponse.json({ error: "内部サーバーエラー" }, { status: 500 });
  }
}
