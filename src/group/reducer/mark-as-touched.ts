import { FormGroupState, KeyValue } from '../../state';
import { Actions, MarkAsTouchedAction } from '../../actions';
import { computeGroupState, dispatchActionPerChild, childReducer } from './util';

export function markAsTouchedReducer<TValue extends KeyValue>(
  state: FormGroupState<TValue>,
  action: Actions<TValue>,
): FormGroupState<TValue> {
  if (action.type !== MarkAsTouchedAction.TYPE) {
    return state;
  }

  if (action.controlId !== state.id) {
    return childReducer(state, action);
  }

  if (state.isTouched) {
    return state;
  }

  return computeGroupState(
    state.id,
    dispatchActionPerChild(state.controls, controlId => new MarkAsTouchedAction(controlId)),
    state.value,
    state.errors,
  );
}