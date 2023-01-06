import { useParams } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';

import useAuth from '../../hooks/useAuth';
import { useGetNotesQuery } from './notesApiSlice';
import { useGetUsersQuery } from '../users/usersApiSlice';

import EditNoteForm from './EditNoteForm';

const EditNote = () => {
  const { id } = useParams();

  // new request gets made, unlike the below way
  // const note = useSelector(state => selectNoteById(state, id));
  // const users = useSelector(selectAllUsers);

  const { username, isManager, isAdmin } = useAuth();

  // no new request needs to be made, we will work with the data while fetching notesList
  const { note } = useGetNotesQuery('notesList', {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id],
    }),
  });
  // no new request needs to be made, we will work with the data while fetching usersList
  const { users } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map(id => data?.entities[id]),
    }),
  });

  if (!note || !users?.length) return <PulseLoader color='#FFF' />;

  if (!isManager && !isAdmin) {
    if (note.username !== username) {
      return <p className='errmsg'>No access</p>;
    }
  }

  const content = <EditNoteForm note={note} users={users} />;

  return content;
};

export default EditNote;
