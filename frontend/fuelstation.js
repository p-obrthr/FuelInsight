const fuelstation={template: `<h1>Prices of {{ data.name }}</h1>

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
        <tr v-if="data">
            <td>{{ data.price }}</td>
            <td>{{ data.created }}</td>
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
            axios.get(`${variables.API_URL}fuelstations/${id}`)
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
    