import { calculateCompoundInterest } from "./calculations";
import Config from "./config";

type ChartType = 'Projected Pot' | 'Required Pot' | 'Current Pots';
export interface ChartData {
  x: number;
  y: number;
  type: ChartType;
}

export function getAccumulationData(
    yearsUntilRetirement: number,
    currentAge: number,
    currentPensionPots: number,
    totalMonthlyContribution: number
): ChartData[] {
    const accumulationData = [] as ChartData[];

    for (let year = 0; year <= yearsUntilRetirement; year++) {
        const age = currentAge + year;

        const grownCurrentPot = calculateCompoundInterest(currentPensionPots, year);

        let grownContributions = 0;
        for (let contributionYear = 0; contributionYear < year; contributionYear++) {
            const yearsToGrow = year - contributionYear;
            const annualContribution = totalMonthlyContribution * Config.MONTHS_PER_YEAR;
            grownContributions += calculateCompoundInterest(annualContribution, yearsToGrow);
        }

        const totalPotValue = grownCurrentPot + grownContributions;

        accumulationData.push({ 
            x: age, 
            y: totalPotValue, 
            type: 'Projected Pot'
        });
    }

    return accumulationData;
}


export function getDecumulationData(
  accumulationData: ChartData[],
  retirementAge: number,
  desiredAnnualIncome: number
): ChartData[] {
  const result: ChartData[] = [];

  const monthlyInterestRate = Config.ANNUAL_RATE / Config.MONTHS_PER_YEAR;
  const monthlyIncomeDraw = desiredAnnualIncome / Config.MONTHS_PER_YEAR;

  let currentPot = accumulationData[accumulationData.length - 1].y;
  let currentAge = retirementAge;
  let monthsIntoRetirement = 0;

  while (currentPot > 0 && currentAge <= Config.LIFE_EXPECTANCY) {
    
    currentPot *= 1 + monthlyInterestRate;
    currentPot -= monthlyIncomeDraw;
    currentPot = Math.max(0, currentPot);

    const isFullYear = monthsIntoRetirement % 12 === 0;
    if (isFullYear) {
      result.push({
        x: currentAge,
        y: currentPot,
        type: 'Projected Pot',
      });
    }

    monthsIntoRetirement++;
    currentAge = retirementAge + monthsIntoRetirement / 12;
  }

  return result;
}