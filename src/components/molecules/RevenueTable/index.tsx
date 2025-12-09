"use client";
import style from "./index.module.scss";
import { QUATERS } from "@/src/constants";
import { ROLE } from "@/src/enums";
import { Fragment } from "react";
import { Controller } from "react-hook-form";

const RevenueTable = (props: any) => {
  const {
    revenueDetails,
    watch,
    control,
    fy,
    subBu,
    accountOwner,
    getSfdcs,
    role,
    setQtr,
  } = props;

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          {accountOwner === "All" && <th></th>}
          {subBu === "All" && <th></th>}
          <th colSpan={5}>Q1</th>
          <th colSpan={5}>Q2</th>
          <th colSpan={5}>Q3</th>
          <th colSpan={5}>Q4</th>
          <th rowSpan={2}>FY Total</th>
        </tr>
        <tr>
          <th style={{ textAlign: "start" }} rowSpan={2}>
            Account Name
          </th>
          {accountOwner === "All" && (
            <th style={{ textAlign: "start" }} rowSpan={2}>
              Account Owner
            </th>
          )}
          {subBu === "All" && (
            <th style={{ textAlign: "start" }} rowSpan={2}>
              Sub BU
            </th>
          )}
          {Object.keys(QUATERS).map((q: string) => (
            <Fragment key={q}>
              <th>
                Contractual
                <br /> ($
                {revenueDetails?.length > 0
                  ? revenueDetails
                      .reduce(
                        (sum: number, revenue: any) =>
                          sum +
                          parseFloat(
                            watch(`${revenue.id}-contractual${q}`) ||
                              revenue[`contractual${q}`] ||
                              0
                          ),
                        0
                      )
                      .toFixed(2)
                  : 0}
                )
              </th>
              <th>
                Projection
                <br /> ($
                {revenueDetails?.length > 0
                  ? revenueDetails
                      .reduce(
                        (sum: number, revenue: any) =>
                          sum + parseFloat(revenue?.[`projection${q}`]),
                        0
                      )
                      .toFixed(2)
                  : 0}
                )
              </th>
              <th>
                Total
                <br /> ($
                {revenueDetails?.length > 0
                  ? revenueDetails
                      .reduce(
                        (sum: number, revenue: any) =>
                          sum +
                          Math.floor(
                            (parseFloat(
                              watch(`${revenue?.id}-contractual${q}`)
                            ) + parseFloat(revenue?.[`projection${q}`]) ||
                              parseFloat(revenue?.[`total${q}`])) * 100
                          ) /
                            100,
                        0
                      )
                      .toFixed(2)
                  : 0}
                )
              </th>
              <th>
                Actual
                <br /> ($
                {revenueDetails?.length > 0
                  ? revenueDetails
                      .reduce(
                        (sum: number, revenue: any) =>
                          sum +
                          parseFloat(
                            watch(`${revenue.id}-actual${q}`) ||
                              revenue[`actual${q}`] ||
                              0
                          ),
                        0
                      )
                      .toFixed(2)
                  : 0}
                )
              </th>
              <th>
                &#916; (Total - Actual)
                <br />
                <span
                  style={
                    revenueDetails
                      ?.reduce(
                        (sum: number, revenue: any) =>
                          sum +
                          (parseFloat(
                            watch(`${revenue.id}-actual${q}`) ||
                              revenue[`actual${q}`] ||
                              0
                          ) -
                            Math.floor(
                              (parseFloat(
                                watch(`${revenue?.id}-contractual${q}`)
                              ) + parseFloat(revenue?.[`projection${q}`]) ||
                                parseFloat(revenue?.[`total${q}`])) * 100
                            ) /
                              100),
                        0
                      )
                      .toFixed(2) < 0
                      ? { color: "red" }
                      : { color: "green" }
                  }
                >
                  ($
                  {revenueDetails?.length > 0
                    ? revenueDetails
                        ?.reduce(
                          (sum: number, revenue: any) =>
                            sum +
                            (parseFloat(
                              watch(`${revenue.id}-actual${q}`) ||
                                revenue[`actual${q}`] ||
                                0
                            ) -
                              Math.floor(
                                (parseFloat(
                                  watch(`${revenue?.id}-contractual${q}`)
                                ) + parseFloat(revenue?.[`projection${q}`]) ||
                                  parseFloat(revenue?.[`total${q}`])) * 100
                              ) /
                                100),
                          0
                        )
                        .toFixed(2)
                    : 0}
                  )
                </span>
              </th>
            </Fragment>
          ))}
        </tr>
      </thead>
      <tbody>
        {revenueDetails?.map((revenue: any) => (
          <tr key={revenue?.id}>
            <td>{revenue?.accountName}</td>
            {accountOwner === "All" && <td>{revenue?.accountOwner}</td>}
            {subBu === "All" && <td>{revenue?.subBU}</td>}
            {Object.keys(QUATERS).map((q: string) => (
              <Fragment key={q}>
                <td>
                  <div>
                    {role != ROLE.FPNA ? (
                      <Controller
                        name={`${revenue?.id}-contractual${q}`}
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <input
                            type="text"
                            defaultValue={revenue?.[`contractual${q}`]}
                            value={value}
                            onChange={onChange}
                          />
                        )}
                      />
                    ) : (
                      revenue?.[`contractual${q}`]
                    )}
                  </div>
                </td>
                <td>
                  <div className={style.projCell}>
                    <button
                      onClick={async () => {
                        setQtr(q);
                        getSfdcs({
                          AccountOwner: revenue?.accountOwner,
                          AccountName: revenue?.accountName,
                          Quarter: `FY${q}`,
                          SubBu: revenue?.subBU,
                          FYear: fy,
                        });
                      }}
                      type="button"
                    >
                      <p>{revenue?.[`projection${q}`]}</p>
                      <img
                        src={
                          role !== ROLE.USER
                            ? "https://cdn0.iconfinder.com/data/icons/instagram-ui-1/24/Instagram-UI_seen-512.png"
                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQqKJfqsvCC6Vhu2vv60C9yK86ew1AF_YhHA&s"
                        }
                        alt=""
                      />
                    </button>
                  </div>
                </td>
                <td>
                  <div>
                    {Math.floor(
                      (parseFloat(watch(`${revenue?.id}-contractual${q}`)) +
                        parseFloat(revenue?.[`projection${q}`]) ||
                        parseFloat(revenue?.[`total${q}`])) * 100
                    ) / 100}
                  </div>
                </td>
                <td>
                  <div>
                    {role === ROLE.FPNA ? (
                      <Controller
                        name={`${revenue.id}-actual${q}`}
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <input
                            value={value}
                            onChange={onChange}
                            defaultValue={revenue?.[`actual${q}`]}
                          />
                        )}
                      />
                    ) : (
                      revenue?.[`actual${q}`]
                    )}
                  </div>
                </td>
                <td>
                  <div
                    style={
                      ((
                        parseFloat(
                          watch(`${revenue.id}-actual${q}`) ||
                            revenue?.[`actual${q}`]
                        ) -
                        Math.floor(
                          (parseFloat(watch(`${revenue?.id}-contractual${q}`)) +
                            parseFloat(revenue?.[`projection${q}`]) ||
                            parseFloat(revenue?.[`total${q}`])) * 100
                        ) /
                          100
                      ).toFixed(2) || revenue?.[`delta${q}`]) < 0
                        ? { color: "red" }
                        : { color: "green" }
                    }
                  >
                    {(
                      parseFloat(
                        watch(`${revenue.id}-actual${q}`) ||
                          revenue?.[`actual${q}`]
                      ) -
                      Math.floor(
                        (parseFloat(watch(`${revenue?.id}-contractual${q}`)) +
                          parseFloat(revenue?.[`projection${q}`]) ||
                          parseFloat(revenue?.[`total${q}`])) * 100
                      ) /
                        100
                    ).toFixed(2) || revenue?.[`delta${q}`]}
                  </div>
                </td>
              </Fragment>
            ))}
            <td>
              $
              {Object.keys(QUATERS)
                .reduce((sum: number, quarter: any) => {
                  const contractual = parseFloat(
                    watch(`${revenue?.id}-contractual${quarter}`)
                  );
                  const projection =
                    parseFloat(revenue?.[`projection${quarter}`]) || 0;
                  const total = parseFloat(revenue?.[`total${quarter}`]) || 0;
                  return (
                    sum +
                    Math.floor((contractual + projection || total) * 100) / 100
                  );
                }, 0)
                .toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RevenueTable;
