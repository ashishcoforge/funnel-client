"use client";
import { Controller } from "react-hook-form";
import style from "./index.module.scss";
import SelectDropDown from "../../atoms/SelectDropDown";
import Button from "../../atoms/Button";
import { FIELD_NAME } from "@/src/enums";
import { useEffect, useState } from "react";
import { GetApi } from "@/src/api";
import { apiEndpoints } from "@/src/apiEndpoints";

const FilterPanel = (props: any) => {
  const { watch, control, setValue, fetchDetails } = props;

  const [subBus, setSubBus] = useState<string[]>([]);
  const [accountOwners, setAccountOwners] = useState<string[]>([]);
  const [accountNames, setAccountNames] = useState<string[]>([]);

  const getSubBusOptions = async () => {
    const res = await GetApi(
      `${apiEndpoints.SUB_BUS}FYear=${watch(FIELD_NAME.FINACIAL_YEAR)}`
    );
    setSubBus(["All", ...res]);
  };

  const getAccountOwnersOptions = async () => {
    const res = await GetApi(
      `${apiEndpoints.ACCOUNT_OWNERS}FYear=${watch(
        FIELD_NAME.FINACIAL_YEAR
      )}&SubBU=${watch(FIELD_NAME.SUB_BU)}`
    );
    setAccountOwners(["All", ...res]);
  };

  const getAccountNamesOptions = async () => {
    const res = await GetApi(
      `${apiEndpoints.GET_ACCOUNT_NAMES}FYear=${watch(
        FIELD_NAME.FINACIAL_YEAR
      )}&SubBU=${watch(FIELD_NAME.SUB_BU)}&AccountOwner=${watch(
        FIELD_NAME.ACCOUNT_OWNER
      )}`
    );
    setAccountNames(["All", ...res]);
  };

  useEffect(() => {
    setValue(FIELD_NAME.SUB_BU, "All");
    setValue(FIELD_NAME.ACCOUNT_OWNER, "All");
    setValue(FIELD_NAME.ACCOUNT_NAME, "All");
    getSubBusOptions();
    getAccountOwnersOptions();
    getAccountNamesOptions();
    fetchDetails({ FY: watch(FIELD_NAME.FINACIAL_YEAR) });
  }, [watch(FIELD_NAME.FINACIAL_YEAR)]);

  return (
    <div className={style.filterPanelContainer}>
      <div className={style.filterInput}>
        <label>Select Sub BU</label>
        <Controller
          name={FIELD_NAME.SUB_BU}
          control={control}
          render={({ field: { value, onChange } }) => (
            <SelectDropDown
              options={subBus}
              value={value}
              onChange={(e: any) => {
                onChange(e);
                getAccountOwnersOptions();
                getAccountNamesOptions();
                fetchDetails({
                  FY: watch(FIELD_NAME.FINACIAL_YEAR),
                });
              }}
            />
          )}
        />
      </div>
      <div className={style.filterInput}>
        <label>Select Account Owner</label>
        <Controller
          name={FIELD_NAME.ACCOUNT_OWNER}
          control={control}
          render={({ field: { value, onChange } }) => (
            <SelectDropDown
              options={accountOwners}
              value={value}
              onChange={(e: any) => {
                onChange(e);
                getAccountNamesOptions();
                fetchDetails({
                  FY: watch(FIELD_NAME.FINACIAL_YEAR),
                });
              }}
            />
          )}
        />
      </div>
      <div className={style.filterInput}>
        <label>Select Account Name</label>
        <Controller
          name={FIELD_NAME.ACCOUNT_NAME}
          control={control}
          render={({ field: { value, onChange } }) => (
            <SelectDropDown
              options={accountNames}
              value={value}
              onChange={(e: any) => {
                onChange(e);
                fetchDetails({
                  FY: watch(FIELD_NAME.FINACIAL_YEAR),
                });
              }}
            />
          )}
        />
      </div>
      {(watch(FIELD_NAME.SUB_BU) !== "All" ||
        watch(FIELD_NAME.ACCOUNT_OWNER) !== "All" ||
        watch(FIELD_NAME.ACCOUNT_NAME) !== "All") && (
        <Button
          onClick={() => {
            setValue(FIELD_NAME.SUB_BU, "All");
            setValue(FIELD_NAME.ACCOUNT_OWNER, "All");
            setValue(FIELD_NAME.ACCOUNT_NAME, "All");
            fetchDetails({ FY: watch(FIELD_NAME.FINACIAL_YEAR) });
          }}
        >
          Clear
        </Button>
      )}
    </div>
  );
};

export default FilterPanel;
