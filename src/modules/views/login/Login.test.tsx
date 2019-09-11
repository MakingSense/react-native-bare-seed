import React from 'react';
import Login, { ILoginProps } from './Login';
import { shallow } from 'enzyme';

import renderer from 'react-test-renderer';

describe('Login', () => {
  let props: ILoginProps;
  beforeEach(() => {
    props = {
      isLoading: false,
      hasError: false,
      login: jest.fn(),
      setNavigation: jest.fn(),
      navigation: jest.fn() as any,
      checkForUpdates: jest.fn()
    };
  });

  it('renders without crashing', () => {
    const rendered = renderer.create(<Login {...props} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it('renders without crashing on Android', () => {
    Login.isAndroid = true;
    const rendered = renderer.create(<Login {...props} />).toJSON();
    expect(rendered).toMatchSnapshot();
    Login.isAndroid = false;
  });

  it('renders showing errors', () => {
    const rendered = renderer.create(<Login {...{ ...props, hasError: true }} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it('should call initial functions when session is NOT checked mounted', () => {
    const wrapper = shallow(<Login {...props} />);
    wrapper.update();
    expect(props.setNavigation).toBeCalledWith(props.navigation);
    expect(props.checkForUpdates).toBeCalled();
  });

  it('should trigger a login', () => {
    const email = 'email';
    const password = 'password';
    const wrapper = shallow(<Login {...props} />);
    wrapper.setState({ email, password });
    (wrapper.find('[testID="login-button"]').prop('onPress') as any)();
    expect(props.login).toBeCalledWith(email, password);
  });

  it('should handleOnChange', () => {
    const email = 'email';
    const password = 'password';
    const wrapper = shallow(<Login {...props} />);
    (wrapper
      .find('TextInput')
      .first()
      .prop('onChangeText') as any)(email);
    (wrapper
      .find('TextInput')
      .last()
      .prop('onChangeText') as any)(password);
    const prevState = JSON.parse(JSON.stringify(wrapper.instance().state));
    expect(wrapper.instance().state).toEqual({ ...prevState, email, password });
  });
});
