import './App.css';

import { app } from '@microsoft/teams-js';
import React, { ReactElement } from 'react';

import AppAPIs from './components/AppAPIs';
import AppInitializationAPIs from './components/AppInitialization';
import AuthenticationAPIs from './components/AuthenticationAPIs';
import CalendarAPIs from './components/CalendarAPIs';
import CallAPIs from './components/CallAPIs';
import ConfigAPIs from './components/ConfigAPIs';
import DialogAPIs from './components/DialogAPIs';
import LocationAPIs from './components/LocationAPIs';
import LogAPIs from './components/LogsAPIs';
import MailAPIs from './components/MailAPIs';
import MediaAPIs from './components/MediaAPIs';
import MeetingAPIs from './components/MeetingAPIs';
import NavigationAPIs from './components/NavigationAPIs';
import PeopleAPIs from './components/PeopleAPIs';
import ChatAPIs from './components/privateApis/ChatAPIs';
import FilesAPIs from './components/privateApis/FilesAPIs';
import FullTrustAPIs from './components/privateApis/FullTrustAPIs';
import MonetizationAPIs from './components/privateApis/MonetizationAPIs';
import NotificationAPIs from './components/privateApis/NotificationAPIs';
import PrivateAPIs from './components/privateApis/PrivateAPIs';
import TeamsAPIs from './components/privateApis/TeamsAPIs';
import RemoteCameraAPIs from './components/RemoteCameraAPIs';
import SharingAPIs from './components/SharingAPIs';
import TeamsCoreAPIs from './components/TeamsCoreAPIs';

const urlParams = new URLSearchParams(window.location.search);

// This is added for custom initialization when app can be initialized based upon a trigger/click.
if (!urlParams.has('customInit') || !urlParams.get('customInit')) {
  app.initialize();
}

// for AppInitialization tests we need a way to stop the Test App from sending these
// we do it by adding appInitializationTest=true to query string
if (
  (urlParams.has('customInit') && urlParams.get('customInit')) ||
  (urlParams.has('appInitializationTest') && urlParams.get('appInitializationTest'))
) {
  console.info('Not calling appInitialization because part of App Initialization Test run');
} else {
  app.notifyAppLoaded();
  app.notifySuccess();
}

export const noHubSdkMsg = ' was called, but there was no response from the Hub SDK.';

/**
 * Generates and returns an error message explaining that a string input was expected
 * to be parsed into a JSON object but there was a parsing error.
 * If there is an example JSON object provided, it gives the keys needed in a
 * correctly formatted JSON object parameter of the desired function. If possible,
 * it is recommended to provide this example to this function.
 *
 * @param [example] Example object of the type to generate the error message about.
 * @returns A message to the user to fix their input. Provides an example if there is any.
 */
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export const generateJsonParseErrorMsg = (example?: Record<string, any>): string => {
  if (example) {
    return `Please JSON format your input. Your input should contain at least ${Object.keys(
      example,
    )}. For example, ${JSON.stringify(example)}`;
  } else {
    return 'Please JSON format your input. If you\'ve ensured your input is JSON formatted but are still getting this message, please also ensure that your input contains all necessary keys, etc.';
  }
};

/**
 * Generates and returns a message for confirming registration attempt of a handler, callback, etc.
 * Takes in the trigger condition for the handler to provide in the message to the user.
 *
 * @param changeCause the trigger condition for the handler to fire.
 * @returns A message to user to show confirmation of handler registration attempt.
 */
export const generateRegistrationMsg = (changeCause: string): string => {
  return `Registration attempt has been initiated. If successful, this message will change when ${changeCause}.`;
};

const App = (): ReactElement => {
  return (
    <>
      <AppAPIs />
      <AppInitializationAPIs />
      <AuthenticationAPIs />
      <CalendarAPIs />
      <CallAPIs />
      <ChatAPIs />
      <ConfigAPIs />
      <DialogAPIs />
      <FilesAPIs />
      <FullTrustAPIs />
      <LocationAPIs />
      <LogAPIs />
      <MailAPIs />
      <MediaAPIs />
      <MeetingAPIs />
      <MonetizationAPIs />
      <NavigationAPIs />
      <NotificationAPIs />
      <PeopleAPIs />
      <PrivateAPIs />
      <RemoteCameraAPIs />
      <SharingAPIs />
      <TeamsCoreAPIs />
      <TeamsAPIs />
    </>
  );
};

export default App;
