"use client";

export function LabelWithTooltip({
  htmlFor,
  children,
  tooltip,
  className = "",
}: {
  htmlFor?: string;
  children: React.ReactNode;
  tooltip: string;
  className?: string;
}) {
  const content = (
    <span className="group relative inline-block cursor-help border-b border-dotted border-current">
      {children}
      <span
        role="tooltip"
        className="absolute left-0 bottom-full mb-1.5 hidden w-72 max-w-[calc(100vw-2rem)] p-2.5 text-left text-small leading-snug text-white bg-gray-800 rounded shadow-lg group-hover:block z-20"
      >
        {tooltip}
      </span>
    </span>
  );
  if (htmlFor) {
    return (
      <label htmlFor={htmlFor} className={className}>
        {content}
      </label>
    );
  }
  return <span className={className}>{content}</span>;
}
