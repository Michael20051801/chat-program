import { useDispatch } from 'react-redux';
import { addUser } from '../store';
import { Person } from '../types';

const dispatch = useDispatch();

const usersArray: Person[] = [
    { name: 'Michael', status: `I'm doing a project`, id: "1"}, 
    { name: 'Daniel',  status: `At the beach`, id: "2"}
]

usersArray.map((person, index) => (
    dispatch(addUser(person))
))

//need help with that