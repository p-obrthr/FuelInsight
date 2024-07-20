import Api from '@/services/Api'

export default {
    register (credentials: any) {
        return Api().post('auth/register', credentials)
    }
}

// AuthenticationService.register({
//     email: 'testemail@web.de',
//     password: '1234'
// }