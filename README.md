# Jobhunt - ReactNativeApplication
Jobhunt is a cross-platform mobile application built with React Native and Expo that simplifies the job search process. It integrates with Firebase for secure authentication and data storage, Firestore for efficient data management, the Rapid API JSearch API for dynamic job searching, and Expo Router for navigation. The app also provides users with essential features like CRUD operations, user profile customization, and the ability to save and share favorite job listings.

</br>
<p align="center">
   <img
     src="https://github.com/TharunVirupakshi/JobHunt-ReactNativeApp/assets/118896616/bade9fc6-b5c2-494b-8d30-5fcb47135705"
     alt="Alt text"
     title="Optional title"
     width="250px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <img
     src="https://github.com/TharunVirupakshi/JobHunt-ReactNativeApp/assets/118896616/d3cb0c74-1217-4dab-a0f9-7aeb2bdd0742"
     alt="Alt text"
     title="Optional title"
     width="250px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <img
     src="https://github.com/TharunVirupakshi/JobHunt-ReactNativeApp/assets/118896616/34618623-8b37-400c-b26e-4d8d017b8729"
     alt="Alt text"
     title="Optional title"
     width="250px">
</p></br>
<p align="center">
   <img
     src="https://github.com/TharunVirupakshi/JobHunt-ReactNativeApp/assets/118896616/a29e6197-3551-4fee-a28f-de709abf06c9"
     alt="Alt text"
     title="Optional title"
     width="250px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <img
   src="https://github.com/TharunVirupakshi/JobHunt-ReactNativeApp/assets/118896616/28ae3bc1-f4a2-463c-a580-54380ea660b8"
   alt="Alt text"
   title="Optional title"
   width="250px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <img
     src="https://github.com/TharunVirupakshi/JobHunt-ReactNativeApp/assets/118896616/b6285705-7f1f-4d11-b7ad-b3f85738e17a"
     alt="Alt text"
     title="Optional title"
     width="250px">
</p>
</br>

## Table of Contents
- [Demo](#demo)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Technologies Used](#technologies-used)


## Demo
[Expo Link](https://expo.dev/@tharunvirupakshi/Jobhunt?serviceType=classic&distribution=expo-go) (Requires Expo Client App)

[APK](https://drive.google.com/file/d/1k2TnEzRMyaW98yLJ6k47HcaHJ-5kXnkp/view?usp=sharing)

## Getting started
Follow these instructions to get the Jobhunt app up and running on your local machine.

### Prerequisites 
- Node.js and npm installed.
- Expo CLI (you can install it globally with `npm install -g expo-cli`). Refer [Expo Docs](https://docs.expo.dev/) for more info.

### Installation
1. Clone the repo to your local machine:
```
git clone https://github.com/TharunVirupakshi/JobHunt-ReactNativeApp.git
```
2. Navigate to the project directory:
```
cd JobHunt-ReactNativeApp
```
3. Install project dependencies 
```
npm install
```
4. Create a `Firebase` project and configure the Firebase credentials in your project. You can follow the [Firebase documentation](https://firebase.google.com/docs/web/setup) for this step. The credentials have to be updated in the [firebase.js](./firebase.js) file `OR` (_Recommended_) You can use [Direnv](https://direnv.net/) to safely store your credentials as `ENV VARIABLES`.
```bash
export FIREBASE_API_KEY=your_firebase_api_key
export FIREBASE_APP_ID=your_firebase_app_id
```
Direnv will automatically load and unload these variables.

5. [Rapid API](https://rapidapi.com) account and obtain an API key for the [JSearch API](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch). Update the API key in the following files.
   + [Search](./app/search/[id].js)
   + [useFetch.js](./hook/useFetch.js)
   + [useFetchMultiple.js](./hook/useFetchMultiple.js)
  
`OR`
(_Recommended_) You can use [Direnv](https://direnv.net/) to safely store your credentials as `ENV VARIABLES`.
```bash
export RAPID_API_KEY=your_api_key
```
6. Start the development server.
```bash
npm start
```
7. Scan the QR code with the `Expo Go` app on your mobile device or use an emulator to run the app.

## Technologies Used
- React Native
- Expo
- Firebase
- Firestore
- Expo Router



