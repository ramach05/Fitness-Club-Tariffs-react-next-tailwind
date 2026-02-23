"use client";

import { memo } from "react";

/**
 * Преобразует количество секунд в строку вида "ММ:СС" (например, "02:00").
 * @param secondsLeft — оставшееся количество секунд
 * @returns строка "ММ:СС" с ведущими нулями
 */
const formatTimer = (secondsLeft: number): string => {
  const m = Math.floor(secondsLeft / 60);
  const s = secondsLeft % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

interface HeaderProps {
  /** Оставшееся время в секундах */
  secondsLeft: number;
  /** Таймер истек (показываем финальное состояние) */
  timerEnded: boolean;
}

const Header = ({ secondsLeft, timerEnded }: HeaderProps) => {
  const isUrgentColor = !timerEnded && secondsLeft <= 30;
  const isBlinking = !timerEnded && secondsLeft > 0 && secondsLeft <= 30;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1f744f] text-white">
      <div className="mx-auto flex max-w-[1080px] flex-col items-center justify-center px-4 py-2">
        <span className="text-sm leading-tight text-white/90">
          Успейте открыть пробную неделю
        </span>
        <span
          className={`font-raleway text-[40px] font-bold leading-[1.1] uppercase tabular-nums ${
            secondsLeft === 0
              ? "text-white"
              : isUrgentColor
                ? "text-[#ff5f69]"
                : "text-[#f7c45b]"
          } ${isBlinking ? "animate-blink" : ""}`}
        >
          ✦ {formatTimer(secondsLeft)} ✦
        </span>
      </div>
    </header>
  );
};

export default memo(Header);
