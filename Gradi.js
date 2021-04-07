import React, {Component} from 'react';
import {Text,View,TouchableOpacity} from 'react-native';

class Fifth extends Component {
    render() {
        const {navigation} = this.props;

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