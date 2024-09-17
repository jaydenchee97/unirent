/* eslint-disable prettier/prettier */
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import React, { useState } from "react";
import { Platform, View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Dimensions, Linking } from "react-native";
import { Auth } from "aws-amplify";
import QRCode from "react-native-qrcode-svg";

const { width } = Dimensions.get("window");
//const navigation = useNavigation();

const LoginScreen = ({ onLoginSuccess } : { onLoginSuccess: () => void}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // Email state for sign-up
  const [confirmationCode, setConfirmationCode] = useState(""); // For MFA/Confirmation code
  const [isSignUp, setIsSignUp] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false); // To handle MFA/confirmation code view
  const [isMFARequired, setIsMFARequired] = useState(false); // To handle MFA during sign-in
  const [isSettingUpMFA, setIsSettingUpMFA] = useState(false); // To handle MFA setup after sign-up
  const [mfaCode, setMfaCode] = useState(""); // For MFA code input during sign-in
  const [errorMessage, setErrorMessage] = useState("");
  const [mfaSetup, setMfaSetup] = useState(""); //For storing TOTP url
  const [user, setUser] = useState(null);

  const signInWithGoogle = async () => {
    setErrorMessage(""); // Clear error message before starting Google sign-in
    try {
      await Auth.federatedSignIn({
        provider: CognitoHostedUIIdentityProvider.Google,
      });
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setErrorMessage("Error signing in with Google. Please try again.");
    }
  };

  const handleAuth = async () => {
    setErrorMessage(""); // Clear error message before starting sign-up/sign-in
    try {
      if (isSignUp) {
        // Sign up
        const { user } = await Auth.signUp({
          username,
          password,
          attributes: { email }, // Send email with sign-up
        });
        setUser(user);
        //setErrorMessage("Sign up successful! Please enter the confirmation code sent to your email.");
        setIsConfirming(true); // Switch to MFA/confirmation code state
      } else {
        // Log in
        // const user = await Auth.signIn(username, password);
        // setUser(user);
        await Auth.federatedSignIn();
        // Check if MFA is required
        if (user.challengeName === 'SOFTWARE_TOKEN_MFA') {
          setIsMFARequired(true); // Switch to MFA code input state
        } else {
          onLoginSuccess(); // If no MFA, log in directly
        }
      }
    } catch (error) {
      setErrorMessage(isSignUp ? "Error signing up. Please try again." : "Error signing in. Please check your credentials.");
      console.log("Auth error:", error);
    }
  };

/*
  const handleAuth = async () => {
    setErrorMessage(""); // Clear error message before starting sign-up/sign-in
    try {
      if (isSignUp) {
        // Redirect to the Cognito Hosted UI for Sign-up
        const signUpUrl = `https://${process.env.EXPO_PUBLIC_OAUTH_DOMAIN}/signup?client_id=${process.env.EXPO_PUBLIC_USER_POOL_WEB_CLIENT_ID}&response_type=code&redirect_uri=${process.env.EXPO_PUBLIC_OAUTH_REDIRECT_SIGN_IN}&scope=email+openid+phone+aws.cognito.signin.user.admin`;
        window.location.href = signUpUrl;
      } else {
        
        // Redirect to the Cognito Hosted UI for Log-in
        let loginUrl;
        // eslint-disable-next-line no-unused-expressions
        Platform.OS === "web" ? 
        loginUrl = `https://${process.env.EXPO_PUBLIC_OAUTH_DOMAIN}/login?client_id=${process.env.EXPO_PUBLIC_USER_POOL_WEB_CLIENT_ID}&response_type=code&redirect_uri=${process.env.EXPO_PUBLIC_OAUTH_REDIRECT_SIGN_IN}&identity_provider=COGNITO&scope=`: 
        loginUrl = `https://${process.env.EXPO_PUBLIC_OAUTH_DOMAIN}/login?client_id=${process.env.EXPO_PUBLIC_USER_POOL_WEB_CLIENT_ID}&response_type=code&redirect_uri=${process.env.EXPO_PUBLIC_OAUTH_REDIRECT_SIGN_IN_MOBILE}&identity_provider=COGNITO&scope=`; 
        
        if(Platform.OS === "web") {
          window.location.href = loginUrl;
        } else {
          //await Linking.openURL(loginUrl);
          await Auth.federatedSignIn();
        }
        
      }
    } catch (error) {
      setErrorMessage(isSignUp ? "Error signing up. Please try again." : "Error signing in. Please check your credentials.");
      console.log("Auth error:", error);
    }
  };
*/
  const handleConfirmCode = async () => {
    setErrorMessage(""); // Clear error message before confirming code
    try {
      const result = await Auth.confirmSignUp(username, confirmationCode);
      setErrorMessage("Confirmation successful! Please set up MFA.");
      setIsConfirming(false);
      setIsSettingUpMFA(true); // Switch to MFA setup state
      handleMFASetup();
    } catch (error) {
      setErrorMessage("Error confirming sign-up. Please try again.");
      console.log("Confirmation error:", error);
    }
  };

  const handleMFASetup = async () => {
    setErrorMessage(""); // Clear error message before MFA setup
    try {
      const user = await Auth.signIn(username, password); // Log in the user to access MFA setup
      setUser(user);
      const totpCode = await Auth.setupTOTP(user); // Setup MFA with TOTP
      const totpUri = `otpauth://totp/UniRent:${username}?secret=${totpCode}&issuer=UniRent`;
      setMfaSetup(totpUri);
    } catch (error) {
      setErrorMessage("Error setting up MFA. Please try again.");
      console.log("MFA setup error:", error);
    }
  };

  const handleMFA = async () => {
    try {
      setErrorMessage("");
      const currentMfa = mfaCode;
      setMfaCode("");
      // Assuming 'user' is the current signed-in user
      if (user) {
        if(isSignUp){
          await Auth.verifyTotpToken(user, currentMfa);
          await Auth.setPreferredMFA(user, 'TOTP'); // Set TOTP as preferred MFA method
        } else {
          await Auth.confirmSignIn(user, currentMfa, 'SOFTWARE_TOKEN_MFA');
        }
        onLoginSuccess();
      } else {
        console.log('User is not defined or not authenticated');
        setErrorMessage('User not authenticated. Please login again.');
      }
    } catch (error) {
      console.error('Error confirming MFA code:', error);
      setErrorMessage(error.message || 'An error occurred while confirming MFA code');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>UniRent</Text>
      {!isConfirming && !isMFARequired && !isSettingUpMFA ? (
        <>
          <Text style={styles.subText}>Find your student accommodation easily!</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#e1b5ff"
            value={username}
            onChangeText={setUsername}
          />
          {isSignUp && (
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#e1b5ff"
              value={email}
              onChangeText={setEmail}
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#e1b5ff"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
          <TouchableOpacity style={styles.button} onPress={handleAuth}>
            <Text style={styles.buttonText}>{isSignUp ? "Sign Up" : "Login"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={signInWithGoogle}>
            <Text style={styles.buttonText}>Login as University Partner</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {setIsSignUp(!isSignUp); setErrorMessage("");}}
          >
            <Text style={styles.toggleText}>
              {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
            </Text>
          </TouchableOpacity>
        </>
      ) : isConfirming ? (
        <>
          <Text style={styles.subText}>Sign up successful! Please enter the confirmation code sent to your email.</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirmation Code"
            placeholderTextColor="#e1b5ff"
            value={confirmationCode}
            onChangeText={setConfirmationCode}
          />
          {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
          <TouchableOpacity style={styles.button} onPress={handleConfirmCode}>
            <Text style={styles.buttonText}>Submit Code</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setIsConfirming(false)}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </>
      ) : isSettingUpMFA ? (
        <>
        <Text style={styles.subText}>Scan the QR code with your authenticator app:</Text>
        <View style={{ marginBottom: 20 }}>
          {mfaSetup ? (
            <QRCode
              value={mfaSetup} // TOTP secret key
              size={200}
              color='purple'
              backgroundColor='white'
            />
          ) : null}
        </View>
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={() => {
          Auth.signOut({ global: true });
          setIsSettingUpMFA(false);
          setIsMFARequired(false);
          setIsConfirming(false);
          }}>
          <Text style={styles.buttonText}>I am done!</Text>
        </TouchableOpacity>
      </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter MFA Code"
            placeholderTextColor="#e1b5ff"
            value={mfaCode}
            onChangeText={setMfaCode}
          />
          {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
          <TouchableOpacity style={styles.button} onPress={handleMFA}>
            <Text style={styles.buttonText}>Submit MFA Code</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {setIsMFARequired(false); setErrorMessage("");}}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f7ebff",
  },
  input: {
    width: Platform.OS === "web" ? width * 0.3 : width * 0.8,
    borderBottomColor: "purple",
    borderBottomWidth: 1,
    marginBottom: 20,
    fontSize: 17,
    padding: 10,
    ...Platform.select({
      web: {
        outlineStyle: "none",
      },
    }),
  },
  title: {
    fontSize: 36,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "purple",
  },
  subText: {
    fontSize: 16,
    color: "#4e0085",
    marginBottom: 20,
    textAlign: "center",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    width: Platform.OS === "web" ? width * 0.3 : width * 0.8,
    backgroundColor: "#640064",
    padding: 15,
    borderRadius: 15,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  toggleText: {
    color: "#4e0085",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default LoginScreen;
