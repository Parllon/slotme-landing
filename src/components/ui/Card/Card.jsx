import "./Card.css";

export function Card({ highlighted = false, className = "", children, ...rest }) {
  const classes = ["card", highlighted ? "card--highlighted" : "", className]
    .filter(Boolean).join(" ");
  return <div className={classes} {...rest}>{children}</div>;
}
