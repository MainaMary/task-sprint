import { v4 as uuidv4 } from 'uuid';
let columns = [
    {
        id: uuidv4(),
        title:'To do',
        tasks:[
            {
                id: uuidv4(),
                title:'Todo one',
                columnId: uuidv4()
            },
            {
                id: uuidv4(),
                title:'Todo two',
                columnId: uuidv4()
            },
            {
                id: uuidv4(),
                title:'Todo three',
                columnId: uuidv4()
            }
        ]

    }
];
let tasks = [];
export default { columns , tasks};
