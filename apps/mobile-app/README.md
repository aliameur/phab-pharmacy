<h1 align="center">
<img width="64" src="../../assets/logo.svg" alt="Phab Pharmacy"/>
<br>
Phab Pharmacy
</h1>

<h3 align="center">Guide to the React Native App</h3>

This section contains the source code for the following projects:

- [mobile-app](https://github.com/aliameur/phab-pharmacy/tree/main/apps/mobile-app)

# Demo
[Click here to watch the video](https://phab-server1.s3.eu-north-1.amazonaws.com/RPReplay_Final1705303068.MP4)

## Getting Started

### Requirements

- [Yarn](https://yarnpkg.com) (3.6.4)
- Xcode (for iOS development)
- Android Studio (for Android development)

Follow the relevant links for installation instructions. You can verify that these are installed correctly by running the following commands:

```bash
$ node -v # v20.8.1

$ docker -v # Docker version 24.0.6, build ed223bc

$ yarn -v # 3.6.4
```

We recommend installing the NX CLI globally. This is not required, but it will make it easier to run commands. (if you don't install preface all nx commands with `yarn`)

### Set up the requirements

2. Install the dependencies:
```bash
$ cd phab-pharmacy
$ yarn
```

### Start the backend required for use

```bash
$ nx serve backend 
```
The backend should be running at http://localhost:9000  

### Start the LLM backend (note the mobile-app will point to the heroku depolyed version)

```bash
$ nx build assistant-api
$ nx serve assistant-api
```

### Start the mobile-app

```bash
$ nx run-ios mobile-app # for ios
$ nx run-android mobile-app # for android 
```

## Structure 

### App (Main Config)
- [App](https://github.com/aliameur/phab-pharmacy/tree/main/apps/mobile-app/src/app/App.tsx)

### Screens
- [CartScreen](https://github.com/aliameur/phab-pharmacy/tree/main/apps/mobile-app/src/app/screens/CartScreen.js)
- [ChatScreen](https://github.com/aliameur/phab-pharmacy/tree/main/apps/mobile-app/src/app/screens/ChatScreen.js)
- [CheckoutScreen](https://github.com/aliameur/phab-pharmacy/tree/main/apps/mobile-app/src/app/screens/CheckoutScreen.js)
- [LoginScreen](https://github.com/aliameur/phab-pharmacy/tree/main/apps/mobile-app/src/app/screens/CheckoutScreen.js)
- [PaymentSuccessScreen](https://github.com/aliameur/phab-pharmacy/tree/main/apps/mobile-app/src/app/screens/PaymentSuccessScreen.js)
- [ProductScreen](https://github.com/aliameur/phab-pharmacy/tree/main/apps/mobile-app/src/app/screens/ProductScreen.js)
- [SearchScreen](https://github.com/aliameur/phab-pharmacy/tree/main/apps/mobile-app/src/app/screens/SearchScreen.js)
- [ShopScreen](https://github.com/aliameur/phab-pharmacy/tree/main/apps/mobile-app/src/app/screens/ShopScreen.js)
- [SignUpScreen](https://github.com/aliameur/phab-pharmacy/tree/main/apps/mobile-app/src/app/screens/SignUpScreen.js)
- [UserCheckScreen](https://github.com/aliameur/phab-pharmacy/tree/main/apps/mobile-app/src/app/screens/UserCheckScreen.js)

### Scripts
- [AuthScript](https://github.com/aliameur/phab-pharmacy/tree/main/apps/mobile-app/src/app/scripts/AuthScript.js)
- [CartScripts](https://github.com/aliameur/phab-pharmacy/tree/main/apps/mobile-app/src/app/scripts/CartScript.js)
- [PaymentsScripts](https://github.com/aliameur/phab-pharmacy/tree/main/apps/mobile-app/src/app/scripts/PaymentsScript.js)
- [ShopScripts](https://github.com/aliameur/phab-pharmacy/tree/main/apps/mobile-app/src/app/scripts/ShopScript.js)

### Context
- [ShopContext](https://github.com/aliameur/phab-pharmacy/tree/main/apps/mobile-app/src/app/context/ShopContext.js)