import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const externalApiUrl = `https://testing-api.ru-rating.ru/cars?${searchParams.toString()}`;

  const response = await fetch(externalApiUrl);

  if (!response.ok) {
    return NextResponse.json({ error: 'Ошибка получения данных' }, { status: response.status });
  }

  const data = await response.json();

  return NextResponse.json({
    data: data.data,
    meta: data.meta,
  });
}