// Circled "i" drawn as SVG so it scales and inherits the surrounding colour.
export default function InfoIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="9.25" />
      <circle cx="12" cy="7.9" r="1.1" fill="currentColor" stroke="none" />
      <path d="M12 11.2v5.6" strokeWidth="2.2" />
    </svg>
  );
}
