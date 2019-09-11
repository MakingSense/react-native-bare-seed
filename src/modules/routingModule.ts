import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import TodoListContainer from './views/todo-list';
import LoginContainer from './views/login';

const stackNavigator = createStackNavigator(
  {
    Login: LoginContainer,
    TodoList: TodoListContainer
  },
  { initialRouteName: 'Login' }
);

export default createAppContainer(stackNavigator);
