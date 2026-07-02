import "./Button.css";

/** variant: "primary" | "outline" ; renderiza <a> se receber href. */
export function Button({ variant = "primary", block = false, href, className = "", children, ...rest }) {
  const classes = ["btn", `btn--${variant}`, block ? "btn--block" : "", className]
    .filter(Boolean).join(" ");

  if (href) {
    return <a href={href} className={classes} {...rest}>{children}</a>;
  }
  return <button className={classes} {...rest}>{children}</button>;
}
