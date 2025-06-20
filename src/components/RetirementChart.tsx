import { VictoryChart, VictoryLine, VictoryAxis, VictoryLegend, VictoryTheme, VictoryScatter } from 'victory';
import type { RetirementFormValues } from './RetirementForm';
import { getAccumulationData, getDecumulationData } from '../lib/chartCalculations';
import { potNeededForDesiredIncome } from '../lib/calculations';
import { useMemo } from 'react';

interface RetirementChartProps {
  formValues: RetirementFormValues;
  currentAge: number;
}

const RetirementChart = ({ formValues, currentAge }: RetirementChartProps) => {
  const { retirementAge, employerContribution, personalContribution, currentPensionPots, desiredIncome } = formValues;

  const totalMonthlyContribution = employerContribution + personalContribution;
  const yearsUntilRetirement = retirementAge - currentAge;

  const accumulationData = useMemo(() => 
    getAccumulationData(yearsUntilRetirement, currentAge, currentPensionPots, totalMonthlyContribution),
   [yearsUntilRetirement, currentAge, currentPensionPots, totalMonthlyContribution]
  );
  const decumulationData = useMemo(() => 
    getDecumulationData(accumulationData, retirementAge, desiredIncome),
    [accumulationData, retirementAge, desiredIncome]
  );
  const requiredPot = useMemo(() => potNeededForDesiredIncome(desiredIncome, retirementAge), [desiredIncome, retirementAge]);

  const retirementAgeMarker = useMemo(() => [{
    x: retirementAge,
    y: 0
  }, {
    x: retirementAge,
    y: accumulationData[accumulationData.length - 1].y
  }], [retirementAge, accumulationData]);

  return (
    <div>
      <h3>Retirement Projection</h3>
      <div>
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={20}
          height={500}
        >
          <VictoryAxis
            label="Age"
            tickFormat={(t) => `${t}`}
          />
          <VictoryAxis
            dependentAxis
            label="Pension Pot Value (£)"
            tickFormat={(t) => `£${(t / 1000).toFixed(0)}k`}
          />
          <VictoryLine
            data={accumulationData.concat(decumulationData)}
            x="x"
            y="y"
            style={{
              data: { stroke: "#4299e1" }
            }}
          />
          <VictoryLine
            data={retirementAgeMarker}
            x="x"
            y="y"
            style={{
              data: { stroke: "#718096", strokeDasharray: "5,5" }
            }}
          />
          <VictoryScatter
            data={[{ x: retirementAge, y: 0 }]}
            style={{ data: { fill: "#718096" } }}
          />
          <VictoryLine
            data={[{ x: 0, y: requiredPot }, { x: 100, y: requiredPot }]}
            style={{ data: { stroke: "red", strokeDasharray: "5,5" } }}
          />
          <VictoryLegend
            x={50}
            y={50}
            orientation="horizontal"
            gutter={20}
            data={[
              { name: "Projected Pot", symbol: { fill: "#4299e1" } },
              { name: "Required Pot", symbol: { fill: "#e53e3e" } },
              { name: "Retirement Age", symbol: { fill: "#718096" } }
            ]}
          />
        </VictoryChart>
      </div>
    </div>
  );
};

export default RetirementChart; 