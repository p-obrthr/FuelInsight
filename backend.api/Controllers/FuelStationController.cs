using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Logging;
using System.Text.Json.Serialization;

namespace backend.api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FuelStationController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<FuelStationController> _logger;
        private readonly string _apiKey;
        private readonly string _lat;
        private readonly string _lng;

        public FuelStationController(HttpClient httpClient, ILogger<FuelStationController> logger, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _logger = logger;

            // Key für den Zugriff auf die freie Tankerkönig-Spritpreis-API
            // Für eigenen Key bitte hier https://creativecommons.tankerkoenig.de
            // registrieren.
            _apiKey = configuration["apiKey"];
            _lat = configuration["lat"];
            _lng = configuration["lng"];
        }

        [HttpGet(Name = "GetFuelStations")]
        public async Task<IEnumerable<FuelStation>> Get()
        {
            var apiUrl = $"https://creativecommons.tankerkoenig.de/json/list.php?lat={_lat}&lng={_lng}&rad=6&sort=price&type=e5&apikey={_apiKey}";
            var response = await _httpClient.GetAsync(apiUrl);

            if (!response.IsSuccessStatusCode)
                return Enumerable.Empty<FuelStation>();
            
            
            var jsonResponse = await response.Content.ReadAsStringAsync();
            _logger.LogInformation("API Response: {jsonResponse}", jsonResponse);

            var fuelData = JsonSerializer.Deserialize<FuelData>(jsonResponse);
            if (fuelData == null || fuelData.Stations == null)
                return Enumerable.Empty<FuelStation>();

            return fuelData.Stations.Select(station => new FuelStation
            {
                Name = station.Name,
                Price = station.Price
            });
            
        }
    }

    public class FuelData
    {
        [JsonPropertyName("stations")]
        public List<FuelStation> Stations { get; set; }
    }

    public class FuelStation
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("price")]
        public decimal Price { get; set; }
    }
}
