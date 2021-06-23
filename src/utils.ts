export const formatNumber = (number: string): string => {
  const integer = parseFloat(number.split(",").join("").split(".")[0]);
  const decimal = number.split(".")[1];
  let result;

  if (isNaN(integer)) {
    result = "";
  } else {
    result = integer.toLocaleString("en", {
      maximumFractionDigits: 0,
    });
  }

  if (decimal != null) {
    return `${result}.${decimal}`;
  } else {
    return result;
  }
};
