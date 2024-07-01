using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Text.Json.Serialization; 

public class FuelData
{
    [JsonPropertyName("stations")]
    public List<FuelStation> Stations { get; set; }
}