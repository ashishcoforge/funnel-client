"use client";
import { FIELD_NAME } from "@/src/enums";
import Button from "../../atoms/Button";
import style from "./index.module.scss";

const FinancialYearButtons = (props: any) => {
  const { watch, setValue } = props;

  const currentYear = new Date().getFullYear();
  const prevFY = `FY${(currentYear - 1).toString().slice(2, 4)}`;
  const nextFY = `FY${(currentYear + 1).toString().slice(2, 4)}`;
  const currentFY = watch(FIELD_NAME.FINACIAL_YEAR);

  const handleFYChange = (offset: any) => {
    const currentFY = parseInt(watch(FIELD_NAME.FINACIAL_YEAR).slice(2, 4));
    const newFY = `FY${currentFY + offset}`;
    setValue(FIELD_NAME.FINACIAL_YEAR, newFY);
  };

  return (
    <div className={style.FinancialYearButtonsContainer}>
      {currentFY !== prevFY && (
        <Button
          onClick={() => handleFYChange(-1)}
          disabled={currentFY === prevFY}
        >
          Prev FY
        </Button>
      )}
      {currentFY !== nextFY && (
        <Button
          onClick={() => handleFYChange(1)}
          disabled={currentFY === nextFY}
        >
          Next FY
        </Button>
      )}
    </div>
  );
};

export default FinancialYearButtons;
