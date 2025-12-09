"use client";
import style from "./index.module.scss";

const Tabs = (props: any) => {
  const { tabs, tab, setTab } = props;

  return (
    <div className={style.tabs}>
      {tabs.map((tabItem: { label: string; value: string }) => (
        <div
          key={tabItem.value}
          className={tab === tabItem.value ? style.active : ""}
          onClick={() => setTab(tabItem.value)}
        >
          {tabItem.label}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
