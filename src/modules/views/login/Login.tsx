import React from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Image, findNodeHandle, InteractionManager, Keyboard } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { BlurView } from '@react-native-community/blur';
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
  keyboardOpen: boolean;
  viewRef: number;
}

export default class Login extends React.PureComponent<ILoginProps, ILoginState> {
  public static navigationOptions = {
    title: 'Login',
    header: null
  };

  public static isAndroid: boolean = ENV.PLATFORM.IS_ANDROID;

  public state: ILoginState = {
    email: 'dgeslin@makingsense.com',
    password: 'password',
    keyboardOpen: false,
    viewRef: null
  };

  public backgroundImage;

  public componentDidMount() {
    const { setNavigation, navigation, checkForUpdates } = this.props;
    setNavigation(navigation);
    checkForUpdates();
    /* istanbul ignore next line */
    Keyboard.addListener('keyboardDidShow', () => this.setState({ keyboardOpen: true }));
    /* istanbul ignore next line */
    Keyboard.addListener('keyboardDidHide', () => this.setState({ keyboardOpen: false }));
  }

  /* istanbul ignore next line */
  public imageLoaded = () => {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
    });
  };

  public render() {
    const { isLoading, hasError } = this.props;
    const { email, password, keyboardOpen } = this.state;

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding" style={styles.keyboardContainer} keyboardVerticalOffset={Login.isAndroid ? ENV.KEYBOARD_VERTICAL_OFFSET : 0}>
          <Image
            source={require('../../../assets/images/background.jpg')}
            ref={img => (this.backgroundImage = img)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0
            }}
            onLoadEnd={this.imageLoaded}
            resizeMode="stretch"
          />
          <BlurView
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0
            }}
            viewRef={this.state.viewRef}
            blurType="dark"
            blurAmount={10}
          />

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
            />
          </View>
        </KeyboardAvoidingView>
        <View style={styles.footerContainer}>
          {!keyboardOpen && (
            <Text style={styles.footer}>
              This screen uses <Text style={styles.highlight}>@react-native-community/blur </Text>
              (a native module) to display a blurred background
            </Text>
          )}
          <Button loading={isLoading} disabled={isLoading} onPress={this.login} title="Login" testID="login-button" disabledStyle={styles.buttonDisabled} />
        </View>
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
