# WeatherAPI
>Rest API that give you weather info for over 22000 cites from 2017-03-01 to 2017-03-30  

This is REST API is build upon NodeJS using express framework.It uses Mongodb as database.
For Scalling purpose,this API used Cluster Module and app has multiple instance based on cores available on machine,thus increasing performance.
This app has logging enabled with different log level(info,warn,error) and can be seen in mongodb and has test cases written using Chai and Mocha


## Installation
1.fork this respo<br>
2.clone it<br>
3.run npm install<br> 
4 run npm run-script start<br>

Before runing app please update URL of mongodb in **configuration/config.json**.

## Usage example

If you are running this app on localhost,it default runs to 3000 port.<br>
It has /find endPoint which is POST end Point and requires a JSON params.<br> 
It accept a json as request body as date **(year-mm-dd)** and either city_name or city_id as params.<br>

Open **_POSTMAN/RestMan_**

## Eg.1
http://locahost:3000/find

### Request Body:  

{"query":{"date":"2017-03-11","city_name":"Ujjain"}}

### Response:

{
    "ok": 1,
    "result": [
        {
            "_id": "5dab62bbc7df33e809637f20",
            "city": {
                "id": 1253914,
                "name": "Ujjain",
                "country": "IN",
                "coord": {
                    "lon": 75.76667,
                    "lat": 23.183331
                }
            },
            "data": [
                {
                    "dt": 1489212000,
                    "temp": {
                        "day": 273.27,
                        "min": 261.41,
                        "max": 273.27,
                        "night": 261.41,
                        "eve": 269.56,
                        "morn": 270.53
                    },
                    "pressure": 586.33,
                    "humidity": 17,
                    "weather": [
                        {
                            "id": 800,
                            "main": "Clear",
                            "description": "sky is clear",
                            "icon": "01d"
                        }
                    ],
                    "speed": 2.85,
                    "deg": 232,
                    "clouds": 44,
                    "snow": 0.02,
                    "uvi": 10.11
                }
            ]
        }
    ]
}
It will give 200 status 

## Eg.2 
http://locahost:3000/find

### Request Body:  

{"query":{"date":"2017-03-11","city_id":3632308}}

### Response:


{
    "ok": 1,
    "result": [
        {
            "_id": "5dab62b4c7df33e809635fcc",
            "city": {
                "id": 3632308,
                "name": "Merida",
                "country": "VE",
                "coord": {
                    "lon": -71.144997,
                    "lat": 8.598333
                }
            },
            "data": [
                {
                    "dt": 1489212000,
                    "temp": {
                        "day": 273.27,
                        "min": 261.41,
                        "max": 273.27,
                        "night": 261.41,
                        "eve": 269.56,
                        "morn": 270.53
                    },
                    "pressure": 586.33,
                    "humidity": 17,
                    "weather": [
                        {
                            "id": 800,
                            "main": "Clear",
                            "description": "sky is clear",
                            "icon": "01d"
                        }
                    ],
                    "speed": 2.85,
                    "deg": 232,
                    "clouds": 44,
                    "snow": 0.02,
                    "uvi": 10.11
                }
            ]
        }
    ]
}


## Eg3

### Request body:

{"query":{"date":"2017-03-12","city_name":"Ujjain"}}

### Response

{
    "ok": -1,
    "errMsg": "date is not Prime"
}

It will give 400 status as date is not Prime.


### Points to Remember<br>

**1. The db has only data from _2017-03-01 to  2017-03-30_ and date format is _(yyyy-mm--dd)_**.<br>
**2. Make sure Content-type is application/json in request headers**<br>
**3. 1 in ideal case is neither prime nor composite but in these API 1 is considered as Prime**<br>
**4. city id and city name is indexed in db for faster result**

