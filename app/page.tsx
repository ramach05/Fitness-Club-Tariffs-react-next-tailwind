"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchTariffs } from "@/lib/api";
import type { Tariff } from "@/lib/types";
import Header from "@/components/Header";
import TariffList from "@/components/TariffList";
import CheckboxBlock from "@/components/CheckboxBlock";
import GuaranteeBlock from "@/components/GuaranteeBlock";

const TIMER_START = 120;

const Home = () => {
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(TIMER_START);
  const [timerEnded, setTimerEnded] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [checkboxError, setCheckboxError] = useState(false);

  // При монтировании сбрасываем таймер в начальное значение (на случай повторного входа на страницу)
  useEffect(() => {
    setSecondsLeft(TIMER_START);
    setTimerEnded(false);
  }, []);

  // Загружаем список тарифов с API
  useEffect(() => {
    let mounted = true;
    fetchTariffs()
      .then((data) => {
        if (mounted) {
          setTariffs(data);
          const sorted = [...data].sort((a, b) =>
            a.is_best ? -1 : b.is_best ? 1 : 0,
          );
          const defaultIndex = sorted.findIndex((t) => t.is_best);
          setSelectedIndex(defaultIndex >= 0 ? defaultIndex : 0);
        }
      })
      .catch((err) => {
        if (mounted)
          setError(err instanceof Error ? err.message : "Ошибка загрузки");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Обратный отсчет таймера
  useEffect(() => {
    if (timerEnded) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          setTimerEnded(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [timerEnded]);

  const handleBuy = useCallback(() => {
    if (!agreed) {
      setCheckboxError(true);
      return;
    }

    console.log("handler for the Buy button");
  }, [agreed, tariffs, selectedIndex]);

  const handleCheckboxChange = useCallback((v: boolean) => {
    setAgreed(v);
    if (v) setCheckboxError(false);
  }, []);

  return (
    <>
      <Header secondsLeft={secondsLeft} timerEnded={timerEnded} />
      <main className="min-h-screen px-4 pb-6 pt-24 sm:px-6 sm:pb-10">
        <section className="mx-auto w-full max-w-[1080px] rounded-[22px] border border-white/10 bg-[#21292d] px-3 pb-6 pt-5 sm:px-6 sm:pt-7 lg:px-8 lg:pb-8 lg:pt-10">
          <h1 className="font-montserrat text-left text-[22px] font-bold leading-[1.1] tracking-[0.01em] text-white min-[375px]:text-center min-[375px]:text-[40px]">
            Выбери подходящий для себя{" "}
            <span className="text-[#f7b24d]">тариф</span>
          </h1>

          <div className="mt-4 lg:mb-[66px] lg:grid lg:grid-cols-[300px_1fr] lg:gap-8 lg:items-start">
            <div className="relative mb-6 flex justify-center lg:mb-0 lg:justify-start">
              <div className="hero-image-shadow relative h-[200px] w-full min-[375px]:h-[250px] lg:h-[670px] lg:w-[300px] overflow-hidden rounded-b-lg">
                <picture className="absolute inset-0 z-0 block">
                  <source
                    media="(max-width: 640px)"
                    srcSet="/images/hero-sm.svg"
                  />
                  <source
                    media="(max-width: 1024px)"
                    srcSet="/images/hero-md.svg"
                  />
                  <img
                    src="/images/hero-lg.svg"
                    alt="Мужчина демонстрирует спортивную форму"
                    className="h-full w-full object-bottom"
                  />
                </picture>
              </div>
            </div>
            <div>
              {loading ? (
                <p className="py-8 text-center text-gray-400">
                  Загрузка тарифов...
                </p>
              ) : error ? (
                <p className="py-8 text-center text-red-400">{error}</p>
              ) : (
                <TariffList
                  tariffs={tariffs}
                  selectedIndex={selectedIndex}
                  showDiscount={!timerEnded}
                  onSelectIndex={setSelectedIndex}
                />
              )}

              <div className="mt-4 flex max-w-[500px] gap-3 rounded-2xl bg-[#31393e] px-4 py-3">
                <span className="shrink-0 text-lg font-bold text-[#f7b24d]">
                  !
                </span>
                <p className="text-sm leading-snug text-white/80">
                  Следуя плану на 3 месяца и более, люди получают в 2 раза
                  лучший результат, чем за 1 месяц.
                </p>
              </div>

              <div className="mt-4 max-w-[650px] space-y-4">
                <CheckboxBlock
                  checked={agreed}
                  error={checkboxError}
                  onChange={handleCheckboxChange}
                />
                <div className="w-full md:max-w-[352px]">
                  <button
                    type="button"
                    onClick={handleBuy}
                    className="w-full rounded-2xl bg-[#f7b24d] py-4 text-2xl font-semibold text-[#1f2528] animate-pulse-btn"
                  >
                    Купить
                  </button>
                </div>
                <p className="text-xs leading-snug text-white/35">
                  Нажимая кнопку «Купить», Пользователь соглашается на разовое
                  списание основных средств для получения пассивного дохода с
                  карты для получения пожизненного доступа к предложениям.
                  Пользователь соглашается, что данные реквизитов карты будут
                  сохранены для осуществления покупок дополнительных услуг
                  сервиса в случае нажатия пользователем.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-[22px] min-[375px]:mt-[24px] md:mt-0">
            <GuaranteeBlock />
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
