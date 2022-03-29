import React, {Component} from 'react';
import {
    ScrollView,
    View,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    SectionList,
} from 'react-native';

import {Colors} from '../../../commons';
import {Button} from '../../../widgets';

/****** Redux ******/
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import * as StatsActions from '../../../redux/actions/stats';
/*******************/

import { PieChart } from 'react-native-svg-charts'
import { Circle, G, Line } from 'react-native-svg'

const buildPieData = (userdata) => {

    let data = [
        {
            key: 1,
            label: "Total Kills ",
            amount: userdata.user.total.kills,
            svg: { fill: '#20b2aa' },
        },
        {
            key: 2,
            label: "Total Deaths ",
            amount: userdata.user.total.deaths,
            svg: { fill: '#ff025a' }
        },
        {
            key: 3,
            label: "Matches Won ",
            amount: userdata.user.total.matches_won,
            svg: { fill: '#c42bf6' }
        },
        {
            key: 4,
            label: "Matches Loss ",
            amount: userdata.user.total.matches_played - userdata.user.total.matches_won,
            svg: { fill: '#2003d0' }
        },
        {
            key: 5,
            label: "Score ",
            amount: userdata.user.total.score,
            svg: { fill: '#d00303' }
        }
    ]

    return data;
}


const Labels = ({ slices, height, width }) => {
    return slices.map((slice, index) => {
        const { labelCentroid, pieCentroid, data } = slice;
        return (
            <Text
                key={index}
                x={pieCentroid[ 0 ]}
                y={pieCentroid[ 1 ]}
                fill={'white'}
                textAnchor={'middle'}
                alignmentBaseline={'middle'}
                fontSize={24}
                stroke={'black'}
                strokeWidth={0.2}
                color={data.fill}
            >
                {data.label} {data.amount}
            </Text>
        )
    })
}

export class StatsView extends Component {

    getCard = (title, stat) => {
        return (<View>
            <Text style={styles.description}>{title} {stat} </Text>
        </View>);
    }

    renderSectionHeader = (title) =>  {
        return (
            <View style={styles.headerSectionContainer}>
                <Text style={styles.headerSectionText}>{title}</Text>
            </View>
        );
    }


    render() {

        const {item} = this.props.item;

        let userdata = ({
            user: {
                id: "",
                name: "",
                average: {
                    kills: 0,
                    deaths: 0,
                    rating: 1,
                    assists: 0,
                    score: 0,
                    hsp: 0,
                    ping: 0
                },
                total: {
                    kills: 0,
                    deaths: 0,
                    assists: 0,
                    mvps: 0,
                    score: 0,
                    matches_won: 0,
                    matches_played: 0,
                }
            }
        });

        let stats =  this.props.item.stats;

        this.props.item.stats.list.map(({name, value}, index) => {
            switch (name) {
                case 'total_kills':
                    userdata.user.total.kills = value;
                    break;
                case 'total_deaths':
                    userdata.user.total.deaths = value;
                    break;
                case 'total_matches_won':
                    userdata.user.total.matches_won = value;
                    break;
                case 'total_matches_played':
                    userdata.user.total.matches_played = value;
                    break;
                case 'total_mvps':
                    userdata.user.total.mvps = value;
                    break;
                case 'total_contribution_score':
                    userdata.user.total.score = value;
                    break;
                default:
            }
        });


        const image = item ? { uri: item.avatarmedium } : null;
        const name =
            item && item.personaname !== '' ?  item.personaname : 'No name available';
        const profileurl =
            item && item.profileurl !== ''
                ? item.profileurl
                : 'No description available';



        console.log("stats.item2",stats.item2);

        return (
            <ScrollView style={styles.container}>
                <Image source={{ uri: item.avatarmedium }} style={styles.image} resizeMode={'cover'} />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>Player {name} (SteamID: {stats.item2.steamid})</Text>
                </View>

                {this.renderSectionHeader('Statistics')}

                <View style={styles.textContainer}>
                    {this.getCard('Total Kills:', userdata.user.total.kills)}
                </View>
                <View style={styles.textContainer}>
                    {this.getCard('Total Deaths:', userdata.user.total.deaths)}
                </View>
                <View style={styles.textContainer}>
                    {this.getCard('Ratio:', userdata.user.total.kills / userdata.user.total.deaths)}
                </View>
                <View style={styles.textContainer}>
                    {this.getCard('MVP:', userdata.user.total.mvps)}
                </View>
                <View style={styles.textContainer}>
                    {this.getCard('Score:', userdata.user.total.score)}
                </View>
                <View style={styles.textContainer}>
                    {this.getCard('Matches Won:', userdata.user.total.matches_won)}
                </View>
                <View style={styles.textContainer}>
                    {this.getCard('Matches Loss:', userdata.user.total.matches_played - userdata.user.total.matches_won)}
                </View>


                {this.renderSectionHeader('Achievements')}

                <PieChart
                    style={{ height: 200 }}
                    valueAccessor={({ item }) => item.amount}
                    data={buildPieData(userdata)}
                    spacing={0}
                    outerRadius={'95%'}
                >
                    <Labels/>
                </PieChart>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    return {
        item: state.stats,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        initStatsList: () => {
            dispatch(StatsActions.initStatsList());
        }
    };
};


export default connect(mapStateToProps)(StatsView);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    image: {
        width: Dimensions.get('window').width,
        height: 400,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    name: {
        flex: 1,
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
    },
    description: {
        flex: 1,
        fontSize: 16,
        fontWeight: '400',
        color: 'white',
    },
    headerSectionContainer: {
        backgroundColor: Colors.primary,
        padding: 10,
        marginTop: 10,
    },
    headerSectionText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    itemContainer: {
        flexDirection: 'row',
        padding: 5,
    },
    itemImage: {
        height: 100,
        width: 80,
    },
    itemText: {
        color: 'white',
        flex: 1,
        paddingLeft: 10,
        fontWeight: '600',
    },
    buttonContainer: {
        margin: 20,
    },
});
