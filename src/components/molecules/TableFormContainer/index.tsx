"use client";
import { REVENUE_TYPE, ROLE, SESSION_KEY } from "@/src/enums";
import Button from "../../atoms/Button";
import Tabs from "../../atoms/Tabs";
import GMTable from "../GMTable";
import RevenueTable from "../RevenueTable";
import style from "./index.module.scss";
import { useForm } from "react-hook-form";
import { apiEndpoints } from "@/src/apiEndpoints";
import { PostApi } from "@/src/api";
import { transformData } from "@/src/utils/common";
import { useState } from "react";
import ModalContainer from "../../atoms/ModalContainer";
import SfdcTable from "../SfdcTable";

const TableFormContainer = (props: any) => {
  const { tab, setTab, details, subBu, accountOwner, fy, fetchDetails, role } =
    props;

  const { handleSubmit, formState, watch, control } = useForm();

  const [loading, setLoading] = useState(false);
  const [qtr, setQtr] = useState<any>();
  const [accountName, setAccountName] = useState<string>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [sfdcs, setSfdcs] = useState<any>();

  const getSfdcs = async (payload: any) => {
    const res = await PostApi(apiEndpoints.GET_SFDC, payload);
    setAccountName(payload?.AccountName);
    setSfdcs(res);
    setShowModal(true);
  };

  const tabs = [
    { label: "Revenue", value: REVENUE_TYPE.REVENUE },
    { label: "Gross Margin", value: REVENUE_TYPE.GROSS_MARGIN },
  ];

  const onSubmit = async (data: any) => {
    setLoading(true);
    if (typeof window === "undefined") return;

    try {
      let endpoint = "";

      if (tab === REVENUE_TYPE.REVENUE) {
        endpoint = apiEndpoints.UPDATE_ACCOUNTS;
      } else if (tab === REVENUE_TYPE.GROSS_MARGIN) {
        endpoint = apiEndpoints.GET_GM;
      }

      const res = await PostApi(
        `${endpoint}FYear=${fy}&AccountOwner=${
          role === ROLE.FPNA
            ? accountOwner
            : sessionStorage.getItem(SESSION_KEY.USER)
        }${role === ROLE.FPNA ? `?role=${role}` : ""}`,
        transformData(data)
      );

      alert(res?.message);
      fetchDetails({ FY: fy });
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {tab === REVENUE_TYPE.REVENUE && (
        <ModalContainer
          heading={`${accountName} - ${qtr}`}
          show={showModal}
          onHide={() => setShowModal(false)}
        >
          <SfdcTable
            qtr={qtr}
            sfdcs={sfdcs}
            accountName={accountName}
            fy={fy}
            setShowModal={setShowModal}
            fetchDetails={fetchDetails}
            role={role}
          />
        </ModalContainer>
      )}
      <form
        className={style.tableFormContainer}
        onSubmit={handleSubmit(onSubmit)}
      >
        <header>
          <Tabs tabs={tabs} tab={tab} setTab={setTab} />
          <Button type="submit" disabled={!formState.isDirty} loading={loading}>
            Save
          </Button>
        </header>
        <div
          className={style.tableContainer}
          style={
            role === ROLE.FPNA ? { maxHeight: "48vh" } : { maxHeight: "57vh" }
          }
        >
          {tab === REVENUE_TYPE.REVENUE && (
            <RevenueTable
              revenueDetails={details}
              watch={watch}
              control={control}
              fy={fy}
              subBu={subBu}
              accountOwner={accountOwner}
              fetchDetails={fetchDetails}
              role={role}
              setQtr={setQtr}
              getSfdcs={getSfdcs}
            />
          )}
          {tab === REVENUE_TYPE.GROSS_MARGIN && (
            <GMTable
              GMDetails={details}
              watch={watch}
              control={control}
              fy={fy}
              subBu={subBu}
              accountOwner={accountOwner}
              fetchDetails={fetchDetails}
              role={role}
            />
          )}
        </div>
      </form>
    </>
  );
};

export default TableFormContainer;
