import { AnimatedText } from "@/components/atoms/AnimatedText";
import { HOME_APPROACH } from "@/data/homepage";
import { Gauge, Layers3, MessageSquare, ShieldCheck, ListChecks } from "lucide-react";
import Link from "next/link";

const icons = { layers: Layers3, speed: Gauge, message: MessageSquare, shield: ShieldCheck, scope: ListChecks };

/** Reference-style benefit cards using this portfolio's working practices. */
export const ApproachSection = () => (
    <section id="approach" aria-label={HOME_APPROACH.label} className="border-t border-line py-[var(--spacing-section)]">
        <div className="shell">
            <header className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="font-mono text-label uppercase tracking-wider text-accent">{HOME_APPROACH.label}</p>
                    <AnimatedText as="h2" text={HOME_APPROACH.title} className="mt-4 max-w-[18ch] text-h2 font-medium" />
                </div>
                <Link data-contact-trigger href={HOME_APPROACH.href} className="inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-accent px-7 py-4 font-mono text-label uppercase tracking-wider text-bg hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                    {HOME_APPROACH.cta} <span aria-hidden="true">↗</span>
                </Link>
            </header>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6">
                {HOME_APPROACH.cards.map((card, index) => {
                    const Icon = icons[card.symbol];
                    return (
                        <article key={card.title} className={`flex flex-col rounded-sm border border-line bg-surface/50 p-7 md:p-9 ${index < 3 ? "lg:col-span-2" : "lg:col-span-3"}`}>
                            <div className="mb-12 flex items-center justify-between gap-4">
                                <span className="font-mono text-[10px] uppercase tracking-wider text-accent">{card.label}</span>
                                <Icon aria-hidden="true" className="h-6 w-6 shrink-0 text-accent" strokeWidth={1.25} />
                            </div>
                            <h3 className="max-w-[22ch] text-h3 font-medium">{card.title}</h3>
                            <p className="mt-5 max-w-[60ch] text-small leading-relaxed text-ink/65">{card.description}</p>
                        </article>
                    );
                })}
            </div>
        </div>
    </section>
);
