import "./BrowserFrame.css";

export function BrowserFrame({ src, alt, url, className = "" }) {
  return (
    <div className={`browser-frame ${className}`}>
      <div className="browser-frame__bar">
        <span className="browser-frame__dot browser-frame__dot--red" />
        <span className="browser-frame__dot browser-frame__dot--yellow" />
        <span className="browser-frame__dot browser-frame__dot--green" />
        {url && <span className="browser-frame__url">{url}</span>}
      </div>
      <div className="browser-frame__screen">
        <img src={src} alt={alt} className="browser-frame__img" />
      </div>
    </div>
  );
}
