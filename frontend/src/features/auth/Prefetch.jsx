import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { store } from '../../app/store';
import { usersApiSlice } from '../users/usersApiSlice';
import { notesApiSlice } from '../notes/notesApiSlice';

const Prefetch = () => {
  useEffect(() => {
    // console.log('subscribing');
    // const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
    // const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate());

    store.dispatch(
      notesApiSlice.util.prefetch('getNotes', 'notesList', { force: true })
    );
    store.dispatch(
      usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true })
    );

    // // unsubscribe when go to an unprotected page
    // return () => {
    //   console.log('unsubscribing');
    //   users.unsubscribe();
    //   notes.unsubscribe();
    // };
  }, []);

  return <Outlet />;
};

export default Prefetch;
