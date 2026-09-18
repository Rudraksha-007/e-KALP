import Logo from "./Logo";

/**
 * Large, centered presentation of the e-KALP brand mark (e.g. for auth
 * splash screens). Delegates to the shared <Logo> so every surface uses
 * the same `src/assets/logo.png`.
 */
const EKalpLogo = ({ className = "" }) => (
  <div className={`flex flex-col items-center ${className}`}>
    <Logo height={72} />
  </div>
);

export default EKalpLogo;
