import React from 'react';
import { View, FlatList, Text } from 'react-native';

import { ENV } from '../../../constants';
import { GeneralModel, TodoModel, UserModel } from '../../models';
import { IEntityMap } from '../../../types';
import Todo from './components/Todo';
import styles from './styles';

export interface ITodoListProps {
  currentUser: UserModel.IUser;
  todoMap: IEntityMap<TodoModel.ITodo>;
  fetchTodoList: (query: GeneralModel.IApiQuery) => void;
}

export default class TodoList extends React.PureComponent<ITodoListProps, {}> {
  public render() {
    const { todoMap } = this.props;
    const todoList = Object.values(todoMap).sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
    return (
      <View style={styles.todoContainer}>
        <View style={styles.todoBody}>
          <Text>this is an infinite scroll, please scroll down :)</Text>
          <FlatList
            data={todoList}
            renderItem={this.renderTodo}
            keyExtractor={this.keyExtractor}
            onEndReached={this.onEndReached(todoList[todoList.length - 1])}
            onEndReachedThreshold={0.5}
          />
        </View>
      </View>
    );
  }

  private keyExtractor = (item: TodoModel.ITodo): string => item._id;

  private renderTodo = ({ item }: { item: TodoModel.ITodo }) => <Todo todo={item} />;

  private onEndReached = (oldestTodo: TodoModel.ITodo) => () => {
    const { fetchTodoList } = this.props;
    fetchTodoList({ page: 1, limit: ENV.PAGINATION.LIMIT, q: { createdAt$ls: oldestTodo.createdAt } });
  };
}
