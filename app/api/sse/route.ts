import { NextResponse } from 'next/server';
import { YOKAI_DATA } from '@/data/yokaiData';
import { YokaiThreat } from '@/types/yokai.schema'; // Импортируем тип

export async function GET(req: Request) {
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
        start(controller) {
            // Отправляем комментарий для поддержания соединения (опционально)
            // controller.enqueue(encoder.encode(": connected\n\n"));

            const interval = setInterval(() => {
                // 1. Выбираем случайного ёкая
                const randomIndex = Math.floor(Math.random() * YOKAI_DATA.length);

                // 2. Определяем возможные угрозы (строго типизировано)
                const threats: YokaiThreat[] = ["low", "medium", "high", "critical"];
                const randomThreat = threats[Math.floor(Math.random() * threats.length)];

                // 3. Мутируем данные в памяти сервера
                // Важно: мутируем именно объект внутри массива
                YOKAI_DATA[randomIndex] = {
                    ...YOKAI_DATA[randomIndex],
                    threat: randomThreat
                };

                // 4. Отправляем обновленный объект клиенту
                const data = JSON.stringify(YOKAI_DATA[randomIndex]);
                controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            }, 5000);

            // Очистка при разрыве соединения
            req.signal.addEventListener('abort', () => {
                clearInterval(interval);
                controller.close();
            });
        }
    });

    return new NextResponse(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
        },
    });
}