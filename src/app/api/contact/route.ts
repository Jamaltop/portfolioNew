import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const submissionTime = new Date().toLocaleString("ru-RU", {
      timeZone: "Asia/Baku",
    });

    let web3FormsDelivered = false;

    // 1. Web3Forms Delivery directly to camalkos91@gmail.com
    const web3FormsKey =
      process.env.WEB3FORMS_ACCESS_KEY ||
      "68a9a815-2463-452e-b2c3-39fcb8dd8a28";

    if (web3FormsKey) {
      try {
        const w3Res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3FormsKey,
            subject: `🔥 Новое сообщение с портфолио от ${name}`,
            from_name: `${name} (Портфолио Camal)`,
            replyto: email,
            name,
            email,
            phone: phone || "Не указан",
            message: `Имя: ${name}\nEmail: ${email}\nТелефон: ${phone || "Не указан"}\nВремя отправки: ${submissionTime}\n\nТекст сообщения:\n${message}`,
          }),
        });

        const w3Data = await w3Res.json();
        if (w3Data && w3Data.success) {
          web3FormsDelivered = true;
          console.log("✓ Web3Forms successfully delivered to email:", w3Data);
        } else {
          console.warn("Web3Forms response notice:", w3Data);
        }
      } catch (w3Error) {
        console.error("Web3Forms delivery error:", w3Error);
      }
    }

    // 2. Telegram Bot Delivery (if configured)
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    if (telegramBotToken && telegramChatId) {
      const telegramText =
        `📩 *Новое сообщение с портфолио!*\n\n` +
        `👤 *Имя:* ${name}\n` +
        `📧 *Email:* ${email}\n` +
        `📱 *Телефон:* ${phone || "Не указан"}\n` +
        `🕒 *Время (Баку):* ${submissionTime}\n\n` +
        `💬 *Сообщение:*\n${message}`;

      try {
        await fetch(
          `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: telegramChatId,
              text: telegramText,
              parse_mode: "Markdown",
            }),
          }
        );
      } catch (tgError) {
        console.error("Telegram delivery error:", tgError);
      }
    }

    console.log("=== NEW PORTFOLIO CONTACT SUBMISSION ===");
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone || "None"}`);
    console.log(`Message: ${message}`);
    console.log(`Web3Forms Delivered: ${web3FormsDelivered}`);
    console.log("=========================================");

    return NextResponse.json(
      {
        success: true,
        message: "Message processed and delivered successfully.",
        web3FormsDelivered,
        data: { name, email, phone },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error while processing message." },
      { status: 500 }
    );
  }
}
