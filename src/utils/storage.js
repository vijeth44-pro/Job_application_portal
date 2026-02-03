// LocalStorage utility functions
export const storage = {
  getJobs: () => {
    const jobs = localStorage.getItem('jobs');
    return jobs ? JSON.parse(jobs) : null;
  },
  
  setJobs: (jobs) => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  },
  
  getUsers: () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : null;
  },
  
  setUsers: (users) => {
    localStorage.setItem('users', JSON.stringify(users));
  },
  
  getApplications: () => {
    const apps = localStorage.getItem('applications');
    return apps ? JSON.parse(apps) : null;
  },
  
  setApplications: (apps) => {
    localStorage.setItem('applications', JSON.stringify(apps));
  },
  
  getCurrentUser: () => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  },
  
  setCurrentUser: (user) => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }
};
