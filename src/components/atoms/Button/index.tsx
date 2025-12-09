import style from "./index.module.scss";

const Button = (props: any) => {
  const {
    children,
    onClick,
    disabled,
    className,
    loading,
    type = "button",
  } = props;
  return (
    <button
      className={`btn ${style.button} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
    >
      {loading && <i className="fa fa-spinner fa-spin"></i>}
      {!loading && children}
    </button>
  );
};

export default Button;
