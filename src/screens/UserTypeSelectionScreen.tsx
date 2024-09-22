import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, RadioButton, Button } from 'react-native-paper';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { updateUser } from '../graphql/mutations';
import { ModelUserConditionInput } from '../graphql/API';
import { useNavigation } from '@react-navigation/native';

export default function UserTypeSelectionScreen(props: any) {
  const navigation = useNavigation();
  const [userType, setUserType] = useState(''); // Store user type selection

  console.log('props');
  console.log(props);

  const handleUpdateUserType = async () => {
    if (!userType) {
      console.error('User type not selected');
      return;
    }

    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, {
        'custom:userType': userType, // Update userType attribute
      });

      const input = {
        id: user.attributes.sub,
        userType: userType
      }
      

      await API.graphql(graphqlOperation(updateUser, { input: input }))
      console.log('User type updated successfully');
      navigation.navigate("HomeTab");
      // You can navigate to a different screen here if needed
    } catch (error) {
      console.error('Error updating user type: ', error);
    }
  };

  useEffect(() => {

  })

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={[styles.titleText, { color: 'black' }]}>
        Select User Type
      </Text>

      <RadioButton.Group
        onValueChange={newValue => setUserType(newValue)}
        value={userType}
      >
        <View style={styles.radioButtonContainer}>
          {/* Normal User with Icon */}
          <View style={styles.radioItem}>
            <View style={styles.iconTextContainer}>
              <MaterialCommunityIcons name="account" size={25} style={styles.icon} />
              <Text style={styles.radioLabel}>Normal User</Text>
            </View>
            <RadioButton value="normalUser" status={userType === 'normalUser' ? 'checked' : 'unchecked'} onPress={() => setUserType('normalUser')} />
          </View>

          {/* University Partner with Icon */}
          <View style={styles.radioItem}>
            <View style={styles.iconTextContainer}>
              <MaterialCommunityIcons name="school" size={25} style={styles.icon} />
              <Text style={styles.radioLabel}>University Partner</Text>
            </View>
            <RadioButton value="universityPartner" status={userType === 'universityPartner' ? 'checked' : 'unchecked'} onPress={() => setUserType('universityPartner')} />
          </View>
        </View>
      </RadioButton.Group>

      <Button
        mode="contained"
        onPress={handleUpdateUserType}
        style={styles.button}
      >
        Confirm
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f4f4f4',
  },
  titleText: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  radioButtonContainer: {
    marginBottom: 20,
  },
  radioItem: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 15, 
  },
  iconTextContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  icon: {
    marginRight: 10, 
  },
  radioLabel: {
    fontSize: 16, 
    color: 'black', 
  },
  button: {
    marginTop: 20,
    width: '100%',
  },
});
