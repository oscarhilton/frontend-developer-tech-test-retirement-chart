import Config from "./config";

export function calculateCompoundInterest(
    principal: number,
    years: number = 1
  ): number {
    const amount = principal * Math.pow((1 + Config.ANNUAL_RATE / Config.MONTHS_PER_YEAR), Config.MONTHS_PER_YEAR * years);
    return parseFloat(amount.toFixed(2));
  }

  export function potNeededForDesiredIncome(desiredAnnualIncome: number, retirementAge: number) {
    const monthlyRate = Config.ANNUAL_RATE / Config.MONTHS_PER_YEAR;
    const months = (Config.LIFE_EXPECTANCY - retirementAge) * Config.MONTHS_PER_YEAR;
    const monthlyIncome = desiredAnnualIncome / Config.MONTHS_PER_YEAR;
  
    const amount = monthlyIncome * ((1 - Math.pow(1 + monthlyRate, -months)) / monthlyRate);
    return parseFloat(amount.toFixed(2));
  }