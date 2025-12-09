import style from "./index.module.scss";

const Loader = () => {
  return (
    <div className={style.loaderContainer}>
      <div className={style.loader}></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
