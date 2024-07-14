const navbar = {
  template: `
      <nav class="navbar navbar-expand-sm bg-light navbar-dark">
          <ul class="navbar-nav">
              <li v-for="link in navLinks" :key="link.path" class="nav-item m-1">
                  <router-link class="btn btn-light btn-outline-primary" :to="link.path">{{ link.label }}</router-link>
              </li>
          </ul>
      </nav>
  `,
  data() {
      return {
          navLinks: [
              { label: 'Home', path: '/home' },
              { label: 'All', path: '/fuelprices' }
          ],
      };
  },
  methods: {
      fetchFuelStationNames() {
          axios.get(variables.API_URL + "fuelstations/all")
              .then(response => {
                console.log("API response:", response.data);
                  const fuelStationLinks = response.data.map(fs => ({
                      label: fs.name,
                      path: `/fuelstations/${fs.id}`
                  }));
                  this.navLinks = [...this.navLinks, ...fuelStationLinks];
              })
              .catch(error => {
                  console.error("Error fetching fuel station names:", error);
              });
      }
  },
  mounted() {
      this.fetchFuelStationNames();
  }
};

