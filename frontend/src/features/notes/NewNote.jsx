import PulseLoader from 'react-spinners/PulseLoader';
import { useGetUsersQuery } from '../users/usersApiSlice';

import NewNoteForm from './NewNoteForm';

const NewNote = () => {
  // const users = useSelector(selectAllUsers);
  const { users } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map(id => data?.entities[id]),
    }),
  });

  if (!users?.length) return <PulseLoader color='#FFF' />;

  return <NewNoteForm users={users} />;
};

export default NewNote;
