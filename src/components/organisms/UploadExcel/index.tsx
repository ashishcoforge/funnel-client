"use client";
import style from "./index.module.scss";
import Navbar from "../../molecules/Navbar";
import Button from "../../atoms/Button";
import { Controller, useForm } from "react-hook-form";
import { apiEndpoints } from "@/src/apiEndpoints";
import { useState } from "react";
import { FIELD_NAME } from "@/src/enums";

const UploadExcel = () => {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm();

  const upload = async (payload: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append(FIELD_NAME.FILE, payload.file[0]);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL + apiEndpoints.UPLOAD_EXCEL}FYear=${
        payload.fy
      }`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    setLoading(false);

    if (data === 1) {
      alert("Data Uploaded Successfully");
    } else {
      alert("Internal Server Problem");
    }
  };

  return (
    <div className={style.UploadExcelContainer}>
      <Navbar />
      <div className={style.UploadExcel}>
        <form onSubmit={handleSubmit(upload)}>
          <div className={style.input}>
            <label htmlFor={FIELD_NAME.FINACIAL_YEAR}>
              Enter the Financial Year:
            </label>
            <Controller
              name={FIELD_NAME.FINACIAL_YEAR}
              control={control}
              render={({ field: { value, onChange } }) => (
                <input value={value} onChange={onChange} />
              )}
            />
          </div>
          <div className={style.upload}>
            <p>Choose your excel file</p>
            <Controller
              name={FIELD_NAME.FILE}
              control={control}
              render={({ field: { onChange } }) => (
                <input
                  type="file"
                  onChange={(e) => {
                    onChange(e.target.files);
                  }}
                />
              )}
            />
          </div>
          <Button type="submit" loading={loading}>
            Upload Data
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UploadExcel;
