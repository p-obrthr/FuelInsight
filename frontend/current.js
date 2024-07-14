const currentData={template: `<h1>Current Prices</h1>

    <div>
    
    <table class="table table-striped">
    <thead>
        <tr>
            <th>
                Name
            </th>
            <th>
                Price
            </th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="fs in fuelData">
            <td>{{fs.name}}</td>
            <td>{{fs.price}}</td>
        </tr>
    </tbody>
    </table>
    
    
    
    </div>
    `,
    
    data()
    {
        return{
            fuelData:[],
        }
    },
    methods:
    {
        refreshData()
        {
            axios.get(variables.API_URL + "tanker/fetch")
            .then((response)=>
            {
                this.fuelData=response.data;
            });
        }
    },
    mounted:function()
    {
        this.refreshData(); 
    }
    
    }
    