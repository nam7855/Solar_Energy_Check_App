import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

// 테스트 하기위해 전부 주석처리
/*
import encoding from 'text-encoding';
import ReactFileReader from 'react-file-reader';

const decoder = new encoding.TextDecoder();

//import {InfluxDB, Point} from 'https://unpkg.com/@influxdata/influxdb-client/dist/index.browser.mjs'

const {InfluxDB} = require('@influxdata/influxdb-client')
const {Point} = require('@influxdata/influxdb-client')


// You can generate a Token from the "Tokens Tab" in the UI
const token = 'SaFFVAPgFfA0r8t9hbF_qWse4pJyGsmSnKMwnJYel2avib7OYz7l11mioaA8t9RWx2ZFBl9tgUlVpmgsCEPYSw=='
const org = 'giant3380@gmail.com'
const bucket = 'SolarEnergyCheck'

const client = new InfluxDB({url: 'https://us-west-2-1.aws.cloud2.influxdata.com', token: token})

const writeApi = client.getWriteApi(org, bucket)
writeApi.useDefaultTags({host: 'host1'})

const point = new Point('hepi')
  .floatField('Temperature', 25)
  .floatField('Humidity', 26)
  .floatField('Radiation', 27)
  .floatField('Gradient', 28)
writeApi.writePoint(point)
console.log(` ${point}`)

writeApi
    .close()
    .then(() => {
        console.log('Write FINISHED')
    })
    .catch(e => {
        console.error(e)
        console.log('\nWrite Finished ERROR')
    })

const queryApi = client.getQueryApi(org)

const query = `from(bucket: "${bucket}") |> range(start: -1h)  |> filter(fn: (r) => r._measurement == "hepi")`
queryApi.queryRows(query, {
    next(row, tableMeta) {
    const o = tableMeta.toObject(row)
        console.log(`${o._time} ${o._measurement} in '${o.location}' (${o.example}): ${o._field}=${o._value}`
    )
    },
    error(error) {
    console.error(error)
    console.log('\nQuery Finished ERROR')
    },
    complete() {
    console.log('\nQuery Finished SUCCESS')
    },
})*/

class First extends Component {
    render() {
        const {navigation} = this.props;
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <View style={{flex: 1, backgroundColor: 'skyblue',justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity
                        onPress={()=> {navigation.navigate("Temp")}}
                >
                    <Text style={{fontSize: 30}}>
                        온도
                    </Text>
                </TouchableOpacity>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity
                        onPress={()=> {navigation.navigate("Humi")}}
                >
                    <Text style={{fontSize: 30}}>
                        습도
                    </Text>
                </TouchableOpacity>
                </View>
                <View style={{flex: 1, backgroundColor: 'skyblue',justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity
                        onPress={()=> {navigation.navigate("Solar")}}
                >
                    <Text style={{fontSize: 30}}>
                        일사계
                    </Text>
                </TouchableOpacity>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity
                        onPress={()=> {navigation.navigate("Gradi")}}
                >
                    <Text style={{fontSize: 30}}>
                        기울기
                    </Text>
                </TouchableOpacity>
                </View>
            </View>
        );
    };
}

export default First;

FileReader.prototype.readAsArrayBuffer = function (blob) {
	if (this.readyState === this.LOADING) throw new Error("InvalidStateError");
	this._setReadyState(this.LOADING);
	this._result = null;
	this._error = null;
	const fr = new FileReader();
	fr.onloadend = () => {
		const content = atob(fr.result.substr("data:application/octet-stream;base64,".length));
		const buffer = new ArrayBuffer(content.length);
		const view = new Uint8Array(buffer);
		view.set(Array.from(content).map(c => c.charCodeAt(0)));
		this._result = buffer;
		this._setReadyState(this.DONE);
	};
	fr.readAsDataURL(blob);
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const atob = (input = '') => {
	let str = input.replace(/=+$/, '');
	let output = '';

	if (str.length % 4 == 1) {
		throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
	}
	for (let bc = 0, bs = 0, buffer, i = 0;
		buffer = str.charAt(i++);

		~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
			bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
	) {
		buffer = chars.indexOf(buffer);
	}

	return output;
}