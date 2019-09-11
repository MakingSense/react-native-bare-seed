import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import TodoList, { ITodoListProps } from './TodoList';
import { ENV } from '../../../constants';
import { getState, getUser_1, getTodo_1 } from '../../../test/entities';

describe('TodoList', () => {
  let props: ITodoListProps;
  beforeEach(() => {
    props = {
      currentUser: getUser_1(),
      todoMap: getState().todo.todoMap,
      fetchTodoList: jest.fn()
    };
  });

  it('renders without crashing', () => {
    const rendered = renderer.create(<TodoList {...props} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it('should onEndReached', () => {
    const wrapper = shallow(<TodoList {...props} />);
    props.todoMap = { [getTodo_1()._id]: getTodo_1() };
    (wrapper.instance() as any).onEndReached(getTodo_1())();
    expect(props.fetchTodoList).toBeCalledWith({ page: 1, limit: ENV.PAGINATION.LIMIT, q: { createdAt$ls: getTodo_1().createdAt } });
  });
});
