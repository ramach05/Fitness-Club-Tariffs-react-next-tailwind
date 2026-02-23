import type { Tariff } from "./types";

const TARIFFS_URL = "https://t-core.fit-hub.pro/Test/GetTariffs";

/**
 * Загружает список тарифов с бэкенда
 * @returns промис с массивом тарифов
 * @throws Error при неуспешном ответе (не 2xx)
 */
export const fetchTariffs = async (): Promise<Tariff[]> => {
  const res = await fetch(TARIFFS_URL);
  if (!res.ok) {
    throw new Error(`Ошибка загрузки тарифов: ${res.status}`);
  }

  const data = (await res.json()) as Tariff[];
  return data;
};
