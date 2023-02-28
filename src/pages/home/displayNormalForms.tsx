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
export type OtherKindsOfNormalForm = {
  is2NF: [boolean, number[]];
  is3NF: [boolean, number[]];
  isBCNF: [boolean, number[]];
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

export function CenteredGrid2(
  completeData: FunctiotnalDependency,
  heading1: string,
  heading2: string
) {
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <Typography color="primary" variant="h6" align="center">
          {heading1}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" color="primary" align="center">
          {heading2}
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography variant="subtitle1" align="center">
          <Grid container spacing={2} justifyContent="center">
            {completeData.left.map((fd, index) => (
              <Grid item key={index}>
                <Chip label={fd} />
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
            {completeData.right.map((fd, index) => (
              <Grid item key={index}>
                <Chip label={fd} />
              </Grid>
            ))}
          </Grid>
        </Typography>
      </Grid>
    </Grid>
  );
}
export function CenteredGrid(
  completeData: CompleteDataAboutNormalizedForm,
  heading1: string,
  heading2: string
) {
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <Typography color="primary" variant="h6" align="center">
          {heading1}
        </Typography>
      </Grid>
      <Grid container spacing={2} justifyContent="center">
        {completeData.attributes.map((attribute, index) => (
          <Grid item key={index}>
            <Chip label={attribute} />
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" color="primary" align="center">
          {heading2}
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography variant="subtitle1" align="center">
          <Grid container spacing={2} justifyContent="center">
            {completeData.fds.map((fd, index) => (
              <Grid item key={index}>
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
            {completeData.fds.map((fd, index) => (
              <Grid item key={index}>
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
  let isNormalForm: OtherKindsOfNormalForm = {
    is2NF: [false, []],
    is3NF: [false, []],
    isBCNF: [false, []],
  };
  if (props.normalFormData.normal_form !== undefined) {
    isNormalForm["is2NF"] = props.normalFormData.normal_form["2NF"];
    isNormalForm["is3NF"] = props.normalFormData.normal_form["3NF"];
    isNormalForm["isBCNF"] = props.normalFormData.normal_form["BCNF"];
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
          <>
            {CenteredGrid(normalForm, "Attributes", "Functional Dependencies")}
          </>
        ))}
      {props.query === "Normalize to 3NF" &&
        props.normalFormData.NFForm_3?.map((normalForm, index) => (
          <>
            {CenteredGrid(normalForm, "Attributes", "Functional Dependencies")}
          </>
        ))}
      {props.query === "Normalize to 2NF" &&
        props.normalFormData.NFForm_2?.map((normalForm, index) => (
          <>
            {CenteredGrid(normalForm, "Attributes", "Functional Dependencies")}
          </>
        ))}
      {props.query === "Check Normal Form" && (
        <>
          <Stack spacing={2}>
            <Alert severity={isNormalForm.is2NF[0] ? "success" : "error"}>
              {isNormalForm.is2NF[0] ? "2NF" : "Not 2NF"}
            </Alert>
            <Alert severity={isNormalForm.is3NF[0] ? "success" : "error"}>
              {isNormalForm.is3NF[0] ? "3NF" : "Not 3NF"}
            </Alert>
            <Alert severity={isNormalForm.isBCNF[0] ? "success" : "error"}>
              {isNormalForm.isBCNF[0] ? "BCNF" : "Not BCNF"}
            </Alert>
          </Stack>
        </>
      )}
      {props.query === "Find Candidate Keys" && (
        <>
          <Typography variant="subtitle1" align="center">
            <Grid container spacing={2} justifyContent="center">
              {props.normalFormData.candidate_keys?.map(
                (candidate_keys, index) => (
                  <Grid item key={index}>
                    <Chip label={candidate_keys} />
                  </Grid>
                )
              )}
            </Grid>
          </Typography>
        </>
      )}
      {props.query === "Find Minimal Cover" &&
        props.normalFormData.minimal_cover?.map((fd) => (
          <>{CenteredGrid2(fd, "Minimal Cover", "")}</>
        ))}
    </>
  );
}

export default displayNormalForms;
