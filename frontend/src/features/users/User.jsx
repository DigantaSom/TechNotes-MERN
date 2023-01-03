import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import { useGetUsersQuery } from './usersApiSlice';

const User = ({ userId }) => {
  // const user = useSelector(state => selectUserById(state, userId));

  // it's getting the data from the already queried data, not refetching from the server
  const { user } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });

  const navigate = useNavigate();

  if (!user) {
    return null;
  } else {
    const handleEdit = () => navigate(`/dash/users/${userId}`);

    const userRolesString = user.roles.toString().replaceAll(',', ', ');

    const cellStatus = user.active ? '' : 'table__cell--inactive';

    return (
      <tr className='table__row user'>
        <td className={`table__cell ${cellStatus}`}>{user.username}</td>
        <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
        <td className={`table__cell ${cellStatus}`}>
          <button onClick={handleEdit} className='icon-button table__button'>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  }
};

// this component will only re-render when there are changes in the data of only this component
const memoizedUser = memo(User);

export default memoizedUser;
