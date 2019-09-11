import React from 'react';
import renderer from 'react-test-renderer';

import Avatar from './Avatar';

describe('Avatar', () => {
  let props;
  beforeEach(() => {
    props = {
      avatar: 'https://avatar.jpg'
    };
  });
  it('renders without crashing', () => {
    const rendered = renderer.create(<Avatar {...props} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});
