import React, {FC, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

export interface AddItemFormPropsType {
    addItemCallback: (title: string) => void
}

export const AddItemForm: FC<AddItemFormPropsType> = React.memo(({addItemCallback}) => {
    const [newTaskTitle, setNewTaskTitle] = useState<string>('');
    const [isEmpty, setIsEmpty] = useState<boolean>(false);

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsEmpty(false)
        setNewTaskTitle(event.target.value)
    }

    const inputKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') createNewTask(newTaskTitle)
    }

    const createNewTask = (title: string) => {
        if (title.trim() === "") {
            setIsEmpty(true)
            return;
        }
        addItemCallback(title)
        setNewTaskTitle('')
    }

    return (
        <div>
            <TextField
                label={'task name'}
                variant={'standard'}
                error={isEmpty}
                value={newTaskTitle}
                onChange={inputChangeHandler}
                onKeyDown={inputKeyDownHandler}
                helperText={isEmpty ? 'Field is required' : ''}
            />
            <IconButton
                onClick={() => {
                    createNewTask(newTaskTitle)
                }}
                color={'success'}
            >
                <ControlPoint/>
            </IconButton>
        </div>
    )
})