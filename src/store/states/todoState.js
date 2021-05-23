import { schema } from 'normalizr';
import { normalize } from 'normalizr';

/**
 * Initial State
 */

 export const todoState = {
    todos: {
        data: [],
        page: 0,
        perPage: 5,
        selected : 0
    }
}

/**
 * Normalizr definition
 */

const todoSchemaEntity = new schema.Entity("todos",);

export const todoSchemaArray = new schema.Array(todoSchemaEntity);

const normalizedResult = normalize(
    {},
    todoSchemaArray
)



