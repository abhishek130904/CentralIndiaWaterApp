import React from 'react';

// 1. Import navigation components
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 2. Import your screens
import HomeScreen from './screens/homeScreen';
import ExploreWaterScreen from './screens/ExploreWaterScreen'; // The new screen

// 3. Create the "Stack" (the deck of cards)
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // 4. Wrap your entire app in the NavigationContainer
    <NavigationContainer>
      {/* 5. Set up the stack of screens */}
      <Stack.Navigator>
        {/* The first screen listed is the "home" screen */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} // Hide the default header
        />
        
        {/* The new screen we can navigate to */}
        <Stack.Screen 
          name="ExploreWater" // This name MUST match what you use in navigation.navigate()
          component={ExploreWaterScreen}
          options={{ headerShown: false }} // Hide default header, since we made a custom one
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

