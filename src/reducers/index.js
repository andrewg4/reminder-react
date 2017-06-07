import {ADD_REMINDER, CLEAR_REMINDER, DELETE_REMINDER} from "../constants/constants";
import {bake_cookie, read_cookie} from "sfcookies";

const reminder = (action) => {
    let {text, dueDate} = action;
    return {
        id: Math.random(),
        text,
        dueDate
    }
};

const removeById = (state = [], id) => {
    return state.filter(reminder => reminder.id !== id);
};

const reminders = (state = [], action) => {
    let reminders = null;
    state = read_cookie('reminders');
    switch (action.type) {
        case ADD_REMINDER:
            reminders = [...state, reminder(action)];
            bake_cookie('reminders', reminders);
            return reminders;
        case DELETE_REMINDER:
            reminders = removeById(state, action.id);
            bake_cookie('reminders', reminders);
            return reminders;
        case CLEAR_REMINDER:
            reminders = [];
            bake_cookie('reminders', reminders);
            return reminders;
        default:
            return state || [];
    }
};

export default reminders;