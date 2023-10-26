import { complement, either, isEmpty, isNil } from 'ramda';

export const eitherEmptyOrNil = either(isEmpty, isNil);

export const neitherEmptyNorNil = complement(eitherEmptyOrNil);

