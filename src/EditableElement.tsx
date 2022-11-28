import React, {ChangeEvent, FC, useCallback, useState} from "react";
import {TextField} from "@mui/material";

// ? Types
interface EditableElementPropsType {
   title: string;
   onChange: (text: string) => void
}

// ? Component
export const EditableElement: FC<EditableElementPropsType>
   =
   React.memo(
      (props) => {
         // * States
         const [editMode, setEditMode] = useState<boolean>(false);
         const [title, setTitle] = useState<string>('');
         // * Utils

         const activateEditMode = () => {
            setEditMode(true)
            setTitle(props.title)
         }
         const activeViewMode = useCallback(() => {
            setEditMode(false)
            props.onChange(title)
         }, [title])
         const titleChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value), [])


         console.log('rendering editable element')

         // * Return
         return (
            editMode
               ? <TextField variant={'standard'} value={title} onChange={titleChangeHandler} onBlur={activeViewMode}
                            type="text" autoFocus/>
               : <span onDoubleClick={activateEditMode}>{props.title}</span>
         )
      })