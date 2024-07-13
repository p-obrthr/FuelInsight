const fuelstation={template: `<h1>Fuelstation Prices</h1>

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
    <tr v-for="fs in fuelstations">
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
        fuelstations:[],
    }
},
methods:
{
    refreshData()
    {
        axios.get(variables.API_URL + "fuelstations")
        .then((response)=>
        {
            this.fuelstations=response.data;
        });
    }
},
mounted:function()
{
    this.refreshData(); 
}

}
