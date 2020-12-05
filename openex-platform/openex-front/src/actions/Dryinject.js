import * as schema from './Schema';
// eslint-disable-next-line import/no-cycle
import { getReferential, postReferential } from '../utils/Action';

export const fetchDryinjects = (exerciseId, dryrunId, noloading) => (
  dispatch,
) => {
  const uri = `/api/exercises/${exerciseId}/dryruns/${dryrunId}/dryinjects`;
  return getReferential(schema.arrayOfDryinjects, uri, noloading)(dispatch);
};

export const dryinjectDone = (dryinjectId) => (dispatch) => {
  const data = { status: 'SUCCESS', message: "['Manual validation']" };
  const uri = `/api/dryinjects/${dryinjectId}/status`;
  return postReferential(null, uri, data)(dispatch);
};
