const fuelstation={template: `<h1>Prices</h1>

    <div>
    
    <table class="table table-striped">
    <thead>
        <tr>
            <th>
                Price
            </th>
            <th>
                Time
            </th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="item in data">
            <td>{{ item.price }}</td>
            <td>{{ item.created }}</td>
        </tr>
    </tbody>
    </table>
    
    
    
    </div>
    `,
    
    data()
    {
        return{
            data:[],
        }
    },
    methods:
    {
        refreshData()
        {
            const id = this.$route.params.id;
            axios.get(`${variables.API_URL}fuelprices/${id}`)
            .then((response)=>
            {
                this.data=response.data;
            });
        }
    },
    mounted:function()
    {
        this.refreshData(); 
    },
    watch: {
        '$route.params.id': 'refreshData'
    }
    
}
    