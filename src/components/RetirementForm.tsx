import { Formik, Form, Field } from 'formik';
import RetirementChart from './RetirementChart';

export interface RetirementFormValues {
  desiredIncome: number;
  employerContribution: number;
  personalContribution: number;
  retirementAge: number;
  currentAge: number;
  currentPensionPots: number;
}

const initialValues: RetirementFormValues = {
  desiredIncome: 25000,
  employerContribution: 135,
  personalContribution: 45,
  retirementAge: 65,
  currentAge: 25,
  currentPensionPots: 0,
};

const RetirementForm = () => {
  return (
    <div>
      <h2>Retirement Planning</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={() => {}}
      >
        {({ values }) => (
          <>
            <Form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="currentAge">
                  Current Age
                </label>
                <Field
                  type="number"
                  id="currentAge"
                  name="currentAge"
                />
              </div>

              <div>
                <label htmlFor="currentPensionPots">
                  Current Pension Pots Value (£)
                </label>
                <Field
                  type="number"
                  id="currentPensionPots"
                  name="currentPensionPots"
                />
              </div>

              <div>
                <label htmlFor="desiredIncome">
                  Desired Annual Income in Retirement (£)
                </label>
                <Field
                  type="number"
                  id="desiredIncome"
                  name="desiredIncome"
                />
              </div>

              <div>
                <label htmlFor="employerContribution">
                  Monthly Employer Contribution (£)
                </label>
                <Field
                  type="number"
                  id="employerContribution"
                  name="employerContribution"
                />
              </div>

              <div>
                <label htmlFor="personalContribution">
                  Monthly Personal Contribution (£)
                </label>
                <Field
                  type="number"
                  id="personalContribution"
                  name="personalContribution"
                />
              </div>

              <div>
                <label htmlFor="retirementAge">
                  Desired Retirement Age
                </label>
                <Field
                  type="number"
                  id="retirementAge"
                  name="retirementAge"
                />
              </div>
            </Form>
            
            <RetirementChart formValues={values} currentAge={values.currentAge} />
          </>
        )}
      </Formik>
    </div>
  );
};

export default RetirementForm; 