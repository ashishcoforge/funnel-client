"use client";
import style from "./index.module.scss";
import Button from "../../atoms/Button";
import { useRouter } from "next/navigation";
import { REVENUE_TYPE, ROLE, SESSION_KEY } from "@/src/enums";
import { apiEndpoints } from "@/src/apiEndpoints";
import { downloadExcelFile } from "@/src/utils/common";

const BEHeader = (props: any) => {
  const { fy, role, tab, details } = props;
  const router = useRouter();

  const exportExcel = async () => {
    const token = sessionStorage.getItem(SESSION_KEY.TOKEN);

    const endpoint =
      tab === REVENUE_TYPE.REVENUE
        ? apiEndpoints.EXPORT_EXCEL
        : apiEndpoints.EXPORT_EXCEL_GM;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    });

    const blob = await res.blob();
    downloadExcelFile(blob, "Revenue.xlsx");
  };

  const exportRunRate = async () => {
    const token = sessionStorage.getItem(SESSION_KEY.TOKEN);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${apiEndpoints?.EXPORT_REVENUE_RUNRATE}?FY=${fy}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const blob = await res.blob();
    downloadExcelFile(blob, `InsuranceRunrate_${fy}.xlsx`);
  };

  return (
    <div className={style.beHeaderContainer}>
      <h4>Financial Year - {fy}</h4>
      <div className={style.btnContainer}>
        {role === ROLE.FPNA && (
          <>
            <Button
              className={style.outline}
              onClick={() => router.push("/upload")}
            >
              Upload SFDC Data
            </Button>
            <Button className={style.outline} onClick={exportRunRate}>
              Yearly Runrate
            </Button>
          </>
        )}

        <Button onClick={exportExcel}>Export as excel</Button>
      </div>
    </div>
  );
};

export default BEHeader;
