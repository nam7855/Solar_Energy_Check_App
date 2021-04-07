import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

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