const app = Vue.createApp({
    data() {
        return {
            
        }
    }
});

const routes = [
    {path: '/home', component:home},
    {path: '/fuelstations', component:allFuelstations},
    {path: '/fuelstation/:id', component:fuelstation}
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
})

app.component('navbar', navbar);
app.use(router)
app.mount('#app')