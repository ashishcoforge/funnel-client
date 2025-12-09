import style from "./index.module.scss";

interface ISelectDropDown {
  options: string[];
  value: string;
  placeholder?: string;
  onChange: any;
  defaultValue?: string;
}

const SelectDropDown = (props: ISelectDropDown) => {
  const { options, value, onChange, placeholder, defaultValue } = props;

  return (
    <select
      className={`form-select ${style.select}`}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
    >
      {placeholder && <option>{placeholder}</option>}
      {options?.map((opt: any) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
};

export default SelectDropDown;
