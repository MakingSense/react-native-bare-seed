import React from 'react';
import { View, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { Button } from 'react-native-elements';

import { ENV, STYLE } from '../../../constants';
import styles from './styles';

export interface ILoginProps {
  isLoading: boolean;
  hasError: boolean;
  navigation: NavigationScreenProp<any, any>;
  login: (email: string, password: string) => void;
  setNavigation: (navigation: NavigationScreenProp<any, any>) => void;
  checkForUpdates: () => void;
}

export interface ILoginState {
  email: string;
  password: string;
}

export default class Login extends React.PureComponent<ILoginProps, ILoginState> {
  public static navigationOptions = {
    header: null
  };

  public static isAndroid: boolean = ENV.PLATFORM.IS_ANDROID;

  public state: ILoginState = {
    email: 'dgeslin@makingsense.com',
    password: 'password'
  };

  public componentDidMount() {
    const { setNavigation, navigation, checkForUpdates } = this.props;
    setNavigation(navigation);
    checkForUpdates();
  }

  public render() {
    const { isLoading, hasError } = this.props;
    const { email, password } = this.state;

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding" style={styles.keyboardContainer} keyboardVerticalOffset={Login.isAndroid ? ENV.KEYBOARD_VERTICAL_OFFSET : 0}>
          {hasError ? <Text style={styles.headingError}>{'Oops! Invalid email or password'}</Text> : null}
          <Text style={styles.heading1}>Making Sense RN seed</Text>
          <Text style={styles.heading2}>Please login to your account</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{'EMAIL:'}</Text>
            <TextInput
              keyboardType="email-address"
              placeholder="Enter your email..."
              placeholderTextColor={STYLE.COLOR.OCTANARY}
              style={[styles.input, hasError && styles.inputError]}
              underlineColorAndroid="rgba(0, 0, 0, 0)"
              value={email}
              onChangeText={value => this.handleOnChange('email', value)}
              testID="email-input"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{'Password:'.toUpperCase()}</Text>
            <TextInput
              placeholder="Enter your password..."
              placeholderTextColor={STYLE.COLOR.OCTANARY}
              secureTextEntry={true}
              style={[styles.input, hasError && styles.inputError]}
              underlineColorAndroid="rgba(0, 0, 0, 0)"
              value={password}
              onChangeText={value => this.handleOnChange('password', value)}
              testID="password-input"
            />
          </View>
          <Button loading={isLoading} disabled={isLoading} onPress={this.login} title="Login" testID="login-button" disabledStyle={styles.buttonDisabled} />
        </KeyboardAvoidingView>
      </View>
    );
  }

  private handleOnChange(field: 'email' | 'password', value: string) {
    this.setState({ [field]: value } as any);
  }

  private login = () => {
    const { email, password } = this.state;
    const { login } = this.props;
    login(email, password);
  };
}
