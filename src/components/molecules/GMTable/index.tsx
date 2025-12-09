"use client";
import { Fragment } from "react";
import { Controller } from "react-hook-form";
import { QUATERS } from "@/src/constants";
import { ROLE } from "@/src/enums";

const GMTable = (props: any) => {
  const { accountOwner, subBu, GMDetails, role, control, watch } = props;

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          {accountOwner === "All" && <th></th>}
          {subBu === "All" && <th></th>}
          {Object.keys(QUATERS).map((q) => (
            <Fragment key={q}>
              <th colSpan={3}>{q}</th>
            </Fragment>
          ))}
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
          {Object.keys(QUATERS).map((q) => (
            <Fragment key={q}>
              <th>BE %</th>
              <th>Actual %</th>
              <th>Δ (A - BE) %</th>
            </Fragment>
          ))}
        </tr>
      </thead>
      <tbody>
        {GMDetails?.map((gm: any) => (
          <tr key={gm?.id}>
            <td>{gm?.accountName}</td>
            {accountOwner === "All" && <td>{gm?.accountOwner}</td>}
            {subBu === "All" && <td>{gm?.subBU}</td>}
            {Object.keys(QUATERS).map((q) => (
              <Fragment key={q}>
                <td>
                  <div>
                    {role !== ROLE.FPNA ? (
                      <Controller
                        name={`${gm?.id}-estimatedGM${q}`}
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <input
                            type="text"
                            defaultValue={gm?.[`estimatedGM${q}`]}
                            value={value}
                            onChange={onChange}
                          />
                        )}
                      />
                    ) : (
                      gm?.[`estimatedGM${q}`]
                    )}
                  </div>
                </td>
                <td>
                  <div>
                    {role === ROLE.FPNA ? (
                      <Controller
                        name={`${gm.id}-actualGM${q}`}
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <input
                            value={value}
                            onChange={onChange}
                            defaultValue={gm?.[`actualGM${q}`]}
                          />
                        )}
                      />
                    ) : (
                      gm?.[`actualGM${q}`]
                    )}
                  </div>
                </td>
                <td>
                  <div
                    style={
                      parseFloat(
                        (
                          parseFloat(
                            watch(`${gm.id}-actualGM${q}`) ??
                              gm?.[`actualGM${q}`] ??
                              0
                          ) -
                          parseFloat(
                            watch(`${gm?.id}-estimatedGM${q}`) ??
                              gm?.[`estimatedGM${q}`] ??
                              0
                          )
                        ).toFixed(2) ?? gm?.[`deltaGM${q}`]
                      ) < 0
                        ? { color: "red" }
                        : { color: "green" }
                    }
                  >
                    {(
                      parseFloat(
                        watch(`${gm.id}-actualGM${q}`) ||
                          gm?.[`actualGM${q}`] ||
                          0
                      ) -
                      parseFloat(
                        watch(`${gm?.id}-estimatedGM${q}`) ||
                          gm?.[`estimatedGM${q}`] ||
                          0
                      )
                    ).toFixed(2) ||
                      gm?.[`deltaGM${q}`] ||
                      0}
                  </div>
                </td>
              </Fragment>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GMTable;
