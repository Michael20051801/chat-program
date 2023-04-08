import { useDispatch } from 'react-redux';
import { addUser } from '../store';
import { User } from '../types';

const dispatch = useDispatch();

const usersArray: User[] = [
    { name: 'Michael', status: `I'm doing a project`, id: "1"}, 
    { name: 'Daniel',  status: `At the beach`, id: "2"}
]

usersArray.map((user, index) => (
    dispatch(addUser(user))
))

//need help with that