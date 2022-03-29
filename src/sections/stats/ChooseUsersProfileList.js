import React, {Component} from 'react';
import {
    SectionList,
    FlatList,
    View,
    Text,
    StyleSheet,
    RefreshControl,
    Image, TouchableOpacity
} from 'react-native';

/****** Redux ******/
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import * as StatsActions from '../../redux/actions/stats';
/*******************/
import {Colors} from '../../commons';
import {Spinner} from '../../widgets';
import {StatsCell} from '../stats/csgo/StatsCell';

import {users_profile} from  './data';

class ChooseUsersProfileList extends Component {
    constructor(props) {
        super(props);
        this.renderSteamProfileItem = this.renderSteamProfileItem.bind(this);
        // this.onEndReached = this.onEndReached.bind(this);
    }

    renderSectionHeader(section) {
        return (
            <View style={styles.headerSectionContainer}>
                <Text style={styles.headerSectionText}>{section.title}</Text>
            </View>
        );
    }

    renderSectionFooter(section) {
        return this.renderSteamFooter();
    }

    renderSteamFooter() {
        return <Spinner isVisible={this.props.isFetching} />;
    }

    onStatsSelect = (item) => {
        // alert(JSON.stringify(item));
        // console.log(' onSelect', item);
        this.props.updateStatsSelected(item);
    }


    renderSteamProfileItem(item, index) {
        return (
            <View>
                <TouchableOpacity
                    style={styles.buttonContainer}

                    onPress={() => {
                        this.onStatsSelect(item);
                    }}>
                    <Image source={{ uri: item.avatarmedium }} style={styles.image} resizeMode={'cover'}  />

                </TouchableOpacity>
                <Text style={styles.headerSectionText}>Player: {item.personaname} (SteamID {item.steamid})</Text>

            </View>);
    }

    render() {
        return (
            <View style={styles.row_card}>
                <SectionList
                    renderSectionHeader={({section}) => this.renderSectionHeader(section)}
                    renderSectionFooter={({section}) => this.renderSectionFooter(section)}
                    sections={[
                        {
                            data: users_profile.response.players,
                            title: 'Steam Profiles',
                            renderItem: ({item}) => this.renderSteamProfileItem(item),
                            keyExtractor: item => item.id,
                        },
                    ]}
                    onEndReachedThreshold={0.3}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        isFetching: state.stats.isFetching,
        list: state.stats.list
    };
};

const mapDispatchToProps = (dispatch, props) => {
    // console.log('mapDispatchToProps', props);
    return {
        updateStatsSelected: item => {
            dispatch(StatsActions.initStatsList(item));
            Actions.StatsView({title: item.personaname + ' (' + item.realname + ')'});
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseUsersProfileList);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatListContainer: {
        flex: 1,
        width: '100%',
        marginTop: 20,
    },
    cardContainer: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingTop: 5,
        paddingBottom: 20
    },
    avatarContainer: {
        minHeight: 200,
    },
    logo: { width: 200, height: 200 },
    descriptionContainer: {
        flex: 1,
        width: '100%',
        height: 40,
        minHeight: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FBE91A',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    withMargin: {
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
    },
    paginationContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
    },
    paginationButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'space-between',
    },
    buttonRight: { marginRight: 20 },

    image: {
        height: 200,
        width: '100%',
    },

    headerSectionContainer: {
        backgroundColor: Colors.primary,
        padding: 10,
    },
    headerSectionText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    row_card: {
        paddingTop:5,
        paddingBottom:1,
        paddingLeft:1,
        paddingRight:1,
        borderRadius:1,
        padding: 50,
        marginTop: 0,
        marginBottom: 0.3,
        flexDirection: 'row',
        backgroundColor: 'rgba(71,55,55,0.5)',
        shadowColor: "#000000",
        shadowOpacity: 0.3,
        shadowRadius: 1,
        shadowOffset: {
            height: 1,
            width: 0.6,
        }
    },
});
