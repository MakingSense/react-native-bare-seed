import React from 'react';
import renderer from 'react-test-renderer';

import Todo, { ITodoProps } from './Todo';
import { getTodo_1 } from '../../../../../test/entities';

describe('Login', () => {
  let props: ITodoProps;
  beforeEach(() => {
    props = { todo: getTodo_1() };
  });

  it('renders without crashing', () => {
    const rendered = renderer.create(<Todo {...props} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});
