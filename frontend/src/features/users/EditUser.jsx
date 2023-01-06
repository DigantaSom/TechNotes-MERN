import { useParams } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';

import useTitle from '../../hooks/useTitle';
import { useGetUsersQuery } from './usersApiSlice';

import EditUserForm from './EditUserForm';

const EditUser = () => {
  useTitle('techNotes: Edit User');

  const { id } = useParams();

  // // subscribed user data (Prefetch.jsx)
  // new request gets made, unlike the below way
  // const user = useSelector(state => selectUserById(state, id));

  // no new request needs to be made, we will work with the data while fetching usersList
  const { user } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });

  if (!user) {
    return <PulseLoader color='#FFF' />;
  }
  return <EditUserForm user={user} />;
};

export default EditUser;
