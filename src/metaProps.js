import React from 'react';
import {string, array, oneOfType, bool, func} from 'prop-types';


export const propTypes = {
  data: oneOfType([string, array, func]).isRequired,
  headers: array,
  target: string,
  separator: string,
  filename: string,
  uFEFF: bool
};

export const defaultProps = {
  separator: ',',
  filename: 'generatedBy_react-csv.csv',
  uFEFF: true
};

export const PropsNotForwarded = [
  `data`,
  `headers`
];

// export const DownloadPropTypes = Object.assign(
//   {},
//   PropTypes,
//   {
//     : ,
//   }
// );
