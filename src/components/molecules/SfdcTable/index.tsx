import { Controller, useForm } from "react-hook-form";
import style from "./index.module.scss";
import Button from "../../atoms/Button";
import { PostApi } from "@/src/api";
import { apiEndpoints } from "@/src/apiEndpoints";
import { useState } from "react";
import { ROLE, SESSION_KEY } from "@/src/enums";
import { QUATERS } from "@/src/constants";

const SfdcTable = (props: any) => {
  const { qtr, sfdcs, accountName, fy, setShowModal, fetchDetails, role } =
    props;
  const [loading, setLoading] = useState(false);
  const { handleSubmit, control, reset } = useForm();

  const convertToPayload = (inputObj: any) => {
    const payload: any = {
      accountName: accountName, // Replace with the actual account name if dynamic
      quarter: `FY${qtr}`, // Ensure qtr is set correctly
      FY: fy,
      sfdcData: {},
      accountOwner: sessionStorage.getItem(SESSION_KEY.USER),
    };

    Object.keys(inputObj).map((key: string) => {
      const sfdcId = key.split("-")[0];

      if (!payload.sfdcData[sfdcId]) {
        payload.sfdcData[sfdcId] = [];
      }
      if (key.includes("-m")) {
        payload.sfdcData[sfdcId].push(inputObj[key]);
      }
    });

    return payload;
  };

  const submitRevenue = async (data: any) => {
    setLoading(true);
    const payload: any = convertToPayload(data);
    const res = await PostApi(apiEndpoints?.UPDATE_REVENUE, payload);
    if (res === 1) {
      await fetchDetails(payload);
      setLoading(false);
      setShowModal(false);
      reset();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(submitRevenue)}>
      <div className={style.SfdcTableContainer}>
        <table>
          <thead>
            <tr>
              <th>Sfdc Id</th>
              <th>Opportunity Name</th>
              <th>TCV</th>
              <th>ACV</th>
              <th>Stage</th>
              <th>Probability</th>
              {QUATERS?.[qtr]?.map((month: string) => (
                <th key={month}>{month}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sfdcs?.map((row: any) => (
              <tr key={row?.sfdcId}>
                <td>{row?.sfdcId}</td>
                <td>{row?.opportunityName}</td>
                <td>{row?.tcv}</td>
                <td>{row?.acv}</td>
                <td>{row?.stage}</td>
                <td>{row?.probability}</td>
                <td>
                  {role === ROLE.USER ? (
                    <Controller
                      name={`${row?.sfdcId}-m1`}
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <input
                          defaultValue={row?.m1}
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  ) : (
                    row?.m1
                  )}
                </td>
                <td>
                  {role === ROLE.USER ? (
                    <Controller
                      name={`${row?.sfdcId}-m2`}
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <input
                          defaultValue={row?.m2}
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  ) : (
                    row?.m2
                  )}
                </td>
                <td>
                  {role === ROLE.USER ? (
                    <Controller
                      name={`${row?.sfdcId}-m3`}
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <input
                          defaultValue={row?.m3}
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  ) : (
                    row?.m3
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {role === ROLE.USER && (
        <Button type="submit" loading={loading}>
          Save & Continue
        </Button>
      )}
    </form>
  );
};

export default SfdcTable;
