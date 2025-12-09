"use client";
import FilterPanel from "../../molecules/FilterPanel";
import FinancialYearButtons from "../../molecules/FinancialYearButtons";
import Navbar from "../../molecules/Navbar";
import style from "./index.module.scss";
import BEHeader from "../../molecules/BEHeader";
import TableFormContainer from "../../molecules/TableFormContainer";
import { useForm } from "react-hook-form";
import { FIELD_NAME, REVENUE_TYPE, ROLE, SESSION_KEY } from "@/src/enums";
import { useEffect, useState } from "react";
import { apiEndpoints } from "@/src/apiEndpoints";
import { GetApi } from "@/src/api";
import withAuth from "@/src/auth/withAuth";

const Dashboard = () => {
  const { watch, control, setValue } = useForm();

  const [role, setRole] = useState<string | null>();
  const [details, setDetails] = useState<any[]>([]);
  const [tab, setTab] = useState<string>(REVENUE_TYPE.REVENUE);

  const fetchDetails = async (data: any) => {
    const isFPNA = sessionStorage.getItem(SESSION_KEY.ROLE) === ROLE.FPNA;
    const isPMO = sessionStorage.getItem(SESSION_KEY.ROLE) === ROLE.PMO;
    const accountOwner =
      isFPNA || isPMO
        ? watch(FIELD_NAME.ACCOUNT_OWNER) || "All"
        : sessionStorage.getItem(SESSION_KEY.USER);

    const endpoint =
      tab === REVENUE_TYPE.REVENUE
        ? apiEndpoints.GET_ACCOUNT_NAMES_DETAILS
        : apiEndpoints.GET_GM;

    let url = `${endpoint}FYear=${data.FY}&AccountOwner=${accountOwner}`;

    if (isFPNA) {
      url += `?SubBU=${encodeURIComponent(
        watch(FIELD_NAME.SUB_BU)
      )}&AccountName=${encodeURIComponent(watch(FIELD_NAME.ACCOUNT_NAME))}`;
    }

    if (isPMO) {
      const fullName = sessionStorage.getItem(SESSION_KEY.USER);
      let subBu = "";

      if (fullName?.startsWith("PMO ")) {
        // Remove "PMO " and trim spaces
        subBu = fullName.replace(/^PMO\s*/, "").trim();
      }

      url += `?SubBU=${encodeURIComponent(subBu)}&AccountName=All`;
    }

    const res = await GetApi(url);
    setDetails(res);
  };

  useEffect(() => {
    setRole(sessionStorage.getItem(SESSION_KEY.ROLE));

    const currentYear = new Date().getFullYear();
    setValue(
      FIELD_NAME.FINACIAL_YEAR,
      `FY${currentYear.toString().slice(2, 4)}`
    );
  }, []);

  useEffect(() => {
    fetchDetails({ FY: watch(FIELD_NAME.FINACIAL_YEAR) });
  }, [tab, watch(FIELD_NAME.FINACIAL_YEAR)]);

  return (
    <div className={style.DashboardContainer}>
      <Navbar />
      <main className={style.Container}>
        <BEHeader
          fy={watch(FIELD_NAME.FINACIAL_YEAR)}
          role={role}
          details={details}
          tab={tab}
        />
        {role === ROLE.FPNA && (
          <FilterPanel
            watch={watch}
            control={control}
            setValue={setValue}
            fetchDetails={fetchDetails}
          />
        )}
        <TableFormContainer
          details={details}
          subBu={watch(FIELD_NAME.SUB_BU)}
          accountOwner={watch(FIELD_NAME.ACCOUNT_OWNER)}
          fy={watch(FIELD_NAME.FINACIAL_YEAR)}
          tab={tab}
          setTab={setTab}
          fetchDetails={fetchDetails}
          role={role}
        />
      </main>
      <FinancialYearButtons
        watch={watch}
        setValue={setValue}
        fetchDetails={fetchDetails}
      />
    </div>
  );
};

export default withAuth(Dashboard);
