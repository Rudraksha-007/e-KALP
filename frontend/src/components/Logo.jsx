import logo from "../assets/logo.png";

/**
 * Single source of truth for the e-KALP brand mark.
 *
 * `src/assets/logo.png` is a light (white) wordmark on a transparent
 * background, so on light surfaces pass `tile` to render it inside a
 * dark square — otherwise the text becomes invisible.
 */
export default function Logo({ height = 40, tile = false, className = "", imgClassName = "" }) {
  const img = (
    <img
      src={logo}
      alt="e-KALP"
      style={{ height }}
      className={`w-auto object-contain ${imgClassName}`}
    />
  );

  if (tile) {
    return (
      <span className={`inline-flex items-center justify-center bg-neutral-950 px-2.5 py-1.5 ${className}`}>
        {img}
      </span>
    );
  }

  return <span className={`inline-flex items-center ${className}`}>{img}</span>;
}
