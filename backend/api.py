from flask import Flask, redirect, request
import simpleobsws
import asyncio
import requests

app = Flask(__name__)

loop = asyncio.get_event_loop()
obs = simpleobsws.obsws(host='localhost', port=4444, password=None, loop=loop)

API_URL = 'http://127.0.0.1:5000/api/'

async def make_request(call, data=None):
    await obs.connect()
    result = await obs.call(call, data=data)
    await obs.disconnect()
    return result

def options_to_GET(options_list):
    output = ""
    for i in range(0, len(options_list)):
        output += options_list[i]
        if i != len(options_list) - 1:
            output += "&"
    return output

def convert_db_to_mul(decibels):
    db = decibels * -1
    perc_db = decibels / 60
    return 

def str_to_bool(target):
    if target.lower() in {'true', 'false'}:
        value = True if target.lower() == "true" else False
        return value
    else:
        return target

@app.route("/api/", methods=['GET'])
def api_call():
    # "volume=-19.3:float" or "source=Desktop Audio:str"
    data={}
    for key, value in request.values.items():
        if key != "call":
            splitvalue = value.split(":")
            if splitvalue[1] == "bool":
                data[key] = str_to_bool(splitvalue[0])
            elif splitvalue[1] == "int":
                data[key] = int(splitvalue[0])
            elif splitvalue[1] == "float":
                data[key] = float(splitvalue[0])
            else:
                data[key] = splitvalue[0]
    if len(data.values()) == 0:
        return loop.run_until_complete(make_request(request.values["call"]))
    else:
        return loop.run_until_complete(make_request(request.values["call"], data=data))

@app.route('/api/test-volume')
def test_volume():
    return loop.run_until_complete(make_request('SetVolume', data={"source": "Desktop Audio", "volume": -19.3, "useDecibel": True}))

@app.route('/api/start-stream', methods=['GET', 'POST'])
def start_stream():
    # Things To Do:
    # Drop 'Desktop Audio' to -19DB
    options = [ 'call=SetVolume', 'source=Desktop Audio:str', 'useDecibel=true:bool', 'volume=-19.0:float' ]
    r = request.get(f"{API_URL}?{options_to_GET(options)}")
    # Set Mic/Aux -10Db
    # Unmute Mic/Aux
    # Switch to First Scene
