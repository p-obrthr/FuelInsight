const app = Vue.createApp({
    data() {
        return {
            
        }
    }
});

const routes = [
    {path: '/home', component:home},
    {path: '/fuelprices', component:allFuelData},
    {path: '/fuelstations/:id', component:fuelstation}
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
})

app.component('navbar', navbar);
app.use(router)
app.mount('#app')