import { Asterisk } from "lucide-react";

const WORDS = [
  "Ashvem",
  "Mandrem",
  "Arambol",
  "Vagator",
  "Chapora",
  "Assagao",
  "Anjuna",
  "Morjim",
];

export default function Marquee() {
  const set = [...WORDS, ...WORDS];
  return (
    <div className="relative border-y border-[hsl(var(--ink))]/10 bg-[hsl(var(--paper))] py-6 md:py-8 overflow-hidden">
      <div className="marquee">
        {set.map((w, i) => (
          <span
            key={i}
            className="flex items-center gap-8 md:gap-14 px-6 md:px-10 font-display italic font-light text-[10vw] md:text-[7vw] leading-none tracking-[-0.02em] text-[hsl(var(--ink))] whitespace-nowrap"
          >
            {w}
            <Asterisk
              className="w-7 h-7 md:w-9 md:h-9 text-[hsl(var(--gold))] shrink-0"
              strokeWidth={1}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
