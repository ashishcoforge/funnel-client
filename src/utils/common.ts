const camelToCapitalCase = (camelStr: string) => {
  let capitalCaseStr = camelStr.replace(/([A-Z])/g, " $1");
  capitalCaseStr =
    capitalCaseStr.charAt(0).toUpperCase() + capitalCaseStr.slice(1);
  return capitalCaseStr;
};

const downloadExcelFile = (blob: any, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
};

const getCurrentFinancialQuarter = () => {
  const date = new Date();
  const month = date.getMonth() + 1; // getMonth() returns 0-11, so add 1 to get 1-12

  if (month >= 4 && month <= 6) {
    return "Q1";
  } else if (month >= 7 && month <= 9) {
    return "Q2";
  } else if (month >= 10 && month <= 12) {
    return "Q3";
  } else {
    return "Q4";
  }
};

const transformData = (input: any) => {
  const result: any = {};

  Object.keys(input).forEach((key) => {
    const [company, quarter] = key.split("-");
    const value = input[key];

    if (!result[company]) {
      result[company] = {};
    }

    result[company][quarter] = value !== null ? parseFloat(value) : null;
  });

  return result;
};

export {
  camelToCapitalCase,
  getCurrentFinancialQuarter,
  downloadExcelFile,
  transformData,
};
