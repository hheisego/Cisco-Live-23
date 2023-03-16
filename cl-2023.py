import os
import json
import random
import requests
import uvicorn
from datetime import datetime
from webexteamssdk import WebexTeamsAPI
from fastapi import FastAPI, Header, Request
from fastapi.responses import PlainTextResponse
from fastapi.middleware.cors import CORSMiddleware
from Operations import LiveCrud

# Webex Teams Object
live_bot = WebexTeamsAPI(access_token=os.environ['BOTOKEN'])

# Mongo Object
livecrud = LiveCrud()


class CiscoLive:

    def send_message(self, msg):

        mails = ['hemorale@cisco.com', 'hheisego@cisco.com']

        for i in mails:
            live_bot.messages.create(toPersonEmail=i, text=msg)

    def get_co2(self):

        url = "https://api.growflux.com"

        payload = {}
        headers = {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + os.environ['CO2_TOKEN']
            }

        # get all APs
        resource = "/v1/aps"
        response = requests.request("GET", url + resource, headers=headers, data=payload)

        print(response.status_code)
        response_parsed = json.loads(response.text)
        print(response_parsed)

        aps = response_parsed["message"]["aps"]

        co2_levels = ''
        co2_alarm = 0
        for ap in aps:

            # get all CO2 sensors per AP
            resource = "/v1/ap/" + ap["id"] + "/co2_sensors"
            response = requests.request("GET", url + resource, headers=headers, data=payload)
            response_parsed = json.loads(response.text)

            co2_sensors = response_parsed["message"]["co2_sensors"]

            # for each sensor, print out its values
            for sensor in co2_sensors:
                co2_levels += "\nTimestamp: " + str(datetime.today().strftime('%Y-%m-%d %H:%M:%S.%f')[:-3])
                co2_levels += "\nCO2 levels: " + str(co2_sensors[sensor]["metrics"]["data"]["C_co2"])
                co2_levels += "\nTemperature: " + str(co2_sensors[sensor]["metrics"]["data"]["C_t"])
                co2_levels += "\nHumidity: " + str(co2_sensors[sensor]["metrics"]["data"]["C_rh"])
                co2_levels += "\nVoltage: " + str(co2_sensors[sensor]["metrics"]["data"]["C_v"])
                co2_levels += "\nPressure: " + str(co2_sensors[sensor]["metrics"]["data"]["C_p"])
                co2_alarm = co2_sensors[sensor]["metrics"]["data"]["C_co2"]
                print("\nTimestamp: " + str(datetime.today().strftime('%Y-%m-%d %H:%M:%S.%f')[:-3]))
                # datetime_to_utc
                # print("\nTimestamp: " + str(datetime.fromtimestamp(co2_sensors[sensor]["metrics"]["data"]["timestamp"] / 1000).strftime('%d-%m-%y %H:%M:%S')))
                print("CO2 levels: " + str(co2_sensors[sensor]["metrics"]["data"]["C_co2"]))
                print("Temperature: " + str(co2_sensors[sensor]["metrics"]["data"]["C_t"]))
                print("Humidity: " + str(co2_sensors[sensor]["metrics"]["data"]["C_rh"]))
                print("Voltage: " + str(co2_sensors[sensor]["metrics"]["data"]["C_v"]))
                print("Pressure: " + str(co2_sensors[sensor]["metrics"]["data"]["C_p"]))

        return co2_levels, co2_alarm

    def meraki_data(self, meraki_post):

        # co2_levels, co2 = self.get_co2()

        co2_levels = "\nTimestamp: " + str(datetime.today().strftime('%Y-%m-%d %H:%M:%S.%f')[:-3])
        co2_levels += "\nTemperature: " + str(random.randrange(20, 28)) + " °C"
        co2 = random.randrange(650, 1200)
        ap_connected = ''
        nearby = ''
        ssid = ''
        room_count = 0

        if meraki_post['type'] == 'WiFi':

            for i in meraki_post['data'].get('observations'):

                manufacture = str(i.get('manufacturer'))

                if i.get('ssid') is not None:
                    ssid = str(i.get('ssid'))

                if i.get('ssid') is not None and i['latestRecord'].get('nearestApRssi') >= -61:

                    ap_connected += "\nDevice mac: " + i.get('clientMac') + "\nRSSI: " + str(i['latestRecord'].get('nearestApRssi'))
                    room_count += 1


                elif i.get('ssid') is None and i['latestRecord'].get('nearestApRssi') >= -55 and manufacture != 'Meraki':

                    nearby += "\nDevice mac: " + i.get('clientMac') + "\nRSSI: " + str(i['latestRecord'].get('nearestApRssi'))
                    room_count += 1

            if co2 > 800 and room_count > 0:

                msg = ssid + str(ap_connected) + '\n' + str(nearby)
                msg += "\nCO2: " + str(co2) + " | Devices count: " + str(room_count) + "  -- > Run Away!!\n" + co2_levels
                self.send_message(msg)

            elif co2 < 800 and room_count > 0:

                msg = str(ap_connected) + '\n' + str(nearby)
                msg += " CO2: " + str(co2) + " | Devices count: " + str(room_count) + "\n" + co2_levels
                self.send_message(msg)

        return {"status": 200}


# Cisco Live
cisco_live = CiscoLive()

# FastAPI Object
app = FastAPI(title='Cisco Live! 2023', description='new release', version='1.1.3')

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    )


@app.get('/', response_class=PlainTextResponse)
async def meraki_auth(request: Request):
    # livecrud.create("")

    print(request.headers)

    # data = """<Body>973a619ca35ba8c919de11eba8c1787ec0611423</Body>"""

    return os.environ["MERAKI_VALIDATOR"]


@app.post('/')
async def info_insert(request: Request):
    # Get the POST data sent from Meraki
    raw_info = await request.json()

    # print(raw_info)
    insert = livecrud.create(raw_info, table='Academia')
    insert['id'] = str(insert['_id'])
    del insert['_id']

    if raw_info['secret'] == os.environ["MERAKI_SECRET"]:
        cisco_live.meraki_data(meraki_post=raw_info)

        # print(raw_info)

    return insert  # {'message': 'tx completed'}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5007, ssl_keyfile="private.key", ssl_certfile="te-health_nginx.crt")