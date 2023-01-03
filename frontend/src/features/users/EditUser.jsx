import { useParams } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';

import { useGetUsersQuery } from './usersApiSlice';

import EditUserForm from './EditUserForm';

const EditUser = () => {
  const { id } = useParams();

  // // subscribed user data (Prefetch.jsx)
  // const user = useSelector(state => selectUserById(state, id));

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
