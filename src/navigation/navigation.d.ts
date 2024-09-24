type LoginStatus =
  | 'unknown'
  | 'registered'
  | 'authenticated'
  | 'noSubscription'
  | 'noAccount'
  | 'components'
  | 'pairing';

type AuthAction = 'registered' | 'reset' | 'wakeUp' | 'paired' | 'login';

type Routes =
  | 'Welcome'
  | 'Home'
  | 'Login'
  | 'Signup'
  | 'Splash'
  | 'Game'
  | 'Vo2'
  | 'Profile'
  | 'EditProfile'
  | 'BluetoothPairing'
  | 'PlanInfo'
  | 'BasicInfo'
  | 'AccountCreated'
  | 'ProfileView'
  | 'AccountError'
  | 'SelectRide'
  | 'BlePermissions'
  | 'Dashboard'
  | 'InternetConnection'
  | 'Webview'
  | 'SettingsStack'
  | 'Settings'
  | 'AccountSettings'
  | 'UpdatePassword'
  | 'UpdateEmail'
  | 'HeartRate'
  | 'Distance'
  | 'Sleep'
  | 'Lactate'
  | 'Calories'
  | 'TrainingPlan'
  | 'StepCount'
  | 'VoicePage'
  | 'Multimedia'
  | 'DashboardTab'
  | 'HomeTab'
  | 'MultimediaTab'
  | 'PdfViewer'
  | 'VideoViewer'
  | 'GifViewer'
  | 'RecentItems'
  | 'TrainingPlan'
  | 'ReportPage'
  | 'StatisticsPage'
  | 'WellbeingPage'
  | 'NutritionPage'
  | 'RecoveryPage'
  | 'EndurancePage'
  | 'StrengthPage'
  | 'ThreadsTab'
  | 'Threads'
  | 'WebViewScreen'
  | 'Notifications'
  | 'NotificationsTab'
  | 'ResponsePage'
  | 'OnboardingPage'
  | 'NetworkPage'
  | 'PostDetail'
  | 'ProfilePage';

type NavigatorParameters = {
  Welcome: undefined;
  Home: undefined;
  Login: undefined;
  Components: undefined;
  Splash: undefined;
  ProfileView: undefined;
  PlanInfo: undefined;
  BluetoothPairing: undefined;
  BasicInfo: undefined;
  AccountCreated: undefined;
  BlePermissions: undefined;
  EditProfile: undefined;
  SelectRide: undefined;
  RideHistory: undefined;
  MainRideHistory: undefined;
  InternetConnection: undefined;
  Webview: {uri: string; title?: string};
  SettingsStack: undefined;
  Settings: undefined;
  AccountSettings: undefined;
  UpdatePassword: undefined;
  UpdateEmail: undefined;
  Signup: undefined;
  Dashboard: undefined;
  Vo2: undefined;
  HeartRate: undefined;
  Distance: undefined;
  Sleep: undefined;
  Lactate: undefined;
  StepCount: undefined;
  Calories: undefined;
  TrainingPlan: undefined;
  VoicePage: undefined;
  Multimedia: undefined;
  DashboardTab: undefined;
  HomeTab: undefined;
  MultimediaTab: undefined;
  RecentItems: undefined;
  PdfViewer: {uri: string; title?: string};
  VideoViewer: {uri: string; title?: string};
  GifViewer: {uri: string; title?: string};
  ReportPage: undefined;
  StatisticsPage: undefined;
  WellbeingPage: undefined;
  NutritionPage: undefined;
  RecoveryPage: undefined;
  EndurancePage: undefined;
  StrengthPage: undefined;
  ThreadsTab: undefined;
  Threads: undefined;
  WebViewScreen: {sourceUrl: string; title?: string};
  Notifications: undefined;
  NotificationsTab: undefined;
  ResponsePage: undefined;
  OnboardingPage: undefined;
  NetworkPage: undefined;
  PostDetail: {postId: string};
  ProfilePage: {userId: string};
};
