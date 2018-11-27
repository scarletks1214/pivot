import { AllConditionDisplay, AllConditionForm } from './AllCondition';
import { AnyConditionDisplay, AnyConditionForm } from './AnyCondition';
import { AngleConditionDisplay, AngleConditionForm } from './AngleCondition';
import { NoneConditionDisplay, NoneConditionForm } from './NoneCondition';

import _ConditionDisplay from './ConditionDisplay';
import _ConditionForm from './ConditionForm';

_ConditionDisplay.TYPES['angle'] = AngleConditionDisplay;
_ConditionForm.TYPES['angle'] = AngleConditionForm;
_ConditionDisplay.TYPES['all'] = AllConditionDisplay;
_ConditionForm.TYPES['all'] = AllConditionForm;
_ConditionDisplay.TYPES['any'] = AnyConditionDisplay;
_ConditionForm.TYPES['any'] = AnyConditionForm;
_ConditionDisplay.TYPES['none'] = NoneConditionDisplay;
_ConditionForm.TYPES['none'] = NoneConditionForm;

export const ConditionDisplay = _ConditionDisplay;
export const ConditionForm = _ConditionForm;
