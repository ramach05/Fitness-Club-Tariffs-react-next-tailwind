"use client";

import { memo } from "react";
import type { Tariff } from "@/lib/types";
import { formatPrice, getDiscountPercent } from "@/utils/price";

interface TariffCardProps {
  /** Данные тарифа (период, цены, описание) */
  tariff: Tariff;
  /** Карточка выбрана пользователем */
  selected: boolean;
  /** Показывать скидку (цена со скидкой и зачеркнутая полная) */
  showDiscount: boolean;
  /** Колбэк при выборе карточки; вызывается с индексом в общем списке */
  onSelectIndex: (index: number) => void;
  /** Индекс карточки в списке (0 — первая/главная) */
  index: number;
  /** Главная карточка (хит), другое оформление и сетка */
  featured?: boolean;
}

const TariffCard = ({
  tariff,
  selected,
  showDiscount,
  onSelectIndex,
  index,
  featured = false,
}: TariffCardProps) => {
  const discountPercent = getDiscountPercent(tariff.price, tariff.full_price);
  const cardBorder = selected ? "border-[#f7b24d]" : "border-white/10";

  const periodClass =
    "font-montserrat font-medium leading-[1.2] text-white text-sm md:text-[26px]";
  const priceClass =
    "font-montserrat text-[26px] font-semibold leading-none text-white md:text-[50px]";
  const descriptionClass = featured
    ? "text-sm md:text-[18px]"
    : "text-sm md:text-[16px]";

  const heightClass = featured
    ? "h-[118px] min-h-[118px] min-[375px]:h-[131px] min-[375px]:min-h-[131px] md:h-auto md:min-h-0"
    : "h-[118px] min-h-[118px] min-[375px]:h-[131px] min-[375px]:min-h-[131px] md:h-[335px] md:min-h-[335px]";

  return (
    <button
      type="button"
      onClick={() => onSelectIndex(index)}
      className={`relative w-full text-left rounded-2xl bg-[#31393e] border transition-colors ${heightClass} ${
        featured ? "p-4 md:p-5" : "p-4"
      } ${cardBorder} ${selected ? "shadow-[0_0_0_1px_rgba(247,178,77,0.25)]" : ""}`}
    >
      {showDiscount && (
        <span className="absolute -top-1 left-4 rounded-md bg-[#f6605c] px-2 py-0.5 text-xs font-semibold text-white">
          -{discountPercent}%
        </span>
      )}

      {featured && (
        <span className="absolute right-2 top-3 text-sm font-semibold text-[#f7b24d]">
          хит!
        </span>
      )}

      <div
        className={`grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-2 md:gap-4 ${featured ? "md:grid-cols-[1fr_1.5fr]" : "md:grid-cols-[1fr]"}`}
      >
        <div className="min-w-0">
          <div className={periodClass}>{tariff.period}</div>
          <div className="mt-2">
            {showDiscount ? (
              <div className="animate-fade-in">
                <div
                  className={`${priceClass} ${
                    selected ? "text-[#f7b24d]" : "text-white"
                  }`}
                >
                  {formatPrice(tariff.price)}
                </div>
                <div className="mt-1 text-lg leading-none text-white/40 line-through md:text-2xl">
                  {formatPrice(tariff.full_price)}
                </div>
              </div>
            ) : (
              <div className="animate-fade-in">
                <div className={priceClass}>
                  {formatPrice(tariff.full_price)}
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          className={`min-w-0 mt-0 leading-tight text-white/75 md:mt-0 ${descriptionClass} ${featured ? "md:self-center md:pr-8" : ""} line-clamp-3 md:line-clamp-none`}
        >
          {tariff.text}
        </div>
      </div>
    </button>
  );
};

export default memo(TariffCard);
