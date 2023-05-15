import { strings } from '../../utils';
import contractInfo from './contractInfo.json';
import numTokens from './numTokens.json';
import minter from './minter.json';

export const inputQueries = {
  contractInfo: strings.stoba(JSON.stringify(contractInfo)),
  numTokens: strings.stoba(JSON.stringify(numTokens)),
  minter: strings.stoba(JSON.stringify(minter)),
};
