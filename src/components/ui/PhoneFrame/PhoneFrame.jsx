import "./PhoneFrame.css";

/** Moldura de celular reutilizável para exibir screenshots reais em formato mobile. */
export function PhoneFrame({ src, alt, className = "" }) {
  return (
    <div className={`phone-frame ${className}`}>
      <div className="phone-frame__notch"></div>
      <div className="phone-frame__screen">
        <img src={src} alt={alt} className="phone-frame__img" />
      </div>
    </div>
  );
}
