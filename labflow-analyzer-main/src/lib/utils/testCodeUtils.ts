
export const normalizeTestCode = (code: string): string => {
  const codeMap: { [key: string]: string } = {
    'sgpt_alt': 'alt',
    'sgot_ast': 'ast',
    'alkaline_phosphatase': 'alp',
    'total_bilirubin': 'total_bilirubin',
    'direct_bilirubin': 'direct_bilirubin',
    'indirect_bilirubin': 'indirect_bilirubin',
    'total_protein': 'total_protein',
    'albumin': 'albumin',
    'globulin': 'globulin',
    'ag_ratio': 'ag_ratio',
    'ggt': 'ggt'
  };
  return codeMap[code] || code;
};
