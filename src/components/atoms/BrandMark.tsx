/** Node-graph mark: five outer points wired to a centre. */
export const BrandMark = ({ className = "h-9 w-9 text-accent" }: { className?: string }) => {
    const outer: [number, number, number][] = [
        [50, 16, 5],
        [82, 36, 4],
        [76, 72, 5],
        [24, 72, 4],
        [18, 36, 5],
    ];

    return (
        <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
            {/* Spokes */}
            {outer.map(([x, y]) => (
                <line
                    key={`s-${x}-${y}`}
                    x1="50"
                    y1="50"
                    x2={x}
                    y2={y}
                    stroke="currentColor"
                    vectorEffect="non-scaling-stroke"
                    strokeWidth="1"
                    opacity="0.45"
                />
            ))}
            {/* Perimeter */}
            {outer.map(([x, y], i) => {
                const [nx, ny] = outer[(i + 1) % outer.length];
                return (
                    <line
                        key={`p-${x}-${y}`}
                        x1={x}
                        y1={y}
                        x2={nx}
                        y2={ny}
                        stroke="currentColor"
                        vectorEffect="non-scaling-stroke"
                        strokeWidth="1"
                        opacity="0.45"
                    />
                );
            })}
            {outer.map(([x, y, r], index) => (
                <circle key={`c-${x}-${y}`} cx={x} cy={y} r={r} fill="currentColor" className="motion-safe:animate-[brand-node_1.8s_ease-in-out_infinite_alternate]" style={{ animationDelay: `${index * 0.25}s` }} />
            ))}
            <circle cx="50" cy="50" r="7" fill="currentColor" />
        </svg>
    );
};
