"use client";

import { memo, useMemo } from "react";
import type { Tariff } from "@/lib/types";
import TariffCard from "./TariffCard";

interface TariffListProps {
  /** Массив тарифов с API (порядок будет пересортирован: is_best первым) */
  tariffs: Tariff[];
  /** Индекс выбранного тарифа в отображаемом списке */
  selectedIndex: number;
  /** Показывать скидочные цены на карточках */
  showDiscount: boolean;
  /** Колбэк при выборе тарифа по индексу */
  onSelectIndex: (index: number) => void;
}

const TariffList = ({
  tariffs,
  selectedIndex,
  showDiscount,
  onSelectIndex,
}: TariffListProps) => {
  const { featuredTariff, regularTariffs } = useMemo(() => {
    const sorted = [...tariffs].sort((a, b) =>
      a.is_best ? -1 : b.is_best ? 1 : 0,
    );
    return {
      featuredTariff: sorted[0],
      regularTariffs: sorted.slice(1),
    };
  }, [tariffs]);

  return (
    <div className="space-y-3">
      {featuredTariff && (
        <TariffCard
          key={`${featuredTariff.id}-${featuredTariff.period}`}
          tariff={featuredTariff}
          selected={selectedIndex === 0}
          showDiscount={showDiscount}
          onSelectIndex={onSelectIndex}
          index={0}
          featured
        />
      )}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {regularTariffs.map((tariff, i) => {
          const index = i + 1;
          return (
            <TariffCard
              key={`${tariff.id}-${tariff.period}`}
              tariff={tariff}
              selected={selectedIndex === index}
              showDiscount={showDiscount}
              onSelectIndex={onSelectIndex}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default memo(TariffList);
