import { differenceInYears, isAfter, isSameYear } from 'date-fns';
export const  format = 'MM/DD/YYYY'

export const prepareDateUsingLocalFormat =(date,isReturnYearOnly=false)=>{
  return isReturnYearOnly?new Date(date).getFullYear():new Date(date).toLocaleDateString();
}
export const validateStartDate = (fiscalYear)=>{
  return {
    validator(_, value) {
      if (!isDateBetweenFiscalYear(fiscalYear,value)){
        return getReject(`Starting date must be in between ${new Date(fiscalYear).getFullYear()} year`)
      } else {
        return Promise.resolve()
      }
    },
  };
}

export const validateFiscalYearStartDate = (fiscalYear,startDate)=>{
  return {
    validator(_, value) {
      if (!getYearsDifference(fiscalYear,startDate)){
        return getReject(`Something is not good with starting date. FYI Starting date must start on
        ${new Date(fiscalYear).getFullYear()-1} or ${new Date(fiscalYear).getFullYear()}`)
      } else {
        return Promise.resolve()
      }
    },
  };
}



export const validateEndDate =(fiscalYear,startDate)=>{
  return {
    validator(_, value) {
      if(isDateAfterFiscalYear(startDate,value)){
        return Promise.reject(
          new Error(
            `The selected End date must come after the selected Start date`
          )
        );
      } else {
        return Promise.resolve()
      }
    },
  };
}

const getReject =(message)=>{
  return Promise.reject(
    new Error(
      message
    )
  );
}
 const isDateBetweenFiscalYear =(fiscalYear,value)=>{
  return isSameYear(new Date(value),new Date(fiscalYear))
}
 const isDateAfterFiscalYear =(startDate,endDate)=>{
  return isAfter(new Date(startDate),new Date(endDate))
}

const getYearsDifference = (fiscalYear,startDate)=>{
  const result = differenceInYears(new Date(fiscalYear),new Date(startDate))
  console.log(result)
  if (result ===0||result === 1){
    return true
  } else {
    return false
  }
}

