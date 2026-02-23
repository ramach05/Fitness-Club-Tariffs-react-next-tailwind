"use client";

import { memo } from "react";

const GuaranteeBlock = () => (
  <div className="rounded-3xl border border-white/15 bg-[#212a2e] p-4 sm:p-6">
    <h3 className="mb-4 inline-flex rounded-full border border-[#4de08e]/60 px-5 py-2 font-medium leading-[1.2] text-[#81fe95] text-[16px] min-[375px]:text-[18px] min-[480px]:text-[28px]">
      гарантия возврата 30 дней
    </h3>
    <p className="text-sm leading-relaxed text-white/80 md:text-[18px]">
      Мы уверены, что наш план сработает для тебя и ты увидишь видимые
      результаты уже через 4 недели! Мы даже готовы полностью вернуть твои
      деньги в течение 30 дней с момента покупки, если ты не получишь видимых
      результатов.
    </p>
  </div>
);

export default memo(GuaranteeBlock);
