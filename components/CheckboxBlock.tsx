"use client";

import { memo } from "react";

interface CheckboxBlockProps {
  /** Чекбокс отмечен */
  checked: boolean;
  /** Показывать состояние ошибки (например, при попытке купить без согласия) */
  error: boolean;
  /** Колбэк при изменении состояния чекбокса */
  onChange: (checked: boolean) => void;
}

const CheckboxBlock = ({ checked, error, onChange }: CheckboxBlockProps) => (
  <label className="flex cursor-pointer items-center gap-3 rounded-lg">
    <span
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border bg-transparent transition-colors ${
        error
          ? "border-red-500 ring-2 ring-red-500/50"
          : "border-white/30 [&:has(input:checked)]:border-[#f7b24d]"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      {checked && (
        <svg
          className="h-3 w-3 text-[#f7b24d]"
          viewBox="0 0 12 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M1 5l3 3 7-7" />
        </svg>
      )}
    </span>
    <span className="text-sm leading-snug text-[#D0D0D0]">
      Я согласен с{" "}
      <a
        href="#"
        className="text-[#D0D0D0] underline underline-offset-2 transition-colors hover:opacity-90"
        onClick={(e) => e.preventDefault()}
      >
        офертой рекуррентных платежей
      </a>{" "}
      и{" "}
      <a
        href="#"
        className="text-[#D0D0D0] underline underline-offset-2 transition-colors hover:opacity-90"
        onClick={(e) => e.preventDefault()}
      >
        Политикой конфиденциальности
      </a>
    </span>
  </label>
);

export default memo(CheckboxBlock);
