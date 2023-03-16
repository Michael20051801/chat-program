import { User } from 'client/src/types';
import { useDispatch } from 'react-redux';
import { addUser } from '../store';

const dispatch = useDispatch();

const usersArray: User[] = [
    { name: 'Michael', status: `I'm doing a project`}, 
    { name: 'Daniel',  status: `At the beach`}
]

usersArray.map((user, index) => (
    dispatch(addUser(user))
))

//need help with that