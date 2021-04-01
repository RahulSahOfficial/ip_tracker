var ip = "8.8.8.8";
var api_key = "at_maJoxNofrrtBWmntIJmxI7xS96mbU";
var lat=37.38605;
var long=-122.08385;
var mymap = L.map('mapid').setView([lat,long], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoidGVjaG5pY2Fsa25vd2xlZGdlY2VudGVyIiwiYSI6ImNrbXlzdjF4ZzA3NWkydnI0OGt6NTVqbGgifQ.Xyc9MSkPyAlx_dob7roRRQ'
}).addTo(mymap);
var marker = L.marker([lat,long]).addTo(mymap);
marker.bindPopup("<b>Device Found!</b><br>Its the IP current location.").openPopup();

const search_button=document.getElementById("search_ip")
search_button.addEventListener("click",search_ip)
function search_ip()
{
    ip=document.querySelector("#user_ip").value
    $(function () {
       $.ajax({
           url: "https://geo.ipify.org/api/v1",
           data: {apiKey: api_key, ipAddress: ip},
           success: function(data) {
               showresult(data)
           }
       });
    });
}
function showresult(data)
{
    res_ip=data.ip
    res_city=data.location.city
    res_region=data.location.region
    res_code=data.location.postalCode
    res_lat=data.location.lat
    res_long=data.location.lng
    res_timezone=data.location.timezone
    res_isp=data.isp
    document.querySelector("#res_ip").innerText=res_ip
    document.querySelector("#res_loc").innerText=res_city+" "+res_region+" "+res_code
    document.querySelector("#res_timezone").innerText=res_timezone
    document.querySelector("#res_isp").innerText=res_isp
    showmap(res_lat,res_long)
}
function showmap(lat,long)
{
    mymap.setView(new L.LatLng(lat, long), 13);
    marker.setLatLng([lat,long])
}