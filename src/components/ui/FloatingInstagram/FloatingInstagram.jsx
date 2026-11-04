import { Instagram } from "lucide-react";
import { instagram } from "../../../data/content";
import "./FloatingInstagram.css";

export function FloatingInstagram() {
  return (
    <a href={instagram.url} target="_blank" rel="noopener noreferrer" className="floating-ig" aria-label={`Instagram ${instagram.handle}`}>
      <Instagram className="floating-ig__icon" />
      <span className="floating-ig__tooltip">{instagram.tooltip}</span>
    </a>
  );
}
