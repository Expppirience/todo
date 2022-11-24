import React, {ChangeEvent, FC, useState} from "react";
import {TextField} from "@mui/material";

// ? Types
interface EditableElementPropsType {
    title: string;
    onChange: (text: string) => void
}

// ? Component
export const EditableElement: FC<EditableElementPropsType>
    =
    (props) => {
        // * States
        const [editMode, setEditMode] = useState<boolean>(false);
        const [title, setTitle] = useState<string>('');
        // * Utils

        const activateEditMode = () => {
            setEditMode(true)
            setTitle(props.title)
        }
        const activeViewMode = () => {
            setEditMode(false)
            props.onChange(title)
        }
        const titleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)


        // * Return
        return (
            editMode
                ? <TextField variant={'standard'} value={title} onChange={titleChangeHandler} onBlur={activeViewMode} type="text" autoFocus/>
                : <span onDoubleClick={activateEditMode}>{props.title}</span>
        )
    }