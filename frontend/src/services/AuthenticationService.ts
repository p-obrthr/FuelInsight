import Api from './Api'

export default {
    register (credentials: any) {
        return Api().post('auth/register', credentials)
    },
    isLoggedIn() {
        const token = localStorage.getItem('token');
        return !!token;
    },
    getToken() { 
        return localStorage.getItem('token');
    },
    login(credentials: any) {
        return Api().post('auth/login', credentials).then(response => {
          localStorage.setItem('token', response.data.token);
          return response;
        });
      },
    logout() {
        localStorage.removeItem('token');
    }
}