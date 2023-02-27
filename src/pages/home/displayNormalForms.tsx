import React from "react";
import { Typography, Grid, Chip, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Alert from "@mui/material/Alert";
export type FunctiotnalDependency = { left: string[]; right: string[] };
export type CompleteDataAboutNormalizedForm = {
  attributes: string[];
  candidateKeys: string[][];
  fds: FunctiotnalDependency[];
  nonPrimeAttributes: string[];
  primeAttributes: string[];
};
export type KindsOfNormalForm = {
  "2NF": [boolean, number[]];
  "3NF": [boolean, number[]];
  BCNF: [boolean, number[]];
};

export type responseObject = {
  minimal_cover?: FunctiotnalDependency[];
  candidate_keys?: string[][];
  normal_form?: KindsOfNormalForm;
  NFForm_2?: CompleteDataAboutNormalizedForm[];
  NFForm_3?: CompleteDataAboutNormalizedForm[];
  BCNF_Form?: CompleteDataAboutNormalizedForm[];
  LossLessJoinMatrix: Array<Array<number>>;
};

type Props = {
  normalFormData: responseObject | undefined;
  query: string;
};

export function CenteredGrid(completeData: CompleteDataAboutNormalizedForm) {
  console.log(completeData, "completeData");
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <Typography color="primary" variant="h6" align="center">
          Attributes
        </Typography>
      </Grid>
      <Grid container spacing={2} justifyContent="center">
        {completeData.attributes.map((attribute) => (
          <Grid item>
            <Chip label={attribute} />
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" color="primary" align="center">
          Functional Dependencies
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography variant="subtitle1" align="center">
          <Grid container spacing={2} justifyContent="center">
            {completeData.fds.map((fd) => (
              <Grid item>
                <Chip label={fd.left} />
              </Grid>
            ))}
          </Grid>
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="subtitle1" align="center">
          <ArrowForwardIcon />
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography variant="subtitle1" align="center">
          <Grid container spacing={2} justifyContent="center">
            {completeData.fds.map((fd) => (
              <Grid item>
                <Chip label={fd.right} />
              </Grid>
            ))}
          </Grid>
        </Typography>
      </Grid>
    </Grid>
  );
}

function displayNormalForms(props: Props) {
  if (props.normalFormData === undefined) {
    return <div></div>;
  }
  const isNormalForm = {};

  if (props.normalFormData.normal_form !== undefined) {
    for (let [key, value] of props.normalFormData.normal_form) {
      console.log(key, value, "key, value");
    }
  }
  return (
    <>
      <Typography
        variant="h3"
        color="primary"
        gutterBottom
        style={{ marginTop: "40px" }}
      >
        {props.query} :
      </Typography>
      {/* <CenteredGrid attributes={props.normalFormData.normalizedToBCNF.attributes} /> */}
      {/* "Find Minimal Cover", "Find Candidate Keys", "Check Normal Form", */}
      {/* "Normalize to 2NF", "Normalize to 3NF", "Normalize to BCNF", */}
      {props.query === "Normalize to BCNF" &&
        props.normalFormData.BCNF_Form?.map((normalForm, index) => (
          <>{CenteredGrid(normalForm)}</>
        ))}
      {props.query === "Normalize to 3NF" &&
        props.normalFormData.NFForm_3?.map((normalForm, index) => (
          <>{CenteredGrid(normalForm)}</>
        ))}
      {props.query === "Normalize to 2NF" &&
        props.normalFormData.NFForm_2?.map((normalForm, index) => (
          <>{CenteredGrid(normalForm)}</>
        ))}
      {console.log(props.normalFormData.normal_form, "props.normalFormData")}
      {props.query === "Check Normal Form" && (
        <>
          {/* <Stack spacing={2}>
            <Alert
              severity={
                props.normalFormData.normal_form?['2NF'][0] ? "success" : "error"
              }
            >
              {props.normalFormData.normal_form?['2NF'][0] ? "2NF is satisfied" : "2NF is not satisfied"}
            </Alert>
         </Stack> */}
        </>
      )}
    </>
  );
}

export default displayNormalForms;
