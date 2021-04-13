import React, {Component} from 'react';
import {Text,View,TouchableOpacity} from 'react-native';


// DB part 시작

import encoding from 'text-encoding';
import ReactFileReader from 'react-file-reader';

const decoder = new encoding.TextDecoder();

const {InfluxDB} = require('@influxdata/influxdb-client')
const {Point} = require('@influxdata/influxdb-client')

const token = 'SaFFVAPgFfA0r8t9hbF_qWse4pJyGsmSnKMwnJYel2avib7OYz7l11mioaA8t9RWx2ZFBl9tgUlVpmgsCEPYSw=='
const org = 'giant3380@gmail.com'
const bucket = 'SolarEnergyCheck'

const client = new InfluxDB({url: 'https://us-west-2-1.aws.cloud2.influxdata.com', token: token})
const queryApi = client.getQueryApi(org)

const query = `from(bucket: "${bucket}") |> range(start: -1h)  |> filter(fn: (r) => r._field == "Gradient")`

// DB part 종료


class Fifth extends Component {
    render() {
        const {navigation} = this.props;

        queryApi.queryRows(query, {
            next(row, tableMeta) {
            const o = tableMeta.toObject(row)
                console.log(`${o._time}   ${o._field}=${o._value}`
            )
            },
            error(error) {
            console.error(error)
            console.log('\nQuery Finished ERROR')
            },
            complete() {
            console.log('\nQuery Finished SUCCESS')
            },
        })

        return (
            <View>
            <View style={{width: 70, height: 70, justifyContent: 'center'}} >
                <TouchableOpacity
                        onPress={()=>{
                            navigation.goBack()
                        }}
                >
                    <Text style={{fontSize:20, alignItems: 'center'}}>back</Text>
                </TouchableOpacity>
            </View>
            <View style={{height:600, justifyContent: 'center',alignItems:'center'}}>
                <Text style={{fontSize:50,alignitems:'center'}}>
                    기울기
                </Text>

            </View>
            </View>
        );
    };
}

export default Fifth;