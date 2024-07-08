const app = Vue.createApp({
    data() {
        return {
            
        }
    }
});

const routes = [
    {path: '/home', component:home},
    {path: '/fuelstation', component:fuelstation}
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
})

app.use(router)
app.mount('#app')