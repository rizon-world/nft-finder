import { stoba } from '../../utils';
import contractInfo from './contractInfo.json';
import numTokens from './numTokens.json';

export const inputQueries = {
  contractInfo: stoba(JSON.stringify(contractInfo)),
  numTokens: stoba(JSON.stringify(numTokens)),
};
