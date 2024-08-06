This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.


# Athlea-app
This app will provide the front end implementation of the Athlea project where users can interact with their team of AI coaches, view their stats, training plan, reports and network. 

## Athlea - App (Typescript / React Native)

## Prerequisites
- MacBook Pro
- iOS device
- [Node.js > 16.0.0](https://nodejs.org)
- [yarn - classic stable 1.22.19](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
- [Watchman](https://facebook.github.io/watchman)
- [Xcode 13.4.1](https://developer.apple.com/xcode)
- [Cocoapods 1.10.1](https://cocoapods.org)
- [JDK > 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- Open SSL 1.1
- Ruby > 2.6.10 *NOTE*[RVM](https://rvm.io/rvm/install) recommend. if you have trouble with rvm please [see](https://github.com/rvm/rvm/issues/5047#issuecomment-1466470077) 
- [Android Studio and Android SDK](https://developer.android.com/studio) *NOTE* Android SDK version 33 require you can install it by Android Studio

## Setting up the development environment

1. Cloning a repository by https:// in a terminal or a Git GUI.

```
git clone https://github.com/Athlea-ai/athlea-app.git
```

2. Open root directory of project in terminal that is `athlea-app`. Uses `yarn` command to install all libraries list is `package.json`.

```
yarn
```

3. Go to `ios/` directory to update your local Pods in order for the all library Pods to be installed in your local project.

```
pod install
```

### Recommended using XCode to run application

1. Open XCode
2. Click `Open a project or file` on main menu
3. Go to `muoverti-app/ios/` folder 
4. Select `muoverti.xcworkspace`

![xcworkspace in XCode](src/assets/images/documentations/xcode/xcworkspace.png)


5. Select project's target that name is `muoverti` in XCode. it is 
second menu tab of list.

![Target in XCode](src/assets/images/documentations/xcode/target.png)

6. After, select xcode workspace and target. You have to select team development on `Signing & Capabilities` tab.

### Running app on device

1. Connects USB device to virtual machine
2. Selects your iOS name device
3. Clicks running button (Play icon) on build control menu.
Xcode builds successfully, you can start debugging and testing.

### Running app on a simulator

#### For iOS

```
yarn ios
```

#### For Android

```
yarn android
```


##### Tutorial by react native [(link)](https://reactnative.dev/docs/running-on-simulator-ios)

## Solving issues with Xcode, Pods, and Node Modules

As we worked together, our teammates add new libraries. You can use the command to resolve it.
This command will reinstall all `node_moduled` and `pods`. Make sure to clean build folder after running this command.

```
yarn clear-cache
```
## For people who already have the project since last 2022

Since we've removed a lot of library from the project you must run this command down below before start the project.
```
yarn react-native clean-project-auto
```
## Base dependencies 

- [axios](https://github.com/axios/axios) for networking.
- [@react-native-firebase/app](https://rnfirebase.io/) for authentication.
- [react-navigation](https://reactnavigation.org/) navigation library.
- [Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started) for state management.
- [jest](https://facebook.github.io/jest/) and [react-native-testing-library](https://callstack.github.io/react-native-testing-library/) for testing.
- [styled-components](https://styled-components.com/docs/basics#react-native) for styled components react.
- [App Center](https://learn.microsoft.com/en-us/appcenter/sdk/getting-started/react-native) to distribute application to store.
- [Formik](https://formik.org/docs/guides/react-native) is form helpers fo getting, validation, and handling values.
- [rxjs](https://www.npmjs.com/package/rxjs) for data steaming and data observations.
- [@gorhom/bottom-sheet] (https://ui.gorhom.dev/components/bottom-sheet) for bottom sheet integration.




## Folder structure
This project uses Vertical Slice Architecture structure:

- `android/`: 
- `ios/`:
- `app/`: This folder is the main container of all the code inside Athlea application.
  - `api/`: store all API services and middleware to configure API request and handle API errors.
    - `services/`: store all API services
  - `assets/`: Asset folder to store all images, gits, fonts, icons, etc.
    - `fonts/`: Folder to store font family, Athlea app uses `resolve sans font`. It depends on designer who designed typography system. 
    - `gifs/`: Folder to store map gif files.
    - `icons/`: Folder to store font icons. MUOV app generates SVG file to font icon by [fontello.com](https://fontello.com/). 
    - `images/`:
  - `components/`: Folder to store any common component that you use through in the app. There should not be any business logic within this folder.
  - `contexts/`:
  - `features/`: Folder to collect the screens categories by main features.
    - `features's name folder`
        - `...Presenter.tsx`: calling store, managing state, validating values, and handling logic for each page.
        - `...View.tsx`: Import and render UI component and and 
        - `....style.tsx`: The specific style for each page.
  - `hooks/`:
  - `infrastructure/`:
    - `constants/`: Folder to store any kind of constant information or mock data that you have.
    - `navigation/`: Navigator collection of applications.
    - `utils/`: A place where you can place small snippets you can use throughout the application.
  - `model/`: Folder to store types of interfaces
  - `store/`: Folder to put all store middlewares and the store.
  - `theme/`: store all the styling concerns related to the application theme.
- `src/`: store firebases configuration files, separate by environment name.
    - `qa/`
    - `prod/`
- `appcenter-post-clone.sh`: Build scripts allow you to customize your builds that map associating builds with env files is already defined in root of folder/src/..  [(How to manage App Center build script)](https://learn.microsoft.com/en-us/appcenter/build/custom/scripts/)
- `App.js`: Main component that starts whole app.
- `index.js`: Entry point of application as per React-Native standards.

## How to manage static resources (Assets folder)

To keep an application scalable and organized, the global static resources that are used in the application have to be created in a specific file.


### Icon Fonts

The Advantages of Icon Fonts that are scalability and change color easily. It looks great on any screen resolution or display.
There are a few tricky steps the first time. We must use SVG image file to convert icon image to icon fonts, therefore Front-end developer have to discuss with designer about line stroke format.

Often we encounter problems when exports SVG images from Figma so we should to ask designer upload SVG files to Google drive instead.

#### How to checks SVG image

Make sure the icon is working, Testing by drag and drop the SVG image to [https://glyphter.com/](https://glyphter.com/).
If image looks great like the design, we can use it. This solution will help to save our time before generating and integration to source code.

We use [fontello](https://fontello.com/) to generate icon fonts.

## Athleas's Design
Athlea's application design on [Athlea's figma](https://www.figma.com/file/51mc5qSqbyY1w9wrPq9c2R/Muoverti-Companion-App?node-id=0%3A1)


## Who to contact if you're stuck
- michael@athlea.ai
