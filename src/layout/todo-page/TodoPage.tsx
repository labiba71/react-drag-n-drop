import React from 'react'
import { useStyles } from './Style';
import SearchIcon from "@material-ui/icons/Search";
import { TextField, Grid, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { CardComponent } from '../../components/card/CardComponents';
import { DrawerComponent } from '../../components/drawer/DrawerComponent';
import { AddTodoForm } from '../../components/addTodo/AddTodoForm';
import { connect, useSelector } from 'react-redux';
import { Item } from "../../type";
import { dragNdrop } from "../../store";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import { useDispatch } from 'react-redux';

const TodoPageComponent = (props: any) => {

  const toolkitState = useSelector((state: any) => state.todoRoot);

  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState<boolean>(false);
  const [searchTodo, setSearchTodo] = React.useState<string>("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleDragEnd = ({ destination, source }: any) => {
    if (!destination) {
      return
    }

    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return
    }

    console.log(destination, source);
    dispatch(dragNdrop({ destination, source }))
  }

  return (
    <div className={classes.root}>
      <DrawerComponent setOpen={setOpen} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <SearchIcon />
            </Grid>
            <Grid item xs={11}>
              <TextField
                className={classes.searchContainer}
                onChange={(e) => {
                  e.preventDefault();
                  setSearchTodo(e.target.value);
                }}
                id="input-with-icon-grid"
                label="Search"
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.dragAndDrop}>
          <DragDropContext onDragEnd={handleDragEnd
          }>
            {_.map(toolkitState, (data, key) => {
              return (
                <div key={key} className={classes.column}>
                  <h3>{data.title}</h3>
                  <Droppable droppableId={key}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={classes.droppableCol}
                        >
                          {searchTodo ?
                            (data.items.filter((item: any) => !item.title.toLowerCase().indexOf(searchTodo.toLowerCase())).map((filteredItem: any, index: number) => {
                              return (
                                <Draggable key={filteredItem.id} index={index} draggableId={filteredItem.id}>
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <CardComponent key={filteredItem.id} todo={filteredItem} />
                                      </div>
                                    )
                                  }}
                                </Draggable>
                              )
                            }))
                            : data.items.map((el: Item, index: number) => {
                              return (
                                <Draggable key={el.id} index={index} draggableId={el.id}>
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <CardComponent key={el.id} todo={el} />
                                      </div>
                                    )
                                  }}
                                </Draggable>
                              )
                            })}
                          {provided.placeholder}
                        </div>
                      )
                    }}
                  </Droppable>
                </div>
              )
            })}
          </DragDropContext>
        </div>
      </main>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title">{"Add Todo"}</DialogTitle>
        <DialogContent>
          <AddTodoForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export const TodoPage = connect(null, {
})(TodoPageComponent);
