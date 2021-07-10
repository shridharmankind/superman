/** docs
 * https://reactnavigation.org/blog/2020/05/16/web-support/
 * https://reactnavigation.org/docs/configuring-links/#playground
 * */
const origin = (window && window.location && window.location.origin) || '';
const prefixes = [origin, 'com.superman://'];

const linking = {
  prefixes,
  config: {
    screens: {
      Login: 'login',
      Auth: 'auth',
      MasterDataDownload: 'master-data-download',
      Dashboard: {
        path: '',
        screens: {
          Home: {
            path: 'home',
            screens: {
              HomeLanding: 'landing',
            },
          },
          TourPlan: 'tour-plan',
          Performance: {
            path: 'performance',
            screens: {
              PerformanceLanding: 'landing',
            },
          },
          Directory: {
            path: 'directory',
            screens: {
              DirectoryLanding: 'landing',
              DoctorProfile: 'profile',
              EDetailing: 'e-detailing',
            },
          },
          GSP: {
            path: 'gsp',
            screens: {
              PerformanceLanding: 'landing',
            },
          },
          Admin: {
            path: 'admin',
            screens: {
              PerformanceLanding: 'landing',
            },
          },
          Content: {
            path: 'content',
            screens: {
              PerformanceLanding: 'landing',
            },
          },
          Learn: {
            path: 'learn',
            screens: {
              PerformanceLanding: 'landing',
            },
          },
          Settings: {
            path: 'settings',
            screens: {
              PerformanceLanding: 'landing',
            },
          },
        },
      },
      StandardPlan: 'standard-plan',
      MtpPlanPerDay: 'mtp-plan-per-day',
      DoctorFeedback: 'doctor-feedback',
    },
  },
};

export default linking;
