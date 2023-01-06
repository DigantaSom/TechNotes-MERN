import PulseLoader from 'react-spinners/PulseLoader';

import { useGetUsersQuery } from './usersApiSlice';

import User from './User';

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery('usersList', {
    pollingInterval: 60000, // every 60s on this page, it will requery the data
    refetchOnFocus: true, // refetch on putting focus back to browser window
    refetchOnMountOrArgChange: true, // refetch on component mound
  });

  // console.log('usersList:', users);

  let content;

  if (isLoading) {
    content = <PulseLoader color='#FFF' />;
  }

  if (isError) {
    <p className='errmsg'>{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = users;

    const tableContent =
      ids?.length && ids.map(userId => <User key={userId} userId={userId} />);

    content = (
      <table className='table table--users'>
        <thead className='table__thead'>
          <tr>
            <th scope='col' className='table__th user__username'>
              Username
            </th>
            <th scope='col' className='table__th user__roles'>
              Roles
            </th>
            <th scope='col' className='table__th user__edit'>
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};

export default UsersList;
